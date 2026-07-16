"use client";

// Drop-in replacement for the parts of `next/navigation` the landing uses.
// landing-hero.tsx calls useRouter().push("/discover?…") on form submit — on a
// static site that client route doesn't exist, so we send a real navigation to
// the main app origin instead. usePathname is re-exported unchanged (it works
// fine under static export and only ever reads "/" here).
import { toAppHref } from "@/lib/app-url";

export { usePathname } from "next/navigation";

export function useRouter() {
  return {
    push: (href: string) => {
      window.location.href = toAppHref(href);
    },
    replace: (href: string) => {
      window.location.replace(toAppHref(href));
    },
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => {},
    prefetch: () => {},
  };
}
