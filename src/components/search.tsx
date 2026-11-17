"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Search({ posts }: { posts: { slug: string; title: string }[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const results = query.trim() ? posts.filter((post) => post.title.toLowerCase().includes(query.trim().toLowerCase())) : [];
  return <>
    <button type="button" className="search-toggle" aria-label="Search articles" onClick={() => dialog.current?.showModal()}><Image src="/images/search.svg" alt="" width={22} height={22} /></button>
    <dialog ref={dialog} className="search-dialog" aria-labelledby="search-title" onKeyDown={(event) => {
      // Search input може спожити Escape для очищення; тут перше натискання закриває діалог.
      if (event.key === "Escape") { event.preventDefault(); dialog.current?.close(); }
    }}>
      <div className="dialog-heading"><h2 id="search-title">Search articles</h2><button type="button" className="close-search" aria-label="Close search" onClick={() => dialog.current?.close()}>×</button></div>
      <label htmlFor="article-search">Article title</label>
      <input id="article-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What would you like to read?" />
      <div aria-live="polite" className="search-results">{query.trim() && (results.length ? <ul>{results.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}`} onClick={() => dialog.current?.close()}>{post.title}</Link></li>)}</ul> : <p>No articles found.</p>)}</div>
    </dialog>
  </>;
}
