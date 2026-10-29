---
title: "Blueprint: recovery and export acceptance"
sidebar:
  order: 4
---

**Proposed acceptance criteria. These are future checks, not tests that have passed.**

## Minimum data contract

| Record | Proposed fields | Invariant |
| --- | --- | --- |
| Project | Stable ID, title, schema version | Renaming does not change identity |
| Document | Stable ID, project ID, parent ID, type, title, order, content, revision | Content belongs to one identified document |
| Note | Stable ID, project ID, title, body | Notes are preserved in project backup |
| Backup manifest | Schema version, creation time, project ID, included records | Import can validate compatibility before replacing data |

The exact rich-text representation and physical storage are undecided. Do not lock a JSON schema before choosing what formatting the editor must preserve.

## Release gate

| Scenario | Expected outcome |
| --- | --- |
| Rename a chapter | Same document ID and content remain |
| Switch chapters during save | Each chapter retains its own text |
| Close after confirmed save | Reopened content matches the acknowledged revision |
| Persistence write fails | Text stays visible; Save failed is explicit |
| Export then import backup | Titles, order, notes and manuscript content round-trip |
| Import malformed/newer backup | Existing project remains intact; useful explanation shown |
| Export manuscript | Documents appear in the intended order with readable headings |
| Export formatting sample | Supported emphasis and punctuation survive by declared rules |
| Restore older backup | User can identify what will be replaced before committing restore |

Use synthetic writing samples for initial testing. Include apostrophes, curly quotes, em dashes, bold/italic text, blank lines and long chapters. Test left-handed-friendly touch interaction if mobile is chosen: controls should not demand one particular grip.

## Milestones

1. **Persistence spike:** save/reopen one document and simulate a failed write.
2. **Manuscript loop:** add, rename and reorder documents without changing their IDs.
3. **Recovery loop:** export, validate and restore a backup in a clean environment.
4. **Writing pass:** use the app for a complete sample chapter, then export it.
5. **Scope review:** choose whether canon tools, AI or sync is next based on observed writing friction.

Before marking a milestone complete, record the app commit, platform, checks and any known loss of formatting. A blueprint checkbox is not a substitute for the actual result.

