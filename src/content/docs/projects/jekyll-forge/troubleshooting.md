---
title: "Troubleshooting local Forge"
sidebar:
  order: 9
---

## Find the failing layer

| Symptom | Source-backed distinction | Next check |
| --- | --- | --- |
| Vite UI opens, API fails | Vite proxies to Wrangler at 8787 | Confirm Wrangler is running on the expected port |
| Login is unavailable | OAuth needs app credentials and matching origin | Check local vars and callback setup without exposing secrets |
| Signed in but repository list unavailable | OAuth login is separate from repository token connection | Check GitHub connection status in Repo Picker |
| Repo seems absent | Picker loads pages and filters visible results | Check connection, fetch errors and the current search text |
| Save says wait for loading | Selection has not finished loading | Let the selected post load before saving |
| Saved draft has no GitHub commit | Save stores a Forge draft | Verify local draft first; publishing is separate |
| API returns 403 | Explicit foreign Origin is rejected | Compare request Origin with the app origin |
| API POST returns 415 | Worker requires JSON for POST | Check Content-Type |
| API returns 413 | Streamed body limit is 8 MB | Reduce the request; upload-specific limits may be lower |
| API returns 429 | Worker limiter | Respect Retry-After rather than looping requests |
| Scheduled post did not fire exactly on time | Cron runs every five minutes | Inspect the queue/state; verify any remote write before retrying |

## Keep local and remote databases separate

The scripts make the distinction explicit: `db:local` uses local D1 and `db:remote` targets remote D1. If local tables are missing, first confirm the local migration command and Wrangler state directory. Applying a remote migration does not repair a local database.

## When reporting a failed write

Capture the site, intended branch/path, operation (Save, immediate Publish or scheduled Publish), time and visible result. Check the target repository before retrying an ambiguous publish; a lost response is not proof that the remote write never occurred.

This guide is based on source and the repository setup notes. End-to-end OAuth and GitHub writes remain outside this documentation pass.


## Source snapshot

- [server/worker.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/worker.ts)
- [client/src/pages/RepoPicker.tsx](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/client/src/pages/RepoPicker.tsx)
- [client/src/pages/Editor.tsx](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/client/src/pages/Editor.tsx)
- [CLOUDFLARE_SETUP.md](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/CLOUDFLARE_SETUP.md)
