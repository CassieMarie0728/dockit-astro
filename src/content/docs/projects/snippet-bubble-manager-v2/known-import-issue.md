---
title: "Known issue: mixed Replace Matches imports"
sidebar:
  order: 12
---

**Reproduced October 29, 2026 using synthetic in-memory snippets. No user library was touched.**

## Trigger

An import uses Replace Matches and adds a new snippet before processing a duplicate of an existing snippet.

## Minimal case

| Step | In-memory library |
| --- | --- |
| Existing library | A, B |
| Import first record: new C | C, A, B |
| Import second record: duplicate A, using replace | A, A, B; C has been overwritten |

The planner builds a fingerprint-to-index map from the original array. It inserts new entries at the front with `unshift` but does not update stored indexes for existing entries. Replacement can therefore write to a position now occupied by another snippet. Result counters can still report an import and a replacement even when the new item was lost.

## Until a code fix is merged

Keep a pre-import content export. Prefer Skip Duplicates or Keep Both when a batch mixes new and matching snippets. Do not treat a successful import message as verification that every expected item remains. Inspect the content afterward.

The bug remains in the inspected application commit; this documentation change does not repair it.

## Fix acceptance criteria

After correcting index tracking or replacement lookup, cover new-before-duplicate, several new records before replacement, multiple duplicates and an existing library with more than one entry. Confirm the new snippet survives, the correct existing record is replaced, IDs are preserved for replacements, and counts match retained content.

[Return to the import tutorial](/projects/snippet-bubble-manager-v2/backup-restore/).


## Source snapshot

- [lib/snippet-import.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-import.ts)
