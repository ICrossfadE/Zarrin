import { getPosts } from "./blog-posts";

export const listPosts = getPosts;
export const getPostBySlug = async (slug: string) =>
  (await listPosts()).find((post) => post.slug === slug);

// У CMS поки немає ознак featured/popular: тимчасово вибираємо за датою публікації.
export async function getPostGroups() {
  const posts = await listPosts();
  return {
    featuredPost: posts[0],
    popularPosts: posts.slice(0, 6),
    recentPosts: posts.slice(0, 3),
  };
}

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
