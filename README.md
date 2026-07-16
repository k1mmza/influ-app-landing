# influ-app-landing

Standalone Next.js project whose **only** job is to produce a **static export**
(`out/`) of the Inflique landing page for **web.inflique.com**, served by Apache.
The full authenticated app stays on Vercel/SSR (`influ-app-frontend`) at
`app.inflique.com`; this project is deliberately separate so a static export
can't constrain the app's build.

## ⚠️ Synced files — do not hand-edit

Most of `src/` is **copied from `influ-app-frontend`** by `scripts/sync-from-main.sh`.
These files are **git-ignored** and regenerated on every build. Edit the
**originals in the main repo**, then re-run the sync:

| Synced (do NOT edit here)                     | Owned by this project (edit here)        |
| --------------------------------------------- | ---------------------------------------- |
| `src/app/page.tsx`                            | `src/app/layout.tsx`                     |
| `src/app/globals.css`                         | `src/components/landing-nav.tsx`         |
| `src/components/landing-{hero,featured,personas,motion}.tsx` | `src/components/providers.tsx`  |
| `src/components/site-footer.tsx`              | `src/components/theme-toggle.tsx`        |
| `src/lib/{influencers,types,utils}.ts`        | `src/lib/app-{url,link,nav}.ts(x)`       |

During sync, two import specifiers are rewritten in the copied files
(`next/link` → `@/lib/app-link`, `next/navigation` → `@/lib/app-nav`) so that
in-content links to app routes resolve to `NEXT_PUBLIC_APP_URL` instead of
404-ing on the static site. Nothing else in the copies is modified.

### Why the nav/providers aren't synced

The main app's `navigation.tsx` and `providers.tsx` transitively import
`useUserStore` → `lib/api.ts` (~1,600 lines), two Zustand stores, and
react-query — none of which a logged-out static landing uses. So this project
ships a slim hand-owned public nav (`landing-nav.tsx`) and a next-themes-only
`providers.tsx` instead.

## Build

Both env vars are **baked in at build time** (there is no runtime server):

```bash
NEXT_PUBLIC_API_URL=https://influ-app-backend.onrender.com \
NEXT_PUBLIC_APP_URL=https://app.inflique.com \
npm run build
```

- `prebuild` runs `check-env` (hard-fails if `NEXT_PUBLIC_API_URL` is unset or
  localhost) then `sync`.
- Output is `out/` — upload its contents to the web.inflique.com docroot.

Verify the API URL baked in correctly:

```bash
grep -r "influ-app-backend.onrender.com" out/ | head -1   # should match
```

## Local preview

```bash
npm run build && npx serve out
```

Check: the live roster strip loads real data (client fetch works), no console
errors, and every nav/footer/CTA link points at `app.inflique.com` (or scrolls
in-page).
