---
title: "Cloudflare architecture and configuration"
sidebar:
  order: 5
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Active deployment path

Wrangler points at `server/worker.ts`. The Worker serves the Vite output from `dist/public` through its `ASSETS` binding; API requests enter the Worker first. D1 is bound as `DB`, with migrations under `drizzle/d1`.

Do not use the legacy-looking MySQL environment object as the sole setup guide for this deployment. The Worker wraps each request and cron event in `withRuntime`, which stores Cloudflare bindings in `AsyncLocalStorage` for the current event.

| Path / trigger | Handler |
| --- | --- |
| `/api/health` | Returns `{ ok: true, platform: "cloudflare" }` |
| Non-API paths | `ASSETS.fetch` with SPA fallback |
| `/api/oauth/*` | OAuth request handler |
| `/api/assets/<numeric id>` | Repository asset handler |
| `/api/trpc/*` | tRPC fetch adapter and appRouter |
| Five-minute cron | Scheduled posts, scheduled social posts and expired-row cleanup |

The health response is not a D1, GitHub or publishing probe.

## Configure your environment

Review `wrangler.jsonc` before deploying a fork: it includes an existing Worker name, D1 database binding and identity-related variables. Use your intended resources rather than blindly adopting another environment’s IDs.

`APP_URL` defines the OAuth callback origin and must use HTTPS outside local development. OAuth code reads `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`; the session SDK reads `JWT_SECRET` and rejects weak values. Secrets belong in local development bindings or deployment secret configuration, not committed public vars.

`pnpm dev:ui` runs Vite alone. `pnpm dev` builds the UI then runs Wrangler. `db:local` and `db:remote` apply migrations to different targets. `cf:check` builds and performs a deployment dry run; `cf:deploy` performs a real deployment. These commands have been inspected, not executed here.

## API troubleshooting

The Worker rejects an explicit foreign Origin with 403, non-JSON POSTs with 415, and streamed request bodies over 8 MB with 413. Its limiter can return 429 with `Retry-After: 60`. Verify request origin, content type and payload size before treating these responses as application failures.


## Source snapshot

- [wrangler.jsonc](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/wrangler.jsonc)
- [server/worker.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/worker.ts)
- [server/_core/runtime.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/_core/runtime.ts)
- [server/_core/oauth.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/_core/oauth.ts)
- [server/_core/sdk.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/_core/sdk.ts)
