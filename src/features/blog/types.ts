export type Picture = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; author: string }
  | ({ type: "image" } & Picture);
export type Post = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  imageUrl: string | null;
  sortOrder: number | null;
  body: ContentBlock[];
};

// Контракт полів, які використовуємо з наданої відповіді Strapi; медіа й зв'язки можуть бути null.
export type StrapiPost = {
  id: number;
  documentId: string;
  Title: string;
  Slug: string | null;
  Post_date: string | null;
  Post_text: string | null;
  Short_description: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image_url: string | null;
  sortOrder: number | null;
  Post_image: {
    id: number;
    documentId: string;
    url: string;
    name: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
  blog_category: {
    id: number;
    documentId: string;
    Name: string;
    Slug: string | null;
  } | null;
};

export type StrapiPostsResponse = {
  data: StrapiPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
