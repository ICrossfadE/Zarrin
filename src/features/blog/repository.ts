import { posts } from "./mock-posts";
// Дані з експортованого макета є локальними прикладами, не редакційною CMS.
export const listPosts = () => posts;
export const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);
export const featuredPost = posts[0];
export const popularPosts = posts.slice(1, 7);
export const recentPosts = posts.slice(7, 10);
export const formatDate = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
