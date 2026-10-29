---
title: Setup validation record
sidebar:
  order: 3
---

Run date: **October 29, 2026**. Environment: Linux workspace, Node **24.22.1**. These results describe the inspected commits, not every operating system or current production deployment.

## Checks performed

| Project | Command or check | Result | What it establishes |
| --- | --- | --- | --- |
| MCP Hub | `corepack pnpm@9.12.0 install --frozen-lockfile` | Passed | Dependencies installed from the committed lockfile |
| MCP Hub | `corepack pnpm@9.12.0 build` | Passed | Backend bundle generated; this does not build the mobile client |
| MCP Hub | Direct endpoint-policy assertions through Node | Passed | HTTPS accepted; HTTP, embedded credentials, alternate port, loopback and a simulated private DNS answer rejected |
| MCP Hub | `corepack pnpm@9.12.0 dev:server` | Environment blocked | tsx watcher could not create `/tmp/tsx-0/19.pipe`; exited with `listen EPERM` before HTTP health could be tested |
| Jekyll Forge | `corepack pnpm@10.4.1 install --frozen-lockfile` | Passed with install warning | Dependencies installed; pnpm warned about ignored dependency build scripts |
| Jekyll Forge | `corepack pnpm@10.4.1 build` | Passed | Vite generated `dist/public`; chunk-size warnings remain |
| Jekyll Forge | `corepack pnpm@10.4.1 db:local` | Passed | Four migrations applied to a fresh local D1 database |
| Jekyll Forge | `wrangler dev --local` on a test port | Environment blocked | Wrangler failed with `uv_interface_addresses` system error before the health request could complete |

The policy assertions injected a private DNS response and made no network request. They do not verify a remote MCP server.

## Source revisions

| Project | Inspected commit |
| --- | --- |
| MCP Hub | `2f18e4afb9f680f782ce4090725f47e32f36fde2` |
| Jekyll Forge | `99cc09f74b2f7a419afe56acb53050d71fb229ec` |

The local D1 run applied `0000_massive_silver_sable.sql`, `0001_wonderful_blob.sql`, `0002_friendly_thaddeus_ross.sql` and `0003_puzzling_eternals.sql`. No `--remote` migration was run.

## Still unverified

Neither local HTTP health check completed in this restricted runtime. OAuth login, a real MCP connection, repository writes, model calls, mobile builds, scheduled publication and production deploys were not tested. Do not convert a build success into a claim that those workflows work.

## Reproduce on a normal development machine

Use the [Forge quickstart](/projects/jekyll-forge/local-quickstart/) or [MCP configuration guide](/projects/mcp-hub/configuration/). Record the exact commit and runtime. First confirm health reachability; then validate sign-in and one intended operation separately. Keep secrets and personal content out of reports.

## Phase 4: import checks and export/readiness audit

Run date: October 29, 2026, Node 24.22.1. The snippet parser/planner was imported directly through Node’s TypeScript support and exercised with synthetic data only.

Five assertions passed: missing code is rejected; missing language defaults to Plaintext; skip counts two existing duplicates; copy counts one duplicate; and a duplicate-only replacement counts one replacement.

A separate assertion reproduced the mixed-batch replacement defect: starting with A/B, importing new C before duplicate A with Replace Matches caused C to disappear. This is a **confirmed defect**, not a successful round-trip test. [Read the trigger and interim guidance](/projects/snippet-bubble-manager-v2/known-import-issue/).

The inspected snippet commit is `51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9`. The VOID export/refinement audit used `e5b347312236bb2c6ab78233b01ea94c453a5f36`; Grief Ops readiness used `85534f2bcb8965e34c29742ed097c6c0443c0ad1`.

VOID export-format descriptions and Grief Ops rendering status are source observations, not browser/download or app-runtime tests. No real snippets, provider keys, Notion pages or user documents were used.
