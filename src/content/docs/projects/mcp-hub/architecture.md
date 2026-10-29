---
title: "MCP Hub: Architecture and request flow"
description: "MCP Hub documentation \u2014 Architecture and request flow."
sidebar:
  label: "Architecture and request flow"
  order: 5
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## The running application

The mobile/web client uses Expo Router. Its tRPC client posts to `${getApiBaseUrl()}/api/trpc`; the Express entry point mounts `appRouter` at `/api/trpc`. A separate `/api/health` route returns `ok`, a timestamp and a version string. That health response does not check database or MCP connectivity.

The request path is:

1. Expo client sends a request to Express.
2. Request context resolves the current user.
3. The tRPC procedure validates input and authentication.
4. Workspace access scopes the authorized MCP operation.

## Authentication boundary

`createContext` asks the SDK to authenticate the request. Authentication failures produce `user: null`; public procedures can still run. `protectedProcedure` rejects missing users with `UNAUTHORIZED`; `adminProcedure` requires an admin role and rejects otherwise with `FORBIDDEN`.

The core MCP router calls `getOrCreatePersonalWorkspaceAccess` before its authorized operations. Supplying a server UUID is not a substitute for workspace access.

## Router map

| Namespace | Purpose in router composition |
| --- | --- |
| `auth` | Current user and logout |
| `mcp` | Core server registration, discovery, testing and tool execution |
| `mcpServers` | Extended server procedures |
| `tokens`, `oauth` | Token and OAuth operations |
| `workflows`, `templates` | Workflow procedures and templates |
| `webhooks`, `analytics`, `assistant` | Additional composed domain routers |

This map confirms registration of namespaces, not successful operation of every procedure. The core server also registers OAuth and AI HTTP routes outside tRPC.

## Runtime details

The server parses JSON and form bodies up to 1 MB, applies global and tRPC-specific limiters, and accepts credentialed CORS requests only for its configured origins. If the preferred port is occupied it searches the next 19 ports; read the startup log before configuring a client.


## Source snapshot

- [server/_core/index.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/index.ts)
- [server/routers.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/routers.ts)
- [server/_core/context.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/context.ts)
- [server/_core/trpc.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/trpc.ts)
- [server/mcp/mcp-router.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/mcp/mcp-router.ts)
- [lib/trpc.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/lib/trpc.ts)
