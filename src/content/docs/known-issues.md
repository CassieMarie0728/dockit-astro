---
title: Known issues and readiness dashboard
description: Confirmed defects, implementation limits and untested boundaries across the projects.
sidebar:
  order: 4
---

Review date: **October 29, 2026**. This dashboard describes the source snapshots in the [review index](/source-review/). An issue stays open here until its fix is inspected and the relevant behavior is checked.

## Confirmed defects and implementation limitations

| Project | Finding | Current guidance | Details |
| --- | --- | --- | --- |
| Snippet Bubble Manager v2 | Mixed Replace Matches imports can overwrite the wrong entry | Keep an export; prefer Skip Duplicates or Keep Both for mixed batches | [Reproduced case](/projects/snippet-bubble-manager-v2/known-import-issue/) |
| Snippet Bubble Manager v2 | JSON export omits IDs, grouping, copy history and settings | Treat as a content export, not a full device backup | [Export contents](/projects/snippet-bubble-manager-v2/backup-restore/) |
| VOID Repo Docs | DOCX-labeled download contains HTML, not a native OOXML package | Keep Markdown and verify the exported format in the intended editor | [Exports](/projects/void-repo-docs/export-tutorial/) |
| VOID Repo Docs | Refinement uses Gemini independently of generation provider selection | Configure/check Gemini for refinement even if another provider generates successfully | [Refinement](/projects/void-repo-docs/refine-tutorial/) |
| VOID Repo Docs | Notion conversion caps output at 95 blocks | Compare transferred content; do not assume complete long-document export | [Notion boundary](/projects/void-repo-docs/export-tutorial/) |
| Grief Ops Suite | Registered home screens and shared Text/Button controls return null | Developer scaffold; complete rendering and startup gates before a user trial | [Readiness gates](/projects/grief-ops-suite/readiness/) |
| MCP Hub | Former bridge-side execution screen is deliberately retired | Connection registration is available in source; do not expect that old screen to execute tools | [Connection tutorial](/projects/mcp-hub/first-connection/) |

## Validation gaps

| Area | What is still needed |
| --- | --- |
| MCP Hub runtime | A normal development environment to start the API, authenticate and check a real server |
| Forge runtime | A working local Worker session, OAuth acceptance and verified writes to a disposable repository |
| Native apps | Android build/device checks, overlay return flow and cross-device sync where applicable |
| VOID integrations | Live generation, refinement, download compatibility and intentional Notion export checks |
| Novel-writing app | Product decisions and implementation; all blueprint behavior remains proposed |

Workspace system restrictions blocked both app-server health checks in the recorded setup run. That is an environment limitation, not proof that either application is broken. See the [validation record](/validation/).

## Hub release follow-up

The hub builds, indexes search and checks static links/structure. Its canonical deployment URL must be supplied through SITE_URL. Local builds may omit it and skip sitemap generation; release builds now require it. [Deployment instructions](/deployment/). Keyboard interactions, narrow-screen layout, search results, theme switching and a screen-reader pass still need interactive browser validation on the deployed site.

## Closing an issue

Record the application fix commit, reproduce the original trigger, verify the corrected behavior and update the affected guide plus this dashboard. A docs edit alone does not fix an application defect.
