// Fails the build loudly if the production API URL isn't set. NEXT_PUBLIC_API_URL
// is baked into the JS bundle at build time — if it's wrong here, every visitor's
// browser silently hits localhost in production until someone rebuilds.
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl || apiUrl.includes("localhost")) {
  throw new Error(
    `[check-env] NEXT_PUBLIC_API_URL must be set to the production backend URL before building for export. ` +
      `Got: ${apiUrl ?? "(unset)"}\n` +
      `  e.g. NEXT_PUBLIC_API_URL=https://influ-app-backend.onrender.com NEXT_PUBLIC_APP_URL=https://app.inflique.com npm run build`,
  );
}

// Not fatal (links just fall back to relative), but warn — it's almost always a mistake.
if (!process.env.NEXT_PUBLIC_APP_URL) {
  console.warn(
    "[check-env] WARNING: NEXT_PUBLIC_APP_URL is unset — in-content links to app routes (/discover, /register, …) will be relative and 404 on the static site.",
  );
}

console.log(`[check-env] OK — NEXT_PUBLIC_API_URL=${apiUrl}  NEXT_PUBLIC_APP_URL=${process.env.NEXT_PUBLIC_APP_URL ?? "(unset)"}`);
