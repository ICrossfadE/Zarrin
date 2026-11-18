import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <Reveal className="error-card">
        <h1>
          <span className="sr-only">404 — Page not found</span>
          <Image
            src="/images/not-found-art.svg"
            alt=""
            width={283}
            height={113}
          />
        </h1>
        <p>
          Sorry!
          <br />
          The link is broken, try to refresh or go to home
        </p>
        <Link href="/" className="button button-light">
          Go To Home
        </Link>
      </Reveal>
    </main>
  );
}
