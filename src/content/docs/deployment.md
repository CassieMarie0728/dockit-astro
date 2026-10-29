---
title: Build and release the Chaos Codex
description: Configure the public URL, select a supported runtime and verify a deployed hub.
sidebar:
  order: 3
---

## Current release boundary

The repo contains hosting configuration, but its inherited GitHub homepage points to the original theme, not a verified Chaos Codex deployment. GitHub Pages was disabled when inspected. No actual preview URL was established in this session, and the connected browser was unavailable. These observations do not prove the site is unpublished elsewhere.

## 1. Use the supported toolchain

The installed Astro 7.0.3 package requires Node 22.12 or newer. This repository now recommends Node 24 through `.nvmrc`, declares the minimum in `package.json`, and pins pnpm 10.4.1. Netlify’s old Node 20 pin has been replaced with Node 24.

Install from the repository root with the committed pnpm lockfile:

```sh
corepack pnpm install --frozen-lockfile
```

The documentation checks also require Python 3.9+. A plain site build only requires the Node build toolchain.

## 2. Set the canonical deployment origin

Configure `SITE_URL` in the host’s build environment, or copy `.env.example` to `.env.production` locally and set the value there. Use the actual public HTTPS origin where the site will be served, without credentials, query, fragment or a subpath. Keep the local environment file out of Git.

Do not use the inherited theme homepage or a made-up domain. Current navigation uses root-relative links, so this version is not configured for a GitHub Pages project subdirectory.

`SITE_URL` is public build configuration, not a credential. Its parser validates syntax and hosting shape; it does not prove domain ownership, DNS, TLS or live reachability.

## 3. Build with the right gate

| Command | Purpose |
| --- | --- |
| `npm run validate` | Fixture tests, local static build, links and structure |
| `npm run check:release` | Require an explicit syntactically valid canonical HTTPS origin |
| `npm run build:release` | Release check followed by Astro build |
| `npm run preview` | Serve a built site locally where local hosting is available |

Every build first clears the generated `dist` directory so a previous domain’s sitemap or a deleted page cannot survive into the new output. A local build may omit SITE_URL; sitemap generation will then be skipped. A release build refuses to proceed without it. With SITE_URL set, Astro emits canonical metadata and the sitemap integration can generate its files.

## 4. Hosting configuration

**Netlify:** the checked-in config uses Node 24, pnpm 10.4.1, `corepack pnpm build:release`, and publishes `dist`. Set SITE_URL in the hosting build variables before enabling or merging this release configuration.

**Cloudflare Workers static assets:** `wrangler.jsonc` serves `dist`. `npm run deploy:cf-workers` now runs the release build before the existing deploy command. This operation publishes remotely; it was not run in the documentation pass. Confirm the selected Cloudflare account and intended Worker before using it.

**Sitepins:** content editing and hosting are separate concerns. Confirm which hosting service consumes the connected repo and which branch it deploys. A successful content save or merged PR is not proof that the new site is live.

## 5. Verify the deployed build

Record the deployed commit and actual URL. Then check:

- Home, one long project page, Find a Task and Known Issues load directly.
- A nonexistent path returns the intended 404 page.
- Search opens, finds a project-specific title, and its result navigates correctly.
- Mobile menus open, Escape closes them, and keyboard focus stays usable.
- Theme switching works on a narrow and wide viewport.
- Canonical URLs and sitemap locations use the intended origin.
- Downloaded assets load without console/network errors.

The browser checks above are pending. Do not mark them passed from static HTML or a successful deployment log alone.
