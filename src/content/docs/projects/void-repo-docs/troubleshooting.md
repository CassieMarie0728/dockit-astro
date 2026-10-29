---
title: "VOID Repo Docs: Troubleshooting VOID output and providers"
description: "VOID Repo Docs documentation \u2014 Troubleshooting VOID output and providers."
sidebar:
  label: "Troubleshooting VOID output and providers"
  order: 12
---

| Symptom | Source-backed distinction | Next action |
| --- | --- | --- |
| Generation works but refinement fails | Refinement uses Gemini independently | Check Gemini configuration and returned error |
| Auto picks a different provider than expected | Selection order is Mistral, Gemini, Groq, OpenRouter | Select explicitly; do not assume cross-provider retry |
| A new generation would erase edits | Editor asks for overwrite confirmation | Export first, then decide whether to regenerate |
| Draft absent in another browser | Draft is localStorage | Open an exported Markdown copy; no cloud sync is established |
| DOCX extension triggers warnings | File contains HTML, not an OOXML package | Keep Markdown and verify/open through a compatible editor |
| PDF button shows a print dialog | PDF uses window.print | Select Save as PDF and inspect preview |
| Printing is blocked in an iframe | Browser/editor sandbox can block print | Open standalone app as the UI suggests |
| Notion export is incomplete | Parser caps output at 95 blocks | Compare full source and transferred content before treating it as complete |
| Placeholder remains in export | Replacement value missing or incomplete | Inspect displayed text and the exported file |

## Record the right evidence

Include the app commit, browser, target platform, provider name, document type and a synthetic example. Keep API keys, Notion integration tokens and private repository contents out of the report. See [exports](/projects/void-repo-docs/export-tutorial/) and [refinement](/projects/void-repo-docs/refine-tutorial/) for the exact boundaries.


## Source snapshot

- [src/App.tsx](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/src/App.tsx)
- [server.ts](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/server.ts)
