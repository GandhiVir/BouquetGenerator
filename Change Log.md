# Bouquet Studio — progress log

Last updated: 2026-08-23

## Current state
App is fully working. Next.js 16 (App Router) + Zustand + Tailwind v4 + Framer Motion.
Run it with:
```
npm install   # if node_modules is missing
npm run dev
```
Then open http://localhost:3000. Routes: `/` (landing), `/builder` (customize), `/result` (final view).

## What happened this session

### 1. Fixed a broken/incomplete project (initial repair pass)
The repo was mid-save and didn't run at all:
- `package.json` had no scripts and was missing `next`/`react-dom`/`typescript`/`tailwindcss` — added deps, scripts, name/version.
- Added `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts`.
- [src/app/builder/page.tsx](src/app/builder/page.tsx) was truncated (started mid-JSX, no imports/hooks) — rebuilt from scratch.
- [src/components/bouquet/BouquetPreview.tsx](src/components/bouquet/BouquetPreview.tsx) had no imports at all — fixed.
- [src/components/shared/LandingPage.tsx](src/components/shared/LandingPage.tsx) was an empty file but imported elsewhere — wrote a real landing page (hero, flower showcase, 3-step "how it works").
- Added `FlatFlower`/`LayoutItem` types to [src/types/bouquet.ts](src/types/bouquet.ts) that were referenced but never defined.
- Loosened `ColorSwatches` prop type to accept `readonly` arrays (TS build error).

### 2. Feature requests (numbered, tackled one at a time)

1. **Reshuffle button** — done.
   - [src/lib/bouquet.ts](src/lib/bouquet.ts): added `shuffleFlowers()` (seeded Fisher-Yates) and a seeded jitter option in `getLayout(..., seed)`.
   - [src/store/bouquetStore.ts](src/store/bouquetStore.ts): added `shuffleSeed` + `reshuffle()` action (random seed), reset by `resetConfig()`.
   - Builder page: "Reshuffle" button next to Reset/Download. Result page also respects `shuffleSeed` so the arrangement carries over.

2. **Centering bug** — fixed.
   - Root cause: [src/lib/bouquet.ts](src/lib/bouquet.ts) `getLayout()` centered flower stems at `x = 210`, but the SVG viewBox is 460 wide (true center `230`) — same value already used by the wrap/ribbon/message card. One-line fix: `centerX: 230`.

3. **Removed duplicate message from inside the bouquet SVG** — done.
   - [src/components/bouquet/BouquetPreview.tsx](src/components/bouquet/BouquetPreview.tsx): deleted the floating "occasion + message" tag group inside the SVG; trimmed viewBox height `700 → 620` to remove the resulting dead space. The message now only shows in the "Message card" panel below.

4. **Song on share** — **skipped/deferred**, not implemented. Blocked on a bigger prerequisite: there's currently no real sharing mechanism (app is client-only, in-memory state, no backend/persistence, no shareable URLs). Needs a design discussion before implementation — e.g. do we generate a shareable link, embed audio in the downloaded SVG (not really possible), or build a small backend to host bouquets + audio.

5. **Flower art style options** — done.
   - Discussed realistic vs. LEGO-style flowers; showed SVG mockups comparing "current flat", "LEGO/blocky", and "realistic layered" for rose/tulip/sunflower.
   - Decision: **keep all three as user-selectable options**, default = current flat style (renamed `"classic"`).
   - [src/types/bouquet.ts](src/types/bouquet.ts): added `FlowerRenderStyle = "classic" | "lego" | "realistic"` and `flowerStyle` field on `BouquetConfig`.
   - [src/data/bouquetOptions.ts](src/data/bouquetOptions.ts): added `FLOWER_STYLES` list; `DEFAULT_CONFIG.flowerStyle = "classic"`.
   - [src/components/bouquet/FlowerHead.tsx](src/components/bouquet/FlowerHead.tsx): rewritten with three renderers (`ClassicFlower`, `LegoFlower`, `RealisticFlower`), all driven by the user's chosen petal color (a `shade()` helper lightens/darkens the hex for accents/shading — not hardcoded per-preset colors).
   - [src/components/bouquet/BouquetPreview.tsx](src/components/bouquet/BouquetPreview.tsx): passes `config.flowerStyle` down through `FlowerStem` to `FlowerHead`.
   - Builder page: new "Flower style" segmented control at the top of the Flowers section.
   - Verified: default load = classic (matches pre-change rendering exactly), switching styles changes the SVG composition as expected, build is clean.

## Verification done each step
- `npm run build` after every change (currently clean).
- Live-tested in an in-app browser preview (`.claude/launch.json` added so `preview_start` can launch `npm run dev` directly) — clicked through all three routes, checked console for errors, and inspected rendered SVG structure via JS (positions, element counts) since screenshots weren't always available in that environment.

## Known housekeeping notes (not urgent)
- `npm audit` flags 3 high-severity issues, but they're all in Next.js's own dev-time deps (`postcss`, `sharp`), not app code. Not acted on — would require a Next major-version bump.
- No git repo initialized yet — nothing has been committed.

## Not started / open threads
- **Sharing feature** — needs a decision on approach (shareable link + backend? local export only?) before "add a song on share" can be scoped.
- Song-on-share feature itself, once sharing exists.
