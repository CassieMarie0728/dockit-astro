---
title: "Jekyll Forge: Tutorial: connect a repo and save a draft"
description: "Jekyll Forge documentation \u2014 Tutorial: connect a repo and save a draft."
sidebar:
  label: "Tutorial: connect a repo and save a draft"
  order: 8
---

**Source-guided acceptance walkthrough.** Real sign-in and repository permissions are required. Use a disposable test repository for the first write test.

## 1. Sign in, then connect repository access

Open `/repos`. If unauthenticated, Repo Picker redirects to login. GitHub OAuth sign-in and repository access are separate: the picker checks `github.status` and offers the token connection flow. Follow the app’s connection UI with access limited to your intended repository; do not paste tokens into an issue or the docs.

After connection, the picker fetches repository pages and filters by name or description. Select your test repository. The handler checks for Jekyll, stores a site with default/selected branch information, sets the active workspace and opens `/dashboard/<siteId>`.

## 2. Open the editor

The new-post entry is `/editor/<siteId>`. Existing repository paths open through `/editor/<siteId>/<postPath>`. If editing an existing post, wait for loading to finish; Save explicitly refuses to run while the selected file has not finished loading.

## 3. Save in Forge

Write a small, unmistakable test draft and choose **Save**. For a new post, the handler creates a `_drafts/` path under the configured site root, with a date/title/unique-suffix filename. The request uses `posts.upsert`, which stores the draft in Forge’s data layer.

**Save is not Publish.** A draft path recorded in Forge does not prove a GitHub commit exists. Reopen the draft and confirm that the text you saved is present. Record whether it is a draft, published or modified post.

## 4. Review the publish boundary

Publish first checks that a post has been saved or selected, creates a `before-publish` snapshot, then opens the publish interface. Stop there while validating a first draft. Any actual publishing acceptance test must specify the target repository, branch and path, then verify the resulting GitHub change.

## 5. Check the result independently

Confirm the Forge draft survives reopening. If you intentionally published to the disposable repository, confirm the remote file and commit independently. Those are different assertions and should be recorded separately.


## Source snapshot

- [client/src/pages/RepoPicker.tsx](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/client/src/pages/RepoPicker.tsx)
- [client/src/pages/Editor.tsx](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/client/src/pages/Editor.tsx)
- [server/routers/posts.ts](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/server/routers/posts.ts)
- [CLOUDFLARE_SETUP.md](https://github.com/CassieMarie0728/jekyll-forge/blob/99cc09f74b2f7a419afe56acb53050d71fb229ec/CLOUDFLARE_SETUP.md)
