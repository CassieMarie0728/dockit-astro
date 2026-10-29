---
title: "Jekyll Forge: Tutorial: bring up a local Forge"
description: "Jekyll Forge documentation \u2014 Tutorial: bring up a local Forge."
sidebar:
  label: "Tutorial: bring up a local Forge"
  order: 7
---

**Local-only setup.** This tutorial does not deploy a Worker, change a remote D1 database or write to GitHub.

## 1. Install the pinned dependencies

The repository’s Cloudflare setup guide specifies Node 24 and pnpm 10.4.1. From a clean checkout:

```sh
git clone https://github.com/CassieMarie0728/jekyll-forge.git
cd jekyll-forge
npx pnpm@10.4.1 install --frozen-lockfile
```

Preserve the lockfile if installation fails. Record the actual error before considering changes to dependency versions.

## 2. Configure local bindings

Copy `.dev.vars.example` to `.dev.vars`. Replace its JWT placeholder with a locally generated random secret of at least 32 characters. Do not commit the resulting file.

Real login needs a development GitHub OAuth application and matching callback origin. The existing `wrangler.jsonc` describes an existing hosted environment; review it before trying real login. This tutorial stops at unauthenticated local reachability unless you have configured your own login settings.

## 3. Apply local migrations

```sh
npx pnpm@10.4.1 db:local
```

This script passes `--local` and applies migrations under `drizzle/d1` to local D1 state. Do not substitute `db:remote`.

## 4. Start the combined app

```sh
npx pnpm@10.4.1 dev
```

The script builds the UI then starts Wrangler. Use the actual local URL printed by Wrangler, normally `http://localhost:8787`.

In another terminal, request:

```sh
curl http://localhost:8787/api/health
```

The inspected handler returns `{"ok":true,"platform":"cloudflare"}`. This establishes HTTP reachability, not a successful database query, login or repository write.

## 5. Optional faster UI editing

Run `npx pnpm@10.4.1 dev:ui` in a second terminal. Vite proxies `/api` to port 8787. Use port 8787 for callback testing, as advised by the repository guide; do not assume cookies and redirect origins transfer between the Vite and Wrangler ports.

## Stop here before production

`cf:deploy` and `db:remote` are separate production operations. A deployment configuration guard does not verify account plan, stored secrets, login success or repository publishing. Review [Cloudflare architecture](/projects/jekyll-forge/architecture/) before any remote setup.


## Source snapshot

- [CLOUDFLARE_SETUP.md](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/CLOUDFLARE_SETUP.md)
- [.dev.vars.example](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/.dev.vars.example)
- [package.json](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/package.json)
- [vite.config.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/vite.config.ts)
- [server/worker.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/worker.ts)

## Recorded setup results

[Read the setup validation record](/validation/) for the tested environment, successful install/build steps and runtime restrictions encountered.
