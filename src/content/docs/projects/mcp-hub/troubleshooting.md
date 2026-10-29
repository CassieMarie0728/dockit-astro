---
title: "Troubleshooting MCP Hub"
description: "MCP Hub documentation \u2014 Troubleshooting MCP Hub."
sidebar:
  label: "Troubleshooting MCP Hub"
  order: 8
---

Use the first failing boundary rather than repeatedly reinstalling everything.

| Symptom | Check first | Next action |
| --- | --- | --- |
| UI starts but API calls fail | `pnpm dev` starts Metro only | Run `pnpm dev:server` in another terminal |
| API is not on port 3000 | Server searches for an available port | Read the logged port and update the client API origin |
| Browser calls the UI host instead of API | Empty base URL produces relative requests | Set `EXPO_PUBLIC_API_BASE_URL` to the reachable API origin and restart client tooling |
| Direct request works, browser fails | CORS compares exact origins | Compare scheme, hostname and port with the server allowlist |
| Protected procedure returns UNAUTHORIZED | Context has no authenticated user | Check sign-in and session transport; health success does not authenticate you |
| HTTP or unusual-port server rejected | Current endpoint policy | Use the server’s supported standard-port HTTPS MCP endpoint |
| Private-network server rejected | DNS/IP policy rejects blocked addresses | Treat it as an unsupported target for this connection path |
| “Server saved” rather than “Server connected” | Registration and testing are separate | Confirm endpoint availability and credentials, then recheck |
| Tool execution menu shows a gate | Old native route is retired | Use the existing API reference for development; do not expect that screen to run tools |
| Health says OK, database operation fails | Health does not query the database | Check database URL, availability and migration state separately |

## Collect an actionable report

Include the repository commit, platform, Node/package-manager versions, failing route or command, HTTP status and redacted error. Record the actual logged API port and the UI origin. Never paste session cookies, bearer tokens, API keys or a full credential-bearing database URL.

## Verification boundary

The connection tutorial and this table follow inspected code. Live OAuth, database provisioning, remote endpoint discovery and tool calls require a separate acceptance run.


## Source snapshot

- [server/_core/index.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/index.ts)
- [server/_core/context.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/_core/context.ts)
- [constants/oauth.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/constants/oauth.ts)
- [app/(tabs)/tool-execution.tsx](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/app/(tabs)/tool-execution.tsx)
