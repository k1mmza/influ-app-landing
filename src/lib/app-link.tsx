"use client";

// Drop-in replacement for `next/link` on the static landing. The sync script
// rewrites synced components' `import Link from "next/link"` to point here, so
// their app-route links (href="/discover", etc.) resolve to the main app origin
// instead of 404-ing on web.inflique.com. Landing-local links ("/", "#…") and
// already-absolute URLs pass through unchanged. See lib/app-url.ts.
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { toAppHref } from "@/lib/app-url";

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ href, ...props }: LinkProps) {
  return <NextLink href={toAppHref(href) as LinkProps["href"]} {...props} />;
}
