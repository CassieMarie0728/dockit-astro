---
title: "MCP Hub API reference status"
sidebar:
  order: 4
---

**Status: specification-backed reference awaiting runtime verification.**

The companion repository is `CassieMarie0728/mcp-hub-api-key`. Its inspected tree contains OpenAPI documents, a Swagger JSON file, Postman collections, and narrative documentation. It did not contain a root `package.json` or an obvious service entry point.

## Reference scope to reconcile

The README describes authentication, server discovery, connections, tool invocation, resources, prompts, completions and event streaming. These are documented intentions until checked against an executing service.

## API documentation checklist

- Select the authoritative specification among the duplicate OpenAPI/Swagger files.
- Identify the actual service implementation and deployment URL.
- Verify authentication schemes and permissions against server middleware.
- Confirm endpoint paths, request bodies, responses and error codes.
- Run sanitized examples against a test environment.
- Publish versioned examples only after reconciliation.

## What belongs here next

Authentication, endpoint reference, connection lifecycle, tool calls, resource access, streaming, errors, limits and runnable examples. No invented base URL or production credential belongs in this guide.

