---
title: "MCP Hub: Tutorial: add and check a server"
description: "MCP Hub documentation \u2014 Tutorial: add and check a server."
sidebar:
  label: "Tutorial: add and check a server"
  order: 7
---

**Source-guided walkthrough.** This flow has not been exercised with a live account or remote MCP endpoint during this pass.

## Before you start

Have the API and client running, a working sign-in, and a real MCP HTTPS endpoint you are authorized to use. A vendor’s ordinary REST API URL is not automatically an MCP endpoint. See [local configuration](/projects/mcp-hub/configuration/) for the two-process setup.

## 1. Open the current connection screen

Open MCP Servers. Its route redirects to `/server-connection`, where the screen heading is **Connect an MCP server**. Use this form rather than an older native-bridge connection guide.

## 2. Enter the endpoint

Give the connection a recognizable name and paste its complete HTTPS URL. The form rejects HTTP, embedded URL credentials and nonstandard HTTPS ports. The backend also rejects forbidden network addresses after DNS resolution, including loopback and private IPv4 ranges. A local `http://localhost` MCP server is therefore not a valid target for this workflow.

Choose No auth, Bearer, API key or Basic to match the server. Bearer/API-key modes require a token; Basic requires a username and password. Enter credentials in the dedicated fields, not in the URL.

## 3. Submit once and read the result

Submission calls `mcp.registerServer`, then `mcp.testConnection`, then refreshes the saved-server list. The result distinguishes:

- **Server connected:** the saved endpoint responded to the connection check.
- **Server saved:** registration succeeded, but the check did not succeed.
- A form error: the save/test sequence could not complete. The screen deliberately presents a generic message; inspect safe server logs for more detail.

A saved connection does not prove tool discovery or execution. Check the list before retrying a partially completed save, so you do not assume an error meant nothing was stored.

## 4. Recheck the saved server

Use its connection-check action to retry after correcting server availability or credentials. If removing a test entry, use the screen’s removal confirmation and verify the refreshed list.

## Where this tutorial stops

The former `/tool-execution` screen now shows **Bridge-Side Execution Is Retired**. Do not expect a tool-execution form there. The backend has authorized procedures, but the dedicated mobile execution interface still needs end-to-end work. See the [API reference](/projects/mcp-hub/api/) for the existing procedure contract.


## Source snapshot

- [app/(tabs)/mcp-servers.tsx](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/app/(tabs)/mcp-servers.tsx)
- [app/(tabs)/server-connection.tsx](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/app/(tabs)/server-connection.tsx)
- [app/(tabs)/tool-execution.tsx](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/app/(tabs)/tool-execution.tsx)
- [server/security/mcp-outbound-policy.ts](https://github.com/CassieMarie0728/mcp-hub/blob/2f18e4afb9f680f782ce4090725f47e32f36fde2/server/security/mcp-outbound-policy.ts)
