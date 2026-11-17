"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const section = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    // Базові стилі не приховують SSR-контент. Reduced motion не створює tween.
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element, { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65, ease: "power2.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: element, start: "top 96%", once: true },
      });
    });
    return () => media.revert();
  }, [pathname]);
  return <section ref={section} className={className} id={id}>{children}</section>;
}
