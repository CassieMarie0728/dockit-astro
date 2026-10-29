---
title: Deploy the Chaos Codex to GitHub Pages
description: Host the existing Astro/Starlight hub from GitHub without a Sitepins or Vercel dependency.
sidebar:
  order: 3
---

## The setup

The Chaos Codex is a static Astro/Starlight site in your GitHub repository. Sitepins can edit the content, but the site does not depend on that editor to build or run. We are keeping the customized DocKit template and deploying it through GitHub Actions.

Expected address after a successful deployment:

**https://cassiemarie0728.github.io/dockit-astro/**

That is the planned Pages address, not a claim that it is already live.

## One-time GitHub setting

Open the repository’s **Settings → Pages → Build and deployment** and select **GitHub Actions** as Source. The connected GitHub tools cannot change this administrative setting here.

Merge the setup PR. The **Deploy Chaos Codex to GitHub Pages** workflow runs on pushes to main. If needed, open **Actions**, choose that workflow and use **Run workflow**. Once the build and deploy jobs succeed, the deployment environment links to the published URL.

Do not select branch-based Jekyll publishing for the raw source: this project needs an Astro build.

## What the workflow does

1. Checks out the repository.
2. Uses Node 24 and pnpm 10.4.1.
3. Checks release configuration, runs fixture tests, builds Astro and validates links/structure.
4. Uploads the static artifact using the official Astro action.
5. Deploys that artifact with the GitHub Pages deploy action.

The workflow uses the built-in GitHub token permissions for Pages; no Vercel token or Sitepins account is needed. Original theme attribution/license remains in the repo.

## Why two URL settings exist

| Setting | Value for this repo | Purpose |
| --- | --- | --- |
| SITE_URL | `https://cassiemarie0728.github.io` | Canonical host origin |
| BASE_PATH | `/dockit-astro` | Project-site path prefix |

Astro, the Markdown link transform and custom navigation helpers apply the path prefix. The generated site’s internal hrefs are checked against it so a root-only link cannot accidentally escape to the account homepage. The search component uses Astro’s base URL for its Pagefind assets and results.

The workflow supplies these values. You do not need to create repository secrets for public URL settings.

## Local builds and other hosts

Use the committed pnpm lockfile. Node must be at least 22.12; `.nvmrc` recommends 24. The full docs checks also need Python 3.9+.

```sh
corepack pnpm install --frozen-lockfile
npm run validate
```

Local validation defaults to the host root. To test the Pages layout locally, set SITE_URL and BASE_PATH in the build environment or an uncommitted `.env.production` before running validation. Every build cleans `dist` first, preventing an old sitemap from surviving into a different deployment.

For a later custom domain at its root, use that origin as SITE_URL and leave BASE_PATH blank. Update the hosting/domain settings separately; changing a build variable alone does not configure DNS or domain ownership. Root-host Netlify/Cloudflare configurations remain optional alternatives, not requirements for Pages.

## Verify after deployment

Check the homepage, a long guide, Find a Task, Known Issues and a nonexistent URL. Open search and follow a result. Check theme switching, menus, keyboard focus and layout on a phone-sized viewport. Confirm canonical and sitemap URLs include `/dockit-astro/` for this project-site deployment.

Local builds and static checks are recorded in the validation page. A successful local build does not prove the GitHub workflow or interactive browser checks have passed.

## Keep working after the trial

Edit Markdown through GitHub, a local editor or any Git-based editor you prefer. Commit to a branch, review the changes and merge. Pushes to main rebuild the hosted site. The source, styling and docs stay in your repository; the Sitepins trial is not part of the runtime.

Reference: [Astro’s GitHub Pages deployment guide](https://docs.astro.build/en/guides/deploy/github/).
