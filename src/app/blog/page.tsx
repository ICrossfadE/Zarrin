import type { Metadata } from "next";
import { PostCard } from "@/components/blog";
import { Reveal } from "@/components/reveal";
import { popularPosts, recentPosts } from "@/features/blog/repository";
export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return <main id="main-content" className="blog-page">
    <Reveal className="container page-intro"><p className="eyebrow">OUR BLOGS</p><h1>Find our all blogs from here</h1><p>our blogs are written from very research research and well known writers writers so that we can provide you the best blogs and articles articles for you to read them all along</p></Reveal>
    <Reveal className="container blog-list"><div className="post-grid desktop-blog">{[...popularPosts, ...recentPosts].map(post => <PostCard key={post.slug} post={post} />)}</div><div className="post-grid mobile-blog">{[...recentPosts, ...recentPosts].map((post, i) => <PostCard key={`${post.slug}-${i}`} post={post} />)}</div></Reveal>
  </main>;
}
