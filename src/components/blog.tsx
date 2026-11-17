import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/features/blog/repository";

export function PostMeta({ post }: { post: Post }) {
  return <p className="post-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></p>;
}
export function PostCard({ post, className = "" }: { post: Post; className?: string }) {
  return <article className={`post-card ${className}`}><Link className="post-image-link" href={`/blog/${post.slug}`} aria-label={post.title} tabIndex={-1}><Image className="post-image" {...post.cover} alt={post.cover.alt} sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 400px" /></Link>
    <div className="post-card-content"><PostMeta post={post} /><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="post-excerpt">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="read-link" aria-label={`Read more: ${post.title}`}>Read More...</Link></div>
  </article>;
}
export function SectionHeading({ title }: { title: string }) {
  return <div className="section-heading"><h2>{title}</h2><Link href="/blog" className="button view-all">View All</Link></div>;
}
export function FeaturedArticle({ post, overlay = false }: { post: Post; overlay?: boolean }) {
  return <article className={overlay ? "featured-article featured-overlay" : "featured-article featured-horizontal"}>
    <Link href={`/blog/${post.slug}`} className="featured-image" tabIndex={-1} aria-label={post.title}><Image src={overlay ? "/images/figma-4004a774221d.jpg" : "/images/figma-fb80902beb88.jpg"} alt={post.cover.alt} width={overlay ? 2452 : 1417} height={overlay ? 2464 : 1424} sizes={overlay ? "(max-width: 640px) 80vw, 86vw" : "50vw"} /></Link>
    <div className="featured-copy"><PostMeta post={post} /><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt.split(/\r?\n/)[0]}</p><Link className="button button-outline" href={`/blog/${post.slug}`}>Read More</Link></div>
  </article>;
}
