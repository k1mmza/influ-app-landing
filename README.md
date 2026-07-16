# influ-app-landing

Standalone Next.js project whose **only** job is to produce a **static export**
(`out/`) of the Inflique intro page for **web.inflique.com**, served by Apache.
The full authenticated app stays on Vercel/SSR (`influ-app-frontend`) at
`app.inflique.com`; this project is deliberately separate so a static export
can't constrain the app's build.

## Fully independent codebase

This project has **no relationship to `influ-app-frontend`**. All of `src/` is
ordinary, committed source owned here — edit `web.inflique.com` by editing these
files directly. (It previously synced a subset of files from the main frontend;
that coupling has been removed and the two projects now evolve independently.)

Links to app routes resolve to `NEXT_PUBLIC_APP_URL` via the local
`@/lib/app-link` (wrapping `next/link`) and `@/lib/app-nav` (wrapping
`next/navigation`) helpers, so in-content links point at `app.inflique.com`
instead of 404-ing on the static site.

The public nav (`landing-nav.tsx`) and `providers.tsx` are intentionally slim:
a logged-out static landing has no need for auth stores, `lib/api.ts`, or
react-query, so this project ships a lightweight public nav and a
next-themes-only providers wrapper.

## Build

Both env vars are **baked in at build time** (there is no runtime server):

```bash
NEXT_PUBLIC_API_URL=https://influ-app-backend.onrender.com \
NEXT_PUBLIC_APP_URL=https://app.inflique.com \
npm run build
```

- `build` is a plain `next build` (static export to `out/`) — no pre-steps.
- Optionally run `npm run check-env` first — it hard-fails if
  `NEXT_PUBLIC_API_URL` is unset or localhost.
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
