---
title: "Configure a local MCP Hub"
sidebar:
  order: 6
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Start with two processes

The declared package manager is `pnpm@9.12.0`. Install dependencies from the repository root using its lockfile. Copy `.env.example` to `.env`, review the values, and configure the services you intend to use.

Run `pnpm dev:server` for Express and `pnpm dev` for the Expo/Metro client in separate terminals. `pnpm dev` alone does not start the API. Database migration commands change the configured database; review the target before using `pnpm db:push`.

## Configuration actually read by source

| Variable | Consumer / purpose |
| --- | --- |
| `PORT` | Preferred Express port; defaults to 3000 |
| `DATABASE_URL` | Database URL in backend ENV |
| `JWT_SECRET` | Backend cookie secret value in ENV |
| `VITE_APP_ID` | Backend app ID; defaults to `mcp-hub-app` |
| `OAUTH_SERVER_URL`, `OWNER_OPEN_ID` | Backend OAuth and owner configuration |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Backend Forge integration |
| `EXPO_PUBLIC_API_BASE_URL` | Explicit client API origin |
| `EXPO_PUBLIC_OAUTH_PORTAL_URL`, `EXPO_PUBLIC_OAUTH_SERVER_URL`, `EXPO_PUBLIC_APP_ID` | Client login configuration |
| `EXPO_WEB_PREVIEW_URL`, `EXPO_PACKAGER_PROXY_URL` | Extra accepted CORS origins |

The example file also lists `COOKIE_SECRET`, `MCP_SERVER_URL` and `OPENAI_API_KEY`; their presence alone does not establish how every integration uses them. In the inspected backend ENV object the cookie secret comes from `JWT_SECRET`. Replace development secrets for any deployed environment. Never put server credentials in public Expo variables.

## Point the client at the right server

`getApiBaseUrl()` uses the explicit public API URL first. On web it can rewrite a sandbox hostname beginning `8081-` to `3000-`. Otherwise it returns an empty string, producing a relative request URL. It does not automatically rewrite an ordinary `localhost:8081` address to port 3000.

For a phone, use a reachable host address rather than the phone’s own localhost. For a separately hosted browser UI, also verify that its origin appears in the server’s allowlist.

## Check the boundary

Request `/api/health` at the actual logged port, then confirm the client reaches `/api/trpc`. A successful health response establishes HTTP reachability only. Login and a workspace-scoped server operation require their own checks.


## Source snapshot

- [.env.example](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/.env.example)
- [server/_core/env.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/env.ts)
- [server/_core/index.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/index.ts)
- [constants/oauth.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/constants/oauth.ts)
