---
title: "Snippet Bubble Manager v2: Troubleshooting Snippet Bubbles"
description: "Snippet Bubble Manager v2 documentation \u2014 Troubleshooting Snippet Bubbles."
sidebar:
  label: "Troubleshooting Snippet Bubbles"
  order: 13
---

| Symptom | Check | Next step |
| --- | --- | --- |
| Floating bubble unavailable in browser/Expo Go | Native module only loads on Android | Install the Android build containing the module |
| Permission granted but bubble still disabled | Permission request returns before enabling | Return to Settings and enable again |
| Export says copied | Download/share path fell back to clipboard | Save pasted JSON into a durable file |
| Reimport loses grouping or IDs | Those fields are not in current Settings export | Treat export as content-only; retain original device data |
| Import says Nothing Imported | Required title/code or root shape invalid | Check a small JSON sample first |
| Changed code creates an extra entry | Duplicate match includes code text | Compare the exact title, language and code |
| Replace Matches loses an item | Mixed-batch index defect | Read the known issue; recover content from your pre-import export |
| Cloud sync disabled | Account unavailable or sync already running | Check sign-in and current sync state |
| AI reports rate limit | Quota reserved before provider invocation | Read reset time; avoid repeated immediate retries |

## Before reporting a data issue

Export the current content, preserve the original import file, and record the app commit/build and duplicate strategy. Use a synthetic sample in a bug report rather than private snippets. See [the validation record](/validation/) for what was actually tested here.


## Source snapshot

- [app/(tabs)/settings.tsx](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/app/(tabs)/settings.tsx)
- [lib/snippet-import.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/lib/snippet-import.ts)
- [server/routers.ts](https://github.com/CassieMarie0728/snippet-bubble-manager-v2/blob/51c0e8047bc5a8c3b574ab6bbd328e4e4b252bd9/server/routers.ts)
