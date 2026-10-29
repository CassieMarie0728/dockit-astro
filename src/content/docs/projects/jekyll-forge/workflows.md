---
title: "Editor routes and project map"
sidebar:
  order: 6
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Find the right screen

The React router maps sites into a shared `AppLayout`. These are source routes, not a promise that every action has been tested against GitHub.

| Route | Screen |
| --- | --- |
| `/repos` | Repository picker |
| `/dashboard/:siteId` | Dashboard |
| `/editor/:siteId` | New/editor entry |
| `/editor/:siteId/<postPath>` | Editor for an existing repository path |
| `/inventory/:siteId` | Repository inventory |
| `/assets/:siteId` | Asset manager |
| `/themes/:siteId` | Theme manager |
| `/scheduler/:siteId` | Scheduler |
| `/health/:siteId` | Site health |
| `/ai-settings/:siteId` | AI settings |
| `/social-analytics/:siteId` | Social analytics |
| `/settings` | User settings |

## Trace an operation

Start with the screen in `client/src/pages`, follow its tRPC call into the corresponding `server/routers` file, then inspect the database or GitHub operation it invokes. The router composes `sites`, `posts`, `assets`, `snapshots`, `scheduler`, `github`, `ai`, `aiProviders` and other namespaces.

## Mobile authentication detail

`auth.exchangeMobileCode` accepts a code between 32 and 256 characters and consumes it through the database. An invalid, expired or reused code returns `UNAUTHORIZED`. On success it issues a seven-day session token and a limited user object. Document and test the full callback flow before treating desktop browser login as sufficient mobile validation.

## Next user-guide validation

Exercise repository selection, opening an existing post, saving to the intended branch, previewing, scheduling and confirming the resulting GitHub change. Record the commit and whether the action writes to the repository. The presence of a screen alone does not verify those outcomes.


## Source snapshot

- [client/src/App.tsx](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/client/src/App.tsx)
- [server/routers.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/routers.ts)
