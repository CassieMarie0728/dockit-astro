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

## Phase 5: repeatable hub quality checks

`npm run validate` passed on October 29, 2026: seven checker fixture tests, a 51-page Astro build, and zero local href/heading-fragment errors in the generated site. The fixture tests cover relative/root links, query strings, encoded IDs, missing destinations, missing anchors, skipped external schemes, asset hrefs, text fragments and an empty build.

The first fragment-aware run found broken `#_top` links on the homepage and 404 page. The shared hero heading now provides that ID; the rerun passed. External URLs are not fetched, so this result does not establish GitHub availability or application runtime health.

See [maintenance commands](/maintaining-the-codex/) for the Python prerequisite and how to validate a fresh build after Sitepins or Git edits.

## Phase 6: navigation semantics and release cleanup

The hub’s static checks now include 12 fixture tests (seven link checks and five structural checks). The generated HTML is checked for one main landmark and heading, duplicate IDs and main-menu semantics. Main-navigation controls use a native button with expanded state, and the sidebar toggle updates its button’s expanded-state attribute. Active-page detection now compares URL paths rather than a full URL with relative paths.

Decorative template image backgrounds were replaced with CSS brand gradients, a Chaos Codex favicon was added, and the undefined secondary-font request was removed. These are hub changes; application defects listed in the [known-issues dashboard](/known-issues/) remain open.

No interactive browser, mobile viewport, screen-reader or contrast audit was performed in this pass. Static semantic checks are a bounded regression check, not accessibility certification.

Phase 6 validation passed: 12 fixture tests, a 52-page Astro build, zero local link/fragment errors and zero structural errors. Rendered active-page markers were also verified on Home, Find a Task, Documentation Status and Known Issues.

## Phase 7: deployment runtime and canonical-URL checks

The installed Astro 7.0.3 manifest requires Node >=22.12.0; the inherited Netlify Node 20 setting was incompatible. Hosting now recommends Node 24 and pins pnpm 10.4.1.

Five Node test groups passed for optional/local URL handling, normalized HTTPS roots, malformed/HTTP values, credentials/query/fragment rejection, and subpath/localhost rejection. The release check correctly failed when SITE_URL was unset.

A release build using the reserved test origin `https://codex.example.test` generated 53 pages, a sitemap index and the expected canonical URL on the deployment guide. Link and structural checks reported zero errors. This was an isolated build fixture, not a published deployment or a verified real domain. Final local validation runs with no test origin configured.

GitHub metadata still pointed to the original theme homepage, GitHub Pages was disabled, and the inspected commit’s status list supplied no deployment URL. The connected browser could not initialize in this session. An actual preview URL is still needed for interactive navigation, search, mobile layout and accessibility checks; none of those is recorded as passed.

The release fixture also exposed a stale-output problem: a subsequent local build retained the prior sitemap. Builds now clean the generated dist directory before Astro runs. The final no-SITE_URL validation verifies that the fixture sitemap is absent.
