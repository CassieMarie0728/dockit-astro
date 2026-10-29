---
title: "Tutorial: keep and export a VOID draft"
sidebar:
  order: 10
---

**Source-guided browser workflow; downloads and print dialogs were not exercised here.**

## 1. Keep an editable copy

After generation, review the active draft and make your edits. Draft switching changes which version the editor displays. The app keeps browser-local draft state, but an exported Markdown file gives you a separate editable copy.

## 2. Fill placeholders and download Markdown

Check the detected placeholder replacements, then use the Markdown download action. The handler takes `displayedMarkdown`—the current text with replacements applied—and creates a `.md` download named from the document type. Open the downloaded file and verify its contents.

Copy uses that displayed text too. Neither a copy operation nor localStorage is proof of a file stored outside the browser.

## 3. Understand the “DOCX” option

The current handler reads rendered `.markdown-body` HTML, wraps it in an HTML document, assigns MIME type `application/msword` and downloads it with a `.docx` extension. It does **not** construct a standard Office Open XML ZIP package.

Word processors may warn, refuse the file or interpret it differently. Keep the Markdown source and verify the result in your intended editor. Do not advertise this output as a validated native DOCX export until the generator is corrected and tested.

## 4. Save a PDF through printing

The PDF action creates a temporary print container from the rendered document and calls `window.print()`. Choose **Save as PDF** in the browser/system dialog. If an embedded editor blocks printing, the app suggests opening the standalone app in a new tab.

Review the print preview for clipped tables, headings and page breaks, then verify the saved file. The action opens a print workflow; it does not return a server-generated PDF.

## Notion endpoint boundary

The backend defines `/api/export-notion`, accepting an integration token, parent page ID, title and Markdown. Its parser returns at most 95 blocks. This is not a guaranteed full-document transfer for longer material. No Notion page was created in this pass, and this guide does not assume a connected export button exists in the inspected main editor.


## Source snapshot

- [src/App.tsx](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/src/App.tsx)
- [server.ts](https://github.com/CassieMarie0728/void-repo-docs/blob/e5b347312236bb2c6ab78233b01ea94c453a5f36/server.ts)
