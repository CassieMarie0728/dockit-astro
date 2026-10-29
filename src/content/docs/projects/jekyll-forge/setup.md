---
title: "Jekyll Forge: Setup and commands"
description: "Jekyll Forge documentation \u2014 Setup and commands."
sidebar:
  label: "Setup and commands"
  order: 2
---

## Commands declared in the repository

These commands were inspected, not executed as part of this documentation pass. Complete environment configuration before starting services.

| Script | Actual command |
| --- | --- |
| `dev` | `vite build && wrangler dev` |
| `dev:ui` | `vite` |
| `build` | `vite build` |
| `start` | `wrangler dev` |
| `cf:types` | `wrangler types --env-interface CloudflareBindings` |
| `cf:check` | `pnpm build && wrangler deploy --dry-run` |
| `cf:deploy` | `node scripts/check-deployment.mjs && pnpm build && wrangler deploy` |
| `check` | `tsc --noEmit` |
| `format` | `prettier --write .` |
| `test` | `vitest run` |
| `db:generate` | `drizzle-kit generate` |
| `db:local` | `wrangler d1 migrations apply DB --local` |
| `db:remote` | `wrangler d1 migrations apply DB --remote` |
| `lint` | `eslint . --ext .ts,.tsx,.js,.jsx` |
| `lint:fix` | `eslint . --ext .ts,.tsx,.js,.jsx --fix` |
| `format:check` | `prettier --check .` |

## Package manager

`pnpm@10.4.1+sha512.c753b6c3ad7afa13af388fa6d808035a008e30ea9993f58c6663e2bc5ff21679aa834db094987129aa4d488b86df57f7b634981b2f827cdcacc698cc0cfb88af`

Clone the repository, inspect its lockfile and environment examples, then install with its declared package manager. Do not invent environment values from another project’s guide.

## Development versus deployment

`dev:ui` runs Vite alone. `dev` builds the UI and runs Wrangler. `db:local` targets local D1; `db:remote` targets remote D1. `cf:deploy` deploys remotely. These are operationally different commands.

