---
title: "Blueprint: a draft you can trust"
sidebar:
  order: 3
---

**Proposed design, awaiting product decisions. None of these features is established as implemented.**

## First job

A writer can create a book, draft a chapter, close the app, reopen the same text and export it without losing work. That is the first milestone; AI, collaboration and elaborate dashboards can wait until the save/recovery loop earns trust.

## Proposed navigation

| Area | First-version job | Later candidate |
| --- | --- | --- |
| Library | Create and reopen a writing project | Series collections |
| Manuscript | Chapters and scenes in a clear order | Alternate scene structures |
| Editor | Draft, visible save state, undo/redo | Advanced revision tools |
| Story notes | Plain notes linked to the project | Structured canon and timelines |
| Backup/export | Recoverable project backup and readable export | Publication formatting |

For Aethrakar, the structure should accommodate books, parts, chapters and scenes without forcing every book to use every level. This is an example requirement, not imported manuscript content.

## Save-state contract

Show **Unsaved**, **Saving**, **Saved**, or **Save failed**. Only show Saved after the persistence layer acknowledges the current revision. A failed write must keep the editor text available and offer a retry or emergency export. Changing documents while a write is in flight must not save the old document’s text into the newly selected one.

## Proposed first release scope

- Project and document identifiers that remain stable when titles change.
- Ordered manuscript documents and a focused editor.
- Explicit save feedback and recovery after restart.
- Project backup with round-trip restore.
- Readable Markdown/text export with headings in manuscript order.

## Decisions before choosing a stack

Choose the first platform, offline expectations, formatting model and storage ownership. Then select the editor/storage technology that satisfies those requirements. A proposed local-first approach is a candidate, not an approved architecture; sync and authentication remain open.

## Not release evidence

Mockups, generated code, a working word counter and a pretty editor are useful progress. They do not demonstrate reliable saving or recoverable exports. Use the [acceptance checklist](/projects/new-badass-novel-writing-app/acceptance/) as the gate.

