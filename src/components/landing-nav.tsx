"use client";

// Own version of the public nav, not synced from influ-app-frontend's
// navigation.tsx. That component pulls in useUserStore, lib/api.ts, the
// sidebar context and the authed-user branch, none of which apply here since
// everyone hitting this static site is logged out. App routes use plain <a>
// tags pointed at NEXT_PUBLIC_APP_URL since they cross over to app.inflique.com.
import { ThemeToggle } from "@/components/theme-toggle";
import { toAppHref } from "@/lib/app-url";

const PUBLIC_LINKS = [
  { href: "/how-it-works", label: "How it Works", tip: "See how Inflique works" },
  { href: "/creators", label: "Creators", tip: "Join as a creator" },
  { href: "/agencies", label: "Agencies & Brands", tip: "Start running campaigns" },
] as const;

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 mb-8 flex w-full items-center justify-between gap-6 border-b border-[var(--lp-line)] bg-[var(--lp-paper)] px-4 py-2.5 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.35)] sm:px-8">
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="shrink-0 rounded-md px-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--lp-ink)] transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lp-accent)]"
        >
          Inflique
        </a>
        <div className="ml-4 hidden items-center gap-0.5 md:flex">
          {PUBLIC_LINKS.map(({ href, label, tip }) => (
            <div key={href} className="group relative">
              <a
                href={toAppHref(href)}
                className="inline-flex items-center rounded-full px-4 py-2 font-[family-name:var(--font-grotesk)] text-sm font-medium text-[var(--lp-ink-soft)] transition-all hover:bg-[var(--lp-surface-2)] hover:text-[var(--lp-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lp-accent)]"
              >
                {label}
              </a>
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-[var(--lp-line)] bg-[var(--lp-surface)] px-3 py-1.5 font-[family-name:var(--font-grotesk)] text-xs font-medium text-[var(--lp-ink-soft)] opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                {tip}
                <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-[var(--lp-line)] bg-[var(--lp-surface)]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href={toAppHref("/register")}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--lp-accent)] px-4 py-2 font-[family-name:var(--font-grotesk)] text-sm font-semibold text-[var(--lp-accent-ink)] transition hover:brightness-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lp-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lp-paper)]"
        >
          Get started
        </a>
      </div>
    </nav>
  );
}
