---
title: "Verification backlog"
sidebar:
  order: 3
---

**Status: needs verification.**

## Before publishing a complete setup guide

- Inspect source entry points and document the actual user workflow.
- Identify required runtime versions from repository configuration and lockfiles.
- Inventory environment variable names from source; publish safe examples only.
- Confirm authentication, persistence, storage and external service requirements.
- Run setup in a clean environment and record platform, commit and results.
- Verify build and quality checks; distinguish placeholders from working checks.

## Architecture documentation to fill

| Topic | Evidence needed |
| --- | --- |
| Application entry points | Source paths and route definitions |
| Data flow | Calling code, server handlers and storage schema |
| Authentication | Middleware, session lifecycle and authorization checks |
| Deployment | Actual platform config and required bindings |
| Troubleshooting | Reproduced failures and confirmed fixes |

[Source repository](https://github.com/CassieMarie0728/grief-ops-suite)

