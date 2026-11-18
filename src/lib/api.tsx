export function getStrapiURL(path: string): string {
  const base = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!base) throw new Error("Set STRAPI_URL (or NEXT_PUBLIC_STRAPI_URL) to your Strapi origin.");
  const url = new URL(path, base.endsWith("/") ? base : `${base}/`);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Strapi URL must use HTTP or HTTPS.");
  }
  return url.toString();
}

export async function fetchAPI<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(getStrapiURL(path), {
    cache: "no-store",
    ...options,
    signal: options.signal ?? AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Strapi request failed: HTTP ${response.status}`);
  return response.json() as Promise<T>;
}
