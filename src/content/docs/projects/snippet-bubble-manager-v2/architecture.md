---
title: "Snippet Bubble Manager v2: Client, server and AI boundaries"
description: "Snippet Bubble Manager v2 documentation \u2014 Client, server and AI boundaries."
sidebar:
  label: "Client, server and AI boundaries"
  order: 6
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Main components

| Component | Responsibility in source |
| --- | --- |
| Expo routes | Library, favorites, settings, AI and snippet editing |
| `lib/snippet-context.tsx` | Local snippet and settings persistence |
| `lib/cloud-sync-context.tsx` | Cloud-sync state consumed by Settings |
| `server/routers.ts` | tRPC procedures, AI quota reservation and telemetry |
| Local floating-bubble module | Android native overlay bridge |

The package’s `dev` script launches server and Metro together. Its web preview does not exercise the native overlay. Build and test Android separately.

## Backend configuration

`server/_core/env.ts` reads `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `NODE_ENV`, `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY`. Client OAuth configuration reads public Expo variables including `EXPO_PUBLIC_API_BASE_URL` and the OAuth portal/app settings. Configure both sides; do not place backend API keys in public variables.

## AI request handling

The router validates messages with role `system`, `user` or `assistant` and trimmed content between 1 and 12,000 characters. AI calls reserve quota before invoking the model. Rejections record telemetry and raise `TOO_MANY_REQUESTS` with a reset time. The scope is account-based for signed-in users and anonymous otherwise, with an HMAC-derived scope hash.

A quota response is different from a provider failure. Check the returned message and reset timestamp before retrying. The code distinguishes `generate`, `explain`, `convert` and `generateRelated` procedure categories; this page does not assert exact limits or provider uptime.

## Validation still needed

Exercise clean installation, local persistence after restart, Android permission return, import/export round trips, authenticated sync on two devices and quota-boundary behavior. No live AI request was made during this documentation pass.


## Source snapshot

- [server/_core/env.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/server/_core/env.ts)
- [server/routers.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/server/routers.ts)
- [constants/oauth.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/constants/oauth.ts)
- [lib/snippet-context.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-context.tsx)
