import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/features/blog/types";
import { formatDate } from "@/features/blog/repository";

export function PostsEmptyState() {
  return (
    <div className="posts-empty">
      <h2>No posts yet</h2>
      <p>There are no posts to display right now. Please check back later.</p>
    </div>
  );
}

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="post-meta">
      <span>{post.category}</span>
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    </p>
  );
}
export function PostCard({
  post,
  className = "",
}: {
  post: Post;
  className?: string;
}) {
  return (
    <article className={`post-card ${className}`}>
      {post.imageUrl && (
        <Link
          className="post-image-link"
          href={`/blog/${post.slug}`}
          aria-label={post.title}
          tabIndex={-1}
        >
          <Image
            className="post-image"
            src={post.imageUrl}
            alt={post.title}
            width={400}
            height={360}
            unoptimized
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 400px"
          />
        </Link>
      )}
      <div className="post-card-content">
        <PostMeta post={post} />
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="read-link"
          aria-label={`Read more: ${post.title}`}
        >
          Read More...
        </Link>
      </div>
    </article>
  );
}
export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <Link href="/blog" className="button view-all">
        View All
      </Link>
    </div>
  );
}
export function FeaturedArticle({
  post,
  overlay = false,
}: {
  post: Post;
  overlay?: boolean;
}) {
  return (
    <article
      className={
        overlay
          ? "featured-article featured-overlay"
          : "featured-article featured-horizontal"
      }
    >
      {/* URL не містить розмірів файла: задаємо геометрію слота; браузер завантажує фото напряму. */}
      {post.imageUrl && (
        <Link
          href={`/blog/${post.slug}`}
          className="featured-image"
          tabIndex={-1}
          aria-label={post.title}
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={overlay ? 1232 : 712}
            height={overlay ? 576 : 456}
            unoptimized
            sizes={overlay ? "(max-width: 640px) 80vw, 86vw" : "50vw"}
          />
        </Link>
      )}
      <div className="featured-copy">
        <PostMeta post={post} />
        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt.split(/\r?\n/)[0]}</p>
        <Link className="button button-outline" href={`/blog/${post.slug}`}>
          Read More
        </Link>
      </div>
    </article>
  );
}
