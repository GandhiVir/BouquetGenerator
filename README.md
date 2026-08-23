<img src="docs/hero.svg" alt="Row of illustrated flowers — rose, tulip, sunflower, lily, and daisy" width="100%" />

# Bouquet Studio

Pick your flowers, shape the arrangement, wrap it your way, and attach a personal message — then preview and download a custom digital bouquet as an SVG.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/state-Zustand-orange)](https://zustand-demo.pmnd.rs)

## What it looks like

<img src="docs/app-preview.svg" alt="A sample wrapped bouquet with rose, tulip, sunflower, lily, and daisy, tied with a red ribbon" width="320" />

Every flower, color, wrap, and ribbon in this preview is picked live in the builder — it's not a static mockup, it's the same SVG the app renders.

## Features

- **Pick your flowers** — rose, tulip, sunflower, lily, daisy, each in multiple colors, with a quantity per flower (0–10)
- **Shape the bouquet** — size (small/medium/large), arrangement style (round/fan/neat), and stem length
- **Wrap & ribbon** — five wrap papers and five ribbon colors
- **Message card** — occasion, a personal message, and a sender name
- **Reshuffle** — one click gives the flowers a fresh, randomized arrangement without touching your selections
- **Three flower art styles** — switch between Classic (flat), LEGO (blocky), and Realistic (layered/shaded) rendering, shown below
- **Live SVG preview** that updates instantly as you change any setting
- **Download** the finished bouquet as a standalone `.svg` file

### Flower styles

<img src="docs/styles-comparison.svg" alt="The same rose rendered in Classic, LEGO, and Realistic styles" width="100%" />

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js](https://nextjs.org) 15 (App Router) |
| UI | [React](https://react.dev) 19 + [Tailwind CSS](https://tailwindcss.com) 4 |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| Animation | [Framer Motion](https://motion.dev) |
| Icons | [Lucide](https://lucide.dev) |
| Language | TypeScript |

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) 18.18 or later, and npm.

Clone the repo and install dependencies:

```bash
git clone https://github.com/GandhiVir/BouquetGenerator.git
cd BouquetGenerator
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app hot-reloads as you edit.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Type-check and build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## How to use it

1. Open the **Builder** page from the nav.
2. Pick flowers, colors, and quantities in the *Flowers* card — and choose a flower style (Classic / LEGO / Realistic) at the top.
3. Adjust size, arrangement style, and stem length in *Shape & size*.
4. Choose a wrap paper and ribbon color in *Wrap & ribbon*.
5. Add an occasion, message, and sender name in *Message card*.
6. Hit **Reshuffle** for a different layout, or **Reset** to start over.
7. Click **Download** to save the bouquet as an SVG, or visit the **Result** page for a shareable summary view.

## Project structure

```
src/
├── app/
│   ├── page.tsx           landing page route
│   ├── builder/page.tsx   the customization screen
│   └── result/page.tsx    final summary + download
├── components/
│   ├── bouquet/           the SVG rendering pieces (flower heads, ribbon, preview)
│   ├── controls/          reusable form controls (swatches, segmented control, cards)
│   └── shared/            header, landing page, small shared pieces
├── data/                  flower/wrap/ribbon option lists + default config
├── lib/                   layout math, flower flattening/shuffling, SVG export
├── store/                 Zustand store for the in-progress bouquet
└── types/                 shared TypeScript types
```

## Status & roadmap

This project is under active iteration. Known open item: a real sharing mechanism (the app is currently client-only with in-memory state) is needed before features like "attach a song when sharing" can be built.
