// The static landing lives on web.inflique.com and has exactly one real page: "/".
// Every other in-app route (/discover, /register, /login, /agencies, ...) is
// served by the main app on NEXT_PUBLIC_APP_URL. This helper rewrites any such
// relative route to an absolute URL under that origin.
//
// NEXT_PUBLIC_APP_URL is inlined at build time. If it's unset, links fall back
// to relative (which 404 on this static site) — .env.example documents it and
// check-env only hard-fails on the API URL, so keep APP_URL set for real builds.
export const APP_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "";

/**
 * Map a landing href to where it should actually go:
 *  - "/"            → stays local (the landing itself)
 *  - "#anchor"      → stays local (in-page scroll)
 *  - "http(s)://…"  → left untouched (already absolute)
 *  - any other "/…" → prefixed with the app origin
 * Non-string hrefs (Next.js UrlObject) are returned as-is.
 */
export function toAppHref<T>(href: T): T | string {
  if (typeof href !== "string") return href;
  if (href === "/" || href.startsWith("#") || /^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return `${APP_BASE}${href}`;
  return href;
}
