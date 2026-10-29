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

