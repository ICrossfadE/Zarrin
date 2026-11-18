import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard, PostMeta, SectionHeading } from "@/components/blog";
import { Reveal } from "@/components/reveal";
import { getPostBySlug, listPosts } from "@/features/blog/repository";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Article not found" };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const relatedPosts = (await listPosts()).filter((item) => item.documentId !== post.documentId).slice(0, 3);
  return <main id="main-content" className="article-page"><article>
    <Reveal className="article-heading"><PostMeta post={post} /><h1>{post.title}</h1></Reveal>
    {post.cover && <Reveal className="container article-cover"><Image {...post.cover} alt={post.cover.alt} sizes="86vw" unoptimized preload /></Reveal>}
    <Reveal className="article-body">{post.body.length === 0 && <p>Article text has not been added yet.</p>}{post.body.map((block, index) => {
      switch (block.type) {
        case "paragraph": return <p key={index}>{block.text}</p>;
        case "quote": return <blockquote key={index}><p>{block.text}</p><cite>– {block.author}</cite></blockquote>;
        case "image": return <figure key={index}><Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 640px) 90vw, 58vw" /></figure>;
      }
    })}</Reveal>
  </article><Reveal className="container article-related"><SectionHeading title="Popular Post" /><div className="post-grid desktop-popular">{relatedPosts.map(p => <PostCard post={p} key={p.slug} />)}</div><div className="post-grid mobile-popular">{relatedPosts.slice(0, 2).map(p => <PostCard post={p} key={p.slug} />)}</div></Reveal></main>;
}
