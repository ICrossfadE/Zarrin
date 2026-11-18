import { cache } from "react";
import { fetchAPI, getStrapiURL } from "@/lib/api";
import type { Post, StrapiPost, StrapiPostsResponse } from "./types";

export function normalizeImageUrl(value: string | null | undefined): string | null {
  const source = value?.trim();
  if (!source) return null;
  try {
    const url = source.startsWith("/") && !source.startsWith("//")
      ? new URL(getStrapiURL(source))
      : new URL(source);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    // Share URL відкриває HTML-перегляд; raw=1 повертає файл, rlkey лишається незмінним.
    if (["dropbox.com", "www.dropbox.com"].includes(url.hostname) &&
        /^\/(?:s\/[^/]+\/|scl\/fi\/[^/]+\/)/.test(url.pathname)) {
      url.searchParams.delete("dl");
      url.searchParams.set("raw", "1");
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function toPost(item: StrapiPost): Post {
  if (item.Post_text !== null && typeof item.Post_text !== "string") {
    throw new Error(
      "Unsupported Post_text format: expected plain text or null.",
    );
  }
  return {
    id: item.id,
    documentId: item.documentId,
    // У наданому JSON Slug порожній: documentId дає стабільне посилання без колізій заголовків.
    slug: item.Slug?.trim() || item.documentId,
    title: item.Title,
    excerpt: item.Short_description?.trim() ?? "",
    category: item.blog_category?.Name ?? "",
    publishedAt: item.Post_date ?? item.publishedAt,
    imageUrl: normalizeImageUrl(item.image_url?.trim() || item.Post_image?.url),
    sortOrder: item.sortOrder ?? null,
    // Post_text наразі null; підтримуємо plain text без виконання HTML із CMS.
    body: (item.Post_text ?? "")
      .split(/\r?\n\s*\r?\n/)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph" as const, text })),
  };
}

async function loadPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  let page = 1;
  let pageCount = 1;
  do {
    const query = new URLSearchParams({
      "populate[0]": "Post_image",
      "populate[1]": "blog_category",
      "pagination[page]": String(page),
      "pagination[pageSize]": "100",
      "sort[0]": "Post_date:desc",
      "sort[1]": "documentId:asc",
    });
    const response = await fetchAPI<StrapiPostsResponse>(
      `/api/blog-posts?${query}`,
    );
    if (
      !Array.isArray(response.data) ||
      !Number.isInteger(response.meta?.pagination?.pageCount) ||
      response.meta.pagination.pageCount < 0
    ) {
      throw new Error(
        "Invalid Strapi posts response: expected data and pagination.",
      );
    }
    posts.push(...response.data.map(toPost));
    pageCount = response.meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);
  return posts;
}

// Помилка CMS не блокує Header і сторінки; неповний результат пагінації не показуємо.
// cache діє лише в межах рендеру: наступний запит знову спробує завантажити статті.
export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    return await loadPosts();
  } catch {
    console.warn("Blog posts could not be loaded. Showing the empty state.");
    return [];
  }
});
