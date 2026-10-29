---
title: Source review index
sidebar:
  order: 2
---

This index records which implementation snapshots support the hub. It is a review ledger, not a promise that the source repositories have stopped changing. Newer source needs a fresh review before the docs can claim to describe it.

## Inspected source snapshots

| Project | Inspected commit | Main evidence |
| --- | --- | --- |
| MCP Hub | [2f18e4a](https://github.com/CassieMarie0728/mcp-hub/commit/2f18e4afb9f680f782ce4090725f47e32f36fde2) | Backend entry, tRPC/auth, connection screen and endpoint policy |
| Jekyll Forge | [99cc09f7](https://github.com/CassieMarie0728/jekyll-forge/commit/99cc09f74b2f7a419afe56acb53050d71fb229ec) | Worker/D1 configuration, repository picker, editor and post storage |
| Snippet Bubble Manager v2 | [51c0e804](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/commit/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9) | Import/export planner, settings, storage and native overlay |
| VOID Repo Docs | [e5b34731](https://github.com/CassieMarie0728/void-repo-docs/commit/e5b347312236bb2c6ab78233b01ea94c453a5f36) | Generation/refinement endpoints, browser state and export handlers |
| Grief Ops Suite | [85534f2b](https://github.com/CassieMarie0728/grief-ops-suite/commit/85534f2bcb8965e34c29742ed097c6c0443c0ad1) | Entry wiring, navigation, null-rendering components and service placeholders |
| Novel-writing app | README-only initial inspection | Product blueprint remains a proposal; no implementation established |

Review date for these snapshots: **October 29, 2026**. Phase 1 package-file blob hashes remain recorded on overviews as separate evidence. The companion MCP REST/OpenAPI material remains a specification-reconciliation task, not the executable tRPC implementation.

## When to re-review

| Change in source | Pages to revisit |
| --- | --- |
| Entry point, package scripts or runtime version | Setup, local quickstart, validation record |
| Environment names, auth or request origins | Configuration, login tutorial, troubleshooting |
| Endpoint or input schema | API reference and affected task guide |
| Save, sync, import or export behavior | Workflow guide, known limitations and recovery instructions |
| Feature flag or stub becomes functional | Readiness, overview and status |
| Known bug fixed | Reproduce the old failure, verify correction, then update interim guidance |

## Review procedure

1. Record the new source commit and inspect the relevant diff.
2. Follow actual callers and handlers, not only README claims.
3. Update affected prose and source permalinks together.
4. Run applicable checks and record exactly what passed or remained blocked.
5. Run the hub’s validation command before opening the docs PR.

Do not simply replace every source SHA with the newest one: that would claim a review that never happened. [Editorial and validation workflow](/maintaining-the-codex/).
