// Minimal self-check for toAppHref's branch logic (the one function in this
// package with real conditional behavior). Run: node scripts/check-app-url.mjs
import assert from "node:assert";

// APP_BASE is read from this env var at module-load time, so it must be set
// before the import below runs.
process.env.NEXT_PUBLIC_APP_URL = "https://app.inflique.com";
const { toAppHref } = await import("../src/lib/app-url.ts");

assert.strictEqual(toAppHref("/"), "/", "root stays local");
assert.strictEqual(toAppHref("#pricing"), "#pricing", "anchor stays local");
assert.strictEqual(
  toAppHref("https://example.com/x"),
  "https://example.com/x",
  "absolute url passes through",
);
assert.strictEqual(toAppHref("/agencies"), "/agencies", "landing-local route stays local");
assert.strictEqual(
  toAppHref("/agencies/foo"),
  "/agencies/foo",
  "landing-local sub-path stays local",
);
assert.strictEqual(
  toAppHref("/discover"),
  "https://app.inflique.com/discover",
  "other route prefixed with app origin",
);

console.log("toAppHref: all checks passed");
