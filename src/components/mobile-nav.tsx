"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { if (menu.current) menu.current.open = false; }, [pathname]);

  // Нативний details працює і без JS; клієнтська частина закриває меню після переходу.
  return <details ref={menu} className="mobile-nav" onKeyDown={(event) => {
    if (event.key === "Escape" && menu.current) menu.current.open = false;
  }}>
    <summary aria-label="Open navigation"><Image src="/images/figma-a62244794351.png" width={34} height={34} alt="" /></summary>
    <nav aria-label="Mobile navigation">
      <Link href="/">Home</Link><Link href="/blog">Blog</Link><Link href="/about">About</Link><Link href="/contact">Contact Us</Link>
    </nav>
  </details>;
}
