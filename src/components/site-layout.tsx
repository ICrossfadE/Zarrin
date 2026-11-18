import Image from "next/image";
import Link from "next/link";
import { listPosts } from "@/features/blog/repository";
import { Search } from "./search";
import { Reveal } from "./reveal";
import { MobileNav } from "./mobile-nav";

export function Logo() {
  return <Link href="/" className="logo" aria-label="Zarrin home"><Image src="/images/logo-mark.svg" alt="" width={44} height={44} /><span>Zarrin</span></Link>;
}
export async function Header() {
  const posts = await listPosts();
  return <header className="site-header"><div className="container header-inner"><Logo />
    <nav className="desktop-nav" aria-label="Main navigation"><Link href="/blog">Blog</Link><Link href="/about">About</Link><Search posts={posts.map(({ slug, title }) => ({ slug, title }))} /><Link className="button header-contact" href="/contact">Contact Us</Link></nav>
    <MobileNav />
  </div></header>;
}
export function Newsletter() {
  return <Reveal className="newsletter" id="newsletter">
    <Image className="wave newsletter-wave-left" src="/images/newsletter-wave-left.svg" width={447} height={338} alt="" /><Image className="wave newsletter-wave-right" src="/images/newsletter-wave-right.svg" width={523} height={338} alt="" />
    <div className="container newsletter-content"><h2>Get our stories delivered From us to your inbox weekly.</h2>
      {/* Форма макетна: немає form, submit, збереження чи повідомлення про успіх. */}
      <div className="newsletter-fields" role="group" aria-label="Newsletter preview"><label className="sr-only" htmlFor="newsletter-email">Your Email</label><input id="newsletter-email" type="email" placeholder="Your Email" autoComplete="email" aria-describedby="newsletter-note" /><button className="button button-outline-light" type="button">Get started</button></div>
      <p id="newsletter-note">Get a response tomorrow if you submit by 9pm today. If we received after 9pm will get a reponse the following day.</p>
    </div>
  </Reveal>;
}
export function Footer() {
  return <footer className="site-footer"><Reveal className="container footer-inner"><Logo /><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/blog">Blog</Link><Link href="/about">About</Link><Link href="/contact">Contact Us</Link></nav>
    {/* У макеті немає справжніх social URL: залишаємо статичні позначки. */}
    <ul className="socials" aria-label="Social profiles pending"><li>FB</li><li>IG</li><li>LN</li><li>YT</li></ul><p className="copyright">Copyright Ideapeel Inc © 2023. All Right Reserved</p>
  </Reveal></footer>;
}
