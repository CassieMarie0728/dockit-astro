---
title: "Grief Ops Suite: Readiness: what must work before a user tutorial"
description: "Grief Ops Suite documentation \u2014 Readiness: what must work before a user tutorial."
sidebar:
  label: "Readiness: what must work before a user tutorial"
  order: 6
---

**Developer readiness checklist. This is not a usable Night Watch or Foreman tutorial.**

## Current rendering state

The root navigator registers Night Watch, Foreman and Road Captain Locked, but all three corresponding home components currently return `null`. Shared Button and Text components also return `null`. Screen and ThemeProvider simply pass through children. Other flow files such as ClockIn and PanicFlow are comments/placeholders.

A route existing on disk is not proof of a rendered experience. The earlier screen map describes navigation wiring only.

## Gates in order

| Gate | Work required | Evidence needed |
| --- | --- | --- |
| App boots | Wire the root entry and declare missing navigation dependencies | A clean install launches the intended app |
| Selector renders | Implement shared Text/Button components | Labels visible; buttons usable by touch and accessibility tools |
| Home screens render | Replace null-returning home components | Each selected mode shows meaningful content |
| One complete flow | Implement one Night Watch or Foreman path | Start, intermediate steps, exit and return work |
| Persistence | Implement database connection and repositories | Saved state survives restart; failed writes are visible |
| Content/auth | Implement only the services the chosen flow needs | Offline behavior and sign-in boundaries verified |
| Export | Replace export manager placeholder | Exported content matches saved state and opens externally |

## First acceptance run

Use synthetic data and choose one mode. Confirm the selector is visible, navigate into that mode, complete one step, exit and reopen it. Record what survives restart and what is intentionally temporary. Do not claim working crisis support or recovery tools from an empty screen scaffold.

## How the future user guide should read

Once a flow works, document its visible controls, expected outcomes, exit path, persistence and failure behavior. Link the guide to the tested app commit and supported platform. Keep placeholders in the developer backlog until there is actual behavior to explain.


## Source snapshot

- [src/app/navigation/RootNavigator.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/app/navigation/RootNavigator.tsx)
- [src/features/nightWatch/screens/NightWatchHome.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/features/nightWatch/screens/NightWatchHome.tsx)
- [src/features/foreman/screens/ForemanHome.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/features/foreman/screens/ForemanHome.tsx)
- [src/features/roadCaptain/screens/RoadCaptainLocked.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/features/roadCaptain/screens/RoadCaptainLocked.tsx)
- [src/shared/ui/components/Button.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/shared/ui/components/Button.tsx)
- [src/shared/ui/components/Text.tsx](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/shared/ui/components/Text.tsx)
- [src/core/exports/exportManager.ts](https://github.com/CassieMarie0728/grief-ops-suite/blob/85534f2bcb8965e34c29742ed097c6c0443c0ad1/src/core/exports/exportManager.ts)
