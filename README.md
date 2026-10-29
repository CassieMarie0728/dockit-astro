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

Runs checker fixture tests, builds the site, and checks local href destinations and heading fragments. External links are not fetched. The source review index and maintenance guide describe how to update evidence and Sitepins-edited pages.
