---
title: "Tutorial: refine without losing your original"
sidebar:
  order: 11
---

**Source-guided workflow; no live model request was made.**

## Save the current draft first

Download the Markdown before an AI rewrite. The editor’s local history and browser draft are useful conveniences, but a separately saved copy lets you compare or restore the exact text.

## Select a narrow refinement

The editor offers preset transformations and custom instructions. Ask for a bounded change such as repairing headings or shortening a specific section. Compare the result for changes to facts, missing clauses and unresolved placeholders before keeping it.

## Refinement uses Gemini

Generation can select Mistral, Gemini, Groq or OpenRouter. The inspected `/api/refine` handler is different: it uses a custom Gemini key if present, otherwise the server’s Gemini client, and calls the configured Gemini model in that handler. It does not route through the main generation provider selector.

Successful Mistral generation therefore does not establish that refinement is configured. A missing Gemini key can block refinement even when another provider’s generation works. Model availability and account limits still need a live acceptance check.

## If refinement fails

Check that Markdown and an instruction were sent. The handler returns 400 for either missing input and 500 when the model call fails. Keep the downloaded original; do not keep clicking rewrite without reading the returned error.

## Acceptance check for later testing

Use a synthetic draft containing a heading, table, link and deliberate placeholder. Confirm the returned text is raw Markdown, the intended edit occurred, facts were retained, and the original export can restore the prior text. Record provider configuration by name only, never the key.


## Source snapshot

- [src/App.tsx](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/src/App.tsx)
- [server.ts](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/server.ts)
