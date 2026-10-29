# The Chaos Codex

*All the projects. Where the fuck you can find them.*

Central documentation for Cassandra Crossno’s projects, built on the MIT-licensed DocKit Astro theme by Themefisher. Original license retained in LICENSE.

## GitHub Pages hosting

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys pushes to main. First choose **Settings → Pages → Source → GitHub Actions**. Expected URL after successful deployment: https://cassiemarie0728.github.io/dockit-astro/.

No Sitepins or Vercel account is required to build or host this GitHub Pages setup. Sitepins is an optional content editor.

## Development

Use Node 24 (minimum 22.12), the pinned pnpm 10.4.1 and the committed pnpm lockfile. Install with `corepack pnpm install --frozen-lockfile`. The docs checker additionally requires Python 3.9+.

```sh
npm run validate
```

Runs checker and URL/base-path fixture tests, builds the site, and checks local href destinations, heading fragments and basic structure. External URLs are not fetched.

## URL configuration

SITE_URL is the HTTPS host origin. BASE_PATH is an optional subpath. The workflow uses `https://cassiemarie0728.github.io` and `/dockit-astro` respectively. For root-hosted custom domains, leave BASE_PATH blank. A release build requires SITE_URL; local builds may omit it. Build output is cleaned before each run.

Content is in `src/content/docs/`; project navigation is in `src/config/sidebar.json`. See the deployment, source-review and maintenance guides for evidence and editing instructions.
