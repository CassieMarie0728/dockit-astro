---
title: "Setup and commands"
sidebar:
  order: 2
---

## Commands declared in the repository

These commands were inspected, not executed as part of this documentation pass. Complete environment configuration before starting services.

| Script | Actual command |
| --- | --- |
| `dev` | `pnpm dev:metro` |
| `dev:server` | `NODE_ENV=development tsx watch server/_core/index.ts` |
| `dev:metro` | `EXPO_USE_METRO_WORKSPACE_ROOT=1 npx expo start --web --port ${EXPO_PORT:-8081}` |
| `build` | `esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` |
| `start` | `NODE_ENV=production node dist/index.js` |
| `check` | `tsc --noEmit` |
| `lint` | `expo lint` |
| `format` | `npx prettier --write .` |
| `test` | `vitest run` |
| `db:push` | `drizzle-kit generate && drizzle-kit migrate` |
| `android` | `expo run:android` |
| `ios` | `expo run:ios` |
| `qr` | `node scripts/generate_qr.mjs` |
| `setup:github-pages` | `node scripts/setup-github-pages.js` |
| `setup:github-pages:bash` | `bash scripts/setup-github-pages.sh` |

## Package manager

`pnpm@9.12.0`

Clone the repository, inspect its lockfile and environment examples, then install with its declared package manager. Do not invent environment values from another project’s guide.

## Important startup distinction

`pnpm dev` starts Metro only. The backend has its own `pnpm dev:server` command. The current scripts use `db:push`, not the older README’s `db:migrate`. Confirm database configuration before running migrations.

