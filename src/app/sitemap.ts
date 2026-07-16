import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://web.inflique.com";
const ROUTES = ["/", "/how-it-works", "/agencies", "/creators", "/privacy", "/terms", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));
}
