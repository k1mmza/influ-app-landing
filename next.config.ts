import type { NextConfig } from "next";

// This project exists ONLY to be statically exported for web.inflique.com,
// so `output: 'export'` is unconditional here (unlike the shared main app,
// which must NOT be switched to export). `npm run build` produces `out/`.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // Defensive: the landing uses a plain <img> (not next/image), so no image
  // optimizer is invoked — but if a synced component ever adds next/image,
  // static export requires this to avoid a build-time error.
  images: { unoptimized: true },
};

export default nextConfig;
