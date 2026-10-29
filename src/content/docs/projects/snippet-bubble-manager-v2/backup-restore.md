---
title: "Tutorial: export and import snippets"
sidebar:
  order: 10
---

**Source-guided UI steps; parser/planner checks were run with synthetic data. No device or browser round trip was performed.**

## 1. Export before importing

Open Settings and use the JSON export action. Web normally downloads a file; native builds write a temporary file and open the sharing panel. If export falls back to the clipboard, paste the JSON into a file and save it somewhere durable. A clipboard toast is not a saved backup file.

## 2. Know what this export contains

The exported object has `version: 1`, `exportedAt` and a `snippets` array. Each entry includes title, code, language, description, tags, favorite/pinned flags, and creation/update times.

The current export omits stable snippet IDs, category IDs, collection memberships, copy counts and last-copied timestamps. It also does not export app settings. Treat it as a portable content export, not a complete device-state backup. Reimport can generate new IDs and refresh update timestamps.

## 3. Choose a small import first

Settings opens a file picker. When file size is provided by the picker, it rejects sizes over 10 MB. The parser accepts either a snippet array or an object with a `snippets` array and processes at most 5,000 records. Each snippet needs a nonempty title and code; absent language defaults to `Plaintext`.

## 4. Choose duplicate handling deliberately

| Choice | Intended behavior | Current guidance |
| --- | --- | --- |
| Skip Duplicates | Leave a matching existing snippet alone | Preferred first import choice |
| Keep Both | Add an Imported Copy | Useful when you need to compare versions |
| Replace Matches | Replace a match while retaining existing identity | Avoid mixed new-and-duplicate batches until the documented index defect is fixed |

A duplicate fingerprint is the exact title, language and code combined. Changed code is not considered a match just because the title is unchanged. See [known import issue](/projects/snippet-bubble-manager-v2/known-import-issue/).

## 5. Verify what was retained

Read the added/replaced/copied/skipped counts and invalid-record count. Check a snippet with multiline code, tags and punctuation. Reopen the app and confirm local persistence. Keep the pre-import export until the restored content is verified.

Cloud sync is a separate workflow; this tutorial does not establish that another device has received the imported library.


## Source snapshot

- [app/(tabs)/settings.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/app/(tabs)/settings.tsx)
- [lib/snippet-import.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-import.ts)
