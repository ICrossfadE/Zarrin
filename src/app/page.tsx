import Image from "next/image";
import Link from "next/link";
import { FeaturedArticle, PostCard, SectionHeading } from "@/components/blog";
import { Reveal } from "@/components/reveal";
import { featuredPost, popularPosts, recentPosts } from "@/features/blog/repository";

export default function HomePage() {
  return <main id="main-content">
    <Reveal className="home-hero"><Image className="wave hero-wave-top" src="/images/hero-wave-top.svg" width={601} height={245} alt="" /><Image className="wave hero-wave-bottom" src="/images/hero-wave-bottom.svg" width={508} height={336} alt="" />
      <div className="container hero-inner"><div className="hero-copy"><p className="eyebrow">Featured Post</p><h1>How AI will<br className="desktop-break" /> Change the Future</h1><p className="hero-description">The future of AI will see home robots having enhanced<br className="desktop-linebreak" /> intelligence, increased capabilities, and becoming more<br className="desktop-linebreak" /> personal and possibly cute. For example, home robots<br className="desktop-linebreak" /> will overcome navigation, direction</p><Link className="button button-light" href={`/blog/${featuredPost.slug}`}>Read more</Link></div><div className="hero-image"><Image className="hero-raster" src="/images/figma-0baca7f60787.jpg" alt="Glowing blue and purple artificial intelligence symbol" width={1216} height={760} sizes="(max-width: 640px) 90vw, 45vw" preload /></div></div>
    </Reveal>
    <Reveal className="container home-featured"><FeaturedArticle post={featuredPost} overlay /></Reveal>
    <Reveal className="container recent-section"><SectionHeading title="Our Recent Post" /><div className="recent-featured"><FeaturedArticle post={featuredPost} /></div><div className="post-grid">{recentPosts.map(post => <PostCard key={post.slug} post={post} />)}</div></Reveal>
    <Reveal className="container popular-section"><SectionHeading title="Popular Post" /><div className="post-grid desktop-popular">{popularPosts.map(post => <PostCard key={post.slug} post={post} />)}</div>
      {/* Mobile-макет повторює три recent-картки замість шести desktop popular. */}
      <div className="post-grid mobile-popular">{recentPosts.map(post => <PostCard key={post.slug} post={post} />)}</div>
    </Reveal>
  </main>;
}
