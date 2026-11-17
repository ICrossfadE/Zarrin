import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer, Header, Newsletter } from "@/components/site-layout";
import "./globals.css";

const raleway = localFont({ src: "../../node_modules/@fontsource-variable/raleway/files/raleway-latin-wght-normal.woff2", variable: "--font-raleway", display: "swap", weight: "100 900" });
const roboto = localFont({ src: "../../node_modules/@fontsource-variable/roboto/files/roboto-latin-wght-normal.woff2", variable: "--font-roboto", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: { default: "Zarrin", template: "%s | Zarrin" },
  description: "Zarrin blog website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} ${roboto.variable}`}>
      <body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Newsletter /><Footer /></body>
    </html>
  );
}
