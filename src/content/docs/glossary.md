---
title: Glossary
sidebar:
  order: 4
---

## API

An interface software calls to request data or actions. A REST endpoint and a tRPC procedure are different interfaces; matching names do not make their request formats interchangeable. [MCP API reference](/projects/mcp-hub/api/).

## MCP

Model Context Protocol. A vendor’s ordinary REST API URL is not automatically an MCP server endpoint. MCP Hub’s current connection workflow expects a real MCP HTTPS endpoint. [Connect a server](/projects/mcp-hub/first-connection/).

## tRPC

The typed procedure interface used by MCP Hub and Jekyll Forge. The app composes named procedures under `/api/trpc`. Follow the project’s client and authentication transport rather than substituting a REST example from a separate specification.

## OAuth and repository access

OAuth is the login/authorization flow used by these applications. In Jekyll Forge, signing in and connecting a repository-access token are separate steps. [First draft tutorial](/projects/jekyll-forge/first-draft/).

## D1 and local migrations

D1 is the database binding used by Forge’s Cloudflare Worker. A migration changes database structure. The repository’s local and remote migration scripts target different environments; completing one does not establish the state of the other. [Local setup](/projects/jekyll-forge/local-quickstart/).

## Worker and ASSETS

The Worker is Forge’s server request handler. Its `ASSETS` binding serves the built frontend; API paths go through application handlers. [Architecture](/projects/jekyll-forge/architecture/).

## CORS and Origin

A browser sends an Origin identifying the page making a request. Cross-origin response rules can make a browser call fail even when a direct HTTP client reaches the server. The app’s exact origin policy matters. [MCP troubleshooting](/projects/mcp-hub/troubleshooting/).

## Overlay and native module

Snippet Bubble’s overlay is an Android service that can display above other apps with permission. Its native module must be included in the installed build; a web preview does not supply it. [Overlay tutorial](/projects/snippet-bubble-manager-v2/overlay-tutorial/).

## Content export versus full backup

A content export may preserve text while omitting IDs, grouping, settings or history. Snippet Bubble’s current Settings export has those limitations. Check exactly what an export contains before treating it as a full restore point. [Export contents](/projects/snippet-bubble-manager-v2/backup-restore/).

## Markdown, HTML, DOCX and PDF

Markdown is editable text with formatting conventions; HTML is rendered web document markup. Native DOCX is an Office Open XML package. A filename extension alone does not establish the underlying format. VOID’s current export paths are described in its [export guide](/projects/void-repo-docs/export-tutorial/).

## Source-backed and runtime-tested

Source-backed means the implementation was inspected. Runtime-tested means a specified check was executed in a recorded environment. Neither phrase alone establishes every feature, device or production deployment. [Validation record](/validation/).

## Planning and readiness gate

Planning pages propose behavior that has not been established as implemented. A readiness gate defines the evidence needed before claiming a workflow is available. See the [novel app acceptance proposal](/projects/new-badass-novel-writing-app/acceptance/) and [Grief Ops gates](/projects/grief-ops-suite/readiness/).
