---
title: "Maintain the Codex"
sidebar:
  order: 1
---

## Keep the docs honest

Write the behavior the code supports. Label proposed behavior as planning. Package dependencies show available libraries, not proof that a feature works.

## Updating a project

1. Record the repository, branch or commit and review date.
2. Inspect the relevant source and configuration.
3. Update overview, setup, architecture and troubleshooting together when behavior changes.
4. Verify every command and internal link touched by the update.
5. Run the hub’s build and inspect the rendered pages.

## Source policy

Keep source links close to claims. Do not copy fabricated test totals, coverage badges or deployment claims from generated READMEs. Publish variable names and safe placeholders, never tokens or private user data.

## Content locations

Project guides live in `src/content/docs/projects/`. Navigation lives in `src/config/sidebar.json`; header and footer links live in `src/config/menu.en.json`. Sitepins edits should preserve Markdown frontmatter.

## Hub development

Use the checked-in lockfile with its package manager. Run the declared `build` script to generate the site. This repository’s current dependency versions must be available in the chosen registry before a reproducible build is possible.


## Edit through Sitepins or Git

Preserve the Markdown frontmatter at the top of each page. Use `title` for the full, project-specific search/page title and `sidebar.label` for a concise navigation label. Keep `sidebar.order` numeric. Change a page’s filename only when you also update links and navigation that use its route.

New project pages belong under `src/content/docs/projects/<project>/`; the existing sidebar autogenerates those folders. A new top-level page needs an explicit navigation link. After saving an edit, review its Git diff so unintended deletions or changed source links are visible.

## Repeatable quality checks

The link checker requires **Python 3.9+** as well as the Node dependency toolchain. Run from the repository root:

```sh
npm run test:links
npm run build
npm run check:links
npm run check:structure
```

Or run the complete sequence in order:

```sh
npm run validate
```

`check:links` parses the generated HTML in `dist`. It fails on missing local destinations and missing HTML fragment IDs, including relative links. It checks local stylesheet/asset href destinations too. External URLs and non-web schemes are skipped; it does not call GitHub or verify external uptime. A missing/empty build fails rather than reporting a false clean result.

Run `validate` after edits so the checked build is current. Running only `check:links` against yesterday’s `dist` cannot validate today’s Markdown.

## Reviewing source changes

Use the [source review index](/source-review/) to find inspected revisions and affected guides. Keep the [validation record](/validation/) and [documentation status](/status/) aligned with the evidence. Site generation and link checks do not establish that an application’s live login, publishing, provider calls or native device behavior works.

## Static structure checks

`npm run check:structure` checks one main landmark and one main heading per generated page, duplicate IDs, a named main-navigation landmark, and a named menu button with a valid controlled element and expanded-state attribute. The validate command now includes this check after build/link validation.

These checks do not evaluate contrast, visual layout, focus order, live JavaScript interaction or screen-reader usability. Before release, verify the homepage, a long project guide and the known-issues dashboard on a narrow and wide screen. Use keyboard-only navigation to open/close menus, search, follow results and switch themes. Check the deployed site rather than treating a static build as an interactive acceptance pass.
