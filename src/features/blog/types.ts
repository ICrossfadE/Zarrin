export type Picture = { src: string; alt: string; width: number; height: number };
export type ContentBlock = { type: "paragraph"; text: string } | { type: "quote"; text: string; author: string } | ({ type: "image" } & Picture);
export type Post = { slug: string; title: string; excerpt: string; category: string; publishedAt: string; cover: Picture; body: ContentBlock[] };
