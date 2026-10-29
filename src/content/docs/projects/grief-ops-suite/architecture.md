---
title: "Grief Ops Suite: Existing screens and unfinished wiring"
description: "Grief Ops Suite documentation \u2014 Existing screens and unfinished wiring."
sidebar:
  label: "Existing screens and unfinished wiring"
  order: 5
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Navigation exists; rendering is still a scaffold

`src/app/App.tsx` wraps the root navigator in the shared theme provider. The navigator starts at Ops Selector and registers Deployment Briefing, Locked Mode Briefing, Night Watch, Foreman and Road Captain Locked screens.

The registered Night Watch, Foreman and Road Captain Locked home components return `null`. Shared Button and Text components also return `null`, so the selector is not established as a usable rendered screen. [Read the readiness gates](/projects/grief-ops-suite/readiness/).

Ops Selector declares links directly to Night Watch and Foreman. Road Captain routes to its locked screen. Feature flags for Road Captain, Drill Sergeant and Pit Boss are all false in the inspected file. Drill Sergeant and Pit Boss are not registered as full screens in this root navigator.

## What remains skeletal

| File / area | Observed state |
| --- | --- |
| `src/core/db/index.ts` | SQLite connection placeholder |
| `src/core/auth/authClient.ts` | Auth client placeholder |
| `src/core/contentEngine/syncManager.ts` | Sync manager placeholder |
| `features/opsSelector/logic/modeRouter.ts` | Mode router placeholder |
| Root package quality scripts | Lint and test print placeholders |

Screen files, SQL migrations and export templates are present, but they do not establish a working persistent database, authenticated session or content sync.

## Startup gaps to resolve

The package declares `node_modules/expo/AppEntry.js` as its entry point. The inspected root has no `App.tsx`; the implemented app component is nested under `src/app/App.tsx`. RootNavigator imports React Navigation packages that are not declared among the root package’s three runtime dependencies. Resolve entry-point wiring and missing dependencies before presenting the starter commands as a working installation recipe.

## Current configuration

`src/app/config/env.ts` hardcodes the WordPress base URL and disables analytics. It does not read a `.env` file in the inspected code. Changing a shell variable alone will not change that object.

## Next runnable milestone

Wire the app entry, declare the imports it needs, and boot into Ops Selector. Then verify one complete Night Watch flow and one Foreman flow. Persistence, auth, content refresh and exports each require their own checks before being advertised as available.


## Source snapshot

- [src/app/App.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/app/App.tsx)
- [src/app/navigation/RootNavigator.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/app/navigation/RootNavigator.tsx)
- [src/app/config/featureFlags.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/app/config/featureFlags.ts)
- [src/app/config/env.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/app/config/env.ts)
- [src/core/db/index.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/core/db/index.ts)
- [src/core/auth/authClient.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/core/auth/authClient.ts)
- [src/core/contentEngine/syncManager.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/core/contentEngine/syncManager.ts)
- [package.json](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/package.json)
