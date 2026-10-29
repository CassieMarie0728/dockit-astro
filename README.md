# The Chaos Codex

*All the projects. Where the fuck you can find them.*

Central documentation for Cassandra Crossno’s projects, built on the MIT-licensed DocKit Astro theme by Themefisher. Original license retained in LICENSE.

Content is in `src/content/docs/`; project navigation is in `src/config/sidebar.json`. Source-backed configuration guides and clearly labeled planning pages are tracked separately. See `/status/` for documentation gaps.

Install dependencies using the committed pnpm lockfile, then run `pnpm build`. Deployment configuration is inherited from the starter and requires environment-specific review.

## Validate documentation changes

Requires the project’s Node dependencies and Python 3.9+:

```sh
npm run validate
```

Runs checker fixture tests, builds the site, and checks local href destinations, heading fragments and basic HTML structure. External links are not fetched. The source review index and maintenance guide describe how to update evidence and Sitepins-edited pages.

## Release build

Use Node 24 (minimum 22.12) and the pinned pnpm 10.4.1. Set `SITE_URL` to the actual public HTTPS root origin in the host’s build environment or an uncommitted `.env.production`, then run `npm run build:release`. Local `npm run build` may omit the URL; it does not generate a canonical sitemap in that case. Netlify and the Cloudflare deploy script use the release gate. See the deployment guide before enabling a host build.
