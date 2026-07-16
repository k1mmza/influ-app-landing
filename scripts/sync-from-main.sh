#!/usr/bin/env bash
#
# sync-from-main.sh — copy the landing-page source files from the main frontend
# repo into this standalone project, then rewrite two import specifiers so the
# copies work as a static export.
#
# These copied files are the SINGLE SOURCE OF TRUTH in influ-app-frontend.
# Do NOT hand-edit them here — edit the originals in the main repo and re-run
# `npm run sync` (runs automatically as a prebuild step). See README.md.
#
# Adjust this if the two projects ever live in different locations:
MAIN_REPO_PATH="${MAIN_REPO_PATH:-../influ-app-frontend}"

set -euo pipefail

HERE="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$(cd "$HERE/$MAIN_REPO_PATH" 2>/dev/null && pwd || true)"

if [[ -z "$SRC" || ! -d "$SRC/src" ]]; then
  echo "ERROR: main repo not found at '$MAIN_REPO_PATH' (resolved from $HERE)." >&2
  echo "       Set MAIN_REPO_PATH to the influ-app-frontend checkout and retry." >&2
  exit 1
fi

# Files copied verbatim (relative to each repo's root). Traced from the landing
# route's actual import graph starting at src/app/page.tsx.
FILES=(
  "src/app/page.tsx"
  "src/app/globals.css"
  "src/components/landing-hero.tsx"
  "src/components/landing-featured.tsx"
  "src/components/landing-personas.tsx"
  "src/components/landing-motion.tsx"
  "src/components/site-footer.tsx"
  "src/lib/influencers.ts"
  "src/lib/types.ts"
  "src/lib/utils.ts"
)

echo "Syncing landing sources from: $SRC"
for f in "${FILES[@]}"; do
  if [[ ! -f "$SRC/$f" ]]; then
    echo "ERROR: expected source file missing: $SRC/$f" >&2
    echo "       The landing dependency graph may have changed — re-trace before syncing." >&2
    exit 1
  fi
  mkdir -p "$HERE/$(dirname "$f")"
  cp "$SRC/$f" "$HERE/$f"

  # Rewrite ONLY the import source for next/link + next/navigation so app-route
  # links resolve to NEXT_PUBLIC_APP_URL on the static site. JSX/logic untouched.
  # sed -i.bak is portable across BSD (macOS) and GNU sed.
  sed -i.bak \
    -e 's|from "next/link"|from "@/lib/app-link"|g' \
    -e 's|from "next/navigation"|from "@/lib/app-nav"|g' \
    "$HERE/$f"
  rm -f "$HERE/$f.bak"

  echo "  ✓ $f"
done

echo "Synced ${#FILES[@]} files. (next/link → @/lib/app-link, next/navigation → @/lib/app-nav)"
