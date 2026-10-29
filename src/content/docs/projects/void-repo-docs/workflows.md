---
title: "VOID Repo Docs: Generate, revise and retain a document"
description: "VOID Repo Docs documentation \u2014 Generate, revise and retain a document."
sidebar:
  label: "Generate, revise and retain a document"
  order: 5
---

**Evidence:** source inspected October 29, 2026. Runtime behavior has not been tested in this pass.

## Generation workflow

1. Select the target platform. GitHub repository mode requires a parseable GitHub URL. Web and Android targets require an app name and accept manual project details.
2. Choose the document type, tone, length, version count and AI provider.
3. Supply a provider key through the configured backend or the app’s API-key settings.
4. Generate, inspect the result and edit the Markdown.
5. Save or export the draft before replacing it.

`POST /api/generate` validates inputs with Zod. Version count is constrained to 1–5. The frontend accepts a `markdowns` array, falling back to the single `markdown` result, and initializes the editor with the first version.

## Replacing a draft

If the current Markdown differs from the original, clicking FORGE first asks for overwrite confirmation. Clicking again proceeds. Generated results and edits are written into the `void_editor_draft` localStorage entry. This is browser-local persistence, not a verified cloud backup. Clearing site data can remove it.

Provider preferences and custom provider keys are also stored in localStorage (`void_selected_provider`, `void_custom_keys`). On a shared browser, treat those settings as local credentials and remove them when finished.

## Provider selection is not automatic failover

When provider is `auto`, the server chooses the first configured provider in this order: **Mistral → Gemini → Groq → OpenRouter**. Custom keys override the corresponding environment key. With no configured key it selects Mistral to return a configuration error. Do not interpret this selection order as proof that a failed provider request automatically retries every other provider.

The server also defines `/api/refine` and `/api/export-notion`; those flows need separate integration testing. Generated text is a draft. Verify project facts and remove placeholders before adopting it as repository documentation or policy text.


## Source snapshot

- [server.ts](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/server.ts)
- [src/App.tsx](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/src/App.tsx)
