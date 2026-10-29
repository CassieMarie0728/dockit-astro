---
title: "MCP API: implementation and specification"
sidebar:
  order: 4
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Two different references

The executable app mounts a **tRPC API at `/api/trpc`**. The private companion repository `mcp-hub-api-key` contains REST/OpenAPI proposals. Its `docs/mcp-hub-api-openapi.yaml` file even includes Markdown code fences, example hostnames, and the incorrect expansion “Multi-Component Protocol.” MCP means Model Context Protocol. These documents need reconciliation before serving as an executable API contract.

The app entry point does not mount the companion specification’s `/connections` REST routes. That observation applies to the inspected entry point; it does not establish whether a separately deployed service exists.

## Implemented core MCP procedures

All procedures below use `protectedProcedure` and resolve personal-workspace access. Use the project’s typed client with its existing authentication transport; these are not interchangeable with REST curl examples.

| Procedure | Kind | Validated input |
| --- | --- | --- |
| `mcp.registerServer` | Mutation | `name`, URL, optional UUID; HTTP transport; optional headers and auth |
| `mcp.discoverTools` | Query | `serverId` UUID |
| `mcp.executeTool` | Mutation | `serverId` UUID, `toolName`, `input` object |
| `mcp.testConnection` | Mutation | `serverId` UUID |
| `mcp.getServer`, `mcp.getServerStatus` | Query | `serverId` UUID |
| `mcp.getAllServers`, `mcp.getAllServerStatuses` | Query | None |
| `mcp.removeServer` | Mutation | `serverId` UUID |
| `mcp.clearToolCache`, `mcp.clearAllCaches` | Mutation | UUID for one server; no input for all |

Core registration currently accepts `type: "http"` only. Auth modes in that schema are `bearer`, `api-key` and `basic`. Optional timeout is a positive integer no greater than 8,000 ms; retry attempts range from 0 to 1. The cache-clear procedures return success without invalidating persisted state: the source explicitly describes request-local runtime state.

## Read the result envelope

Registration returns `success`, `serverId` and `server`. Tool discovery returns `success`, `tools` and `count`. Tool execution returns `success`, `data` and `error`. A transport-level successful request therefore does not imply a tool succeeded; inspect the envelope.

## Contract reconciliation backlog

1. Identify any separately deployed REST implementation.
2. Select and normalize one OpenAPI source; remove fences and placeholder hosts.
3. Compare authentication, transports and request schemas with executable handlers.
4. Verify success and failure examples against a test environment before publishing runnable snippets.


## Source snapshot

- [server/_core/index.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/index.ts)
- [server/mcp/mcp-router.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/mcp/mcp-router.ts)
- [lib/trpc.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/lib/trpc.ts)
