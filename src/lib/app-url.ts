// web.inflique.com serves its own public pages (the intro page plus the
// marketing + legal routes below). Every other in-app route (/discover,
// /register, /login, /dashboard, etc.) is served by the main app on
// NEXT_PUBLIC_APP_URL, so this helper rewrites any such relative route to an
// absolute URL under that origin, while landing-local routes stay relative.
//
// NEXT_PUBLIC_APP_URL is inlined at build time. If it's unset, links fall back
// to relative, which 404s on this static site. .env.example documents it, and
// check-env only hard-fails on the API URL, so double check APP_URL is set
// before a real build.
export const APP_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "";

// Routes this static site serves itself. These must stay relative instead of
// getting rewritten to the app origin; everything else falls through to it.
const LANDING_LOCAL_ROUTES = [
  "/how-it-works",
  "/creators",
  "/agencies",
  "/privacy",
  "/terms",
  "/cookies",
];

function isLandingLocal(href: string): boolean {
  return LANDING_LOCAL_ROUTES.some(
    // exact match or a sub-path/anchor of a local route (e.g. "/privacy#data")
    (r) => href === r || href.startsWith(`${r}/`) || href.startsWith(`${r}#`),
  );
}

/**
 * Map a landing href to where it should actually go:
 *  - "/"                     → stays local (the intro page)
 *  - "#anchor"               → stays local (in-page scroll)
 *  - a LANDING_LOCAL_ROUTE   → stays local (this site serves it)
 *  - "http(s)://…"           → left untouched (already absolute)
 *  - any other "/…"          → prefixed with the app origin
 * Non-string hrefs (Next.js UrlObject) are returned as-is.
 */
export function toAppHref<T>(href: T): T | string {
  if (typeof href !== "string") return href;
  if (href === "/" || href.startsWith("#") || /^https?:\/\//i.test(href)) return href;
  if (isLandingLocal(href)) return href;
  if (href.startsWith("/")) return `${APP_BASE}${href}`;
  return href;
}
