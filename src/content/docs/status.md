---
title: Documentation status
sidebar:
  order: 2
---

Review date: **October 29, 2026**. Phase 6 adds release cleanup, navigation semantics, a known-issues dashboard and static HTML structure checks. It does not certify application readiness.

| Project | Source-backed coverage | Still needs execution |
| --- | --- | --- |
| [MCP Hub](/projects/mcp-hub/architecture/) | Request flow, auth boundary, tRPC procedure reference, environment mapping | Login, database, remote server discovery and tool calls |
| [Jekyll Forge](/projects/jekyll-forge/architecture/) | Worker bindings, API guards, route map and deployment distinctions | Clean D1 setup, GitHub authorization, editing and publishing |
| [Snippet Bubble Manager v2](/projects/snippet-bubble-manager-v2/workflows/) | Content export limitations, reproduced import defect, overlay tutorial and AI boundaries | Android build, two-device sync, backup round trip and quota tests |
| [VOID Repo Docs](/projects/void-repo-docs/workflows/) | Generation/refinement boundaries, export formats, draft storage and configuration | Live model calls, refine flow, Notion export and Android packaging |
| [Novel Writing App](/projects/new-badass-novel-writing-app/planning/) | Proposed product decisions and first milestone | Product decisions and implementation |
| [Grief Ops Suite](/projects/grief-ops-suite/architecture/) | Null-rendering screen/control stubs, feature flags and readiness gates | Entry wiring, dependencies, working flows and persistence |

## API reconciliation

MCP Hub’s inspected executable exposes tRPC under `/api/trpc`. The companion REST/OpenAPI documents are not evidence that `/connections` routes exist in that server. [Read the implementation reference](/projects/mcp-hub/api/).

## Setup checks run

Clean installs and builds passed for MCP Hub and Jekyll Forge; four local Forge D1 migrations also passed. Development servers were blocked by workspace system restrictions before HTTP health checks. [See exact commands and results](/validation/).

## Validation boundaries

The hub’s static build and internal link destinations are checked for this change. Local application setup was exercised only as recorded above. OAuth services, model providers, remote databases and production deployments were not invoked. Source links on the new pages pin the exact inspected commits.

## Next pass

Use the verification pages to exercise each project in a clean environment. Fixes to application code should be isolated in the relevant repository, with the hub updated once behavior changes.

## Known issues surfaced in Phase 4

- Snippet Bubble mixed Replace Matches imports can overwrite a newly inserted entry. [Details and interim guidance](/projects/snippet-bubble-manager-v2/known-import-issue/).
- VOID’s DOCX-labeled download contains HTML rather than a native OOXML package. [Export behavior](/projects/void-repo-docs/export-tutorial/).
- Grief Ops’ registered home screens and shared Text/Button controls return null. [Readiness gates](/projects/grief-ops-suite/readiness/).

These application issues are documented here; this hub change does not fix their source code.

## Hub maintenance checks

`npm run validate` runs link-checker fixture tests, builds the hub and checks generated local destinations and heading anchors. See [maintenance instructions](/maintaining-the-codex/). This checks documentation integrity only.

## Release dashboard

[Known issues and readiness](/known-issues/) consolidates the application limitations and remaining hub release checks. Phase 6 adds semantic navigation controls, active-page markers, decorative brand backgrounds and static HTML structure validation. Interactive browser/accessibility validation remains outstanding.
