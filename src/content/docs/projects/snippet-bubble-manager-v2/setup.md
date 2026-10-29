---
title: "Snippet Bubble Manager v2: Setup and commands"
description: "Snippet Bubble Manager v2 documentation \u2014 Setup and commands."
sidebar:
  label: "Setup and commands"
  order: 2
---

## Commands declared in the repository

These commands were inspected, not executed as part of this documentation pass. Complete environment configuration before starting services.

| Script | Actual command |
| --- | --- |
| `dev` | `concurrently -k "pnpm dev:server" "pnpm dev:metro"` |
| `dev:server` | `cross-env NODE_ENV=development tsx watch server/_core/index.ts` |
| `dev:metro` | `cross-env EXPO_USE_METRO_WORKSPACE_ROOT=1 npx expo start --web --port ${EXPO_PORT:-8081}` |
| `build` | `esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` |
| `start` | `NODE_ENV=production node dist/index.js` |
| `check` | `tsc --noEmit` |
| `lint` | `expo lint` |
| `format` | `prettier --write .` |
| `test` | `vitest run` |
| `db:push` | `drizzle-kit generate && drizzle-kit migrate` |
| `android` | `expo run:android` |
| `ios` | `expo run:ios` |
| `qr` | `node scripts/generate_qr.mjs` |

## Package manager

`pnpm@9.12.0`

Clone the repository, inspect its lockfile and environment examples, then install with its declared package manager. Do not invent environment values from another project’s guide.

## Native module

The dependency `@snippet-bubbles/floating-bubble` links to `modules/floating-bubble`. Inspect that module’s Android permissions and build requirements before documenting overlay behavior. Do not assume a native overlay works in Expo Go or the web preview.

