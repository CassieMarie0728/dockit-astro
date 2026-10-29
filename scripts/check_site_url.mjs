import { loadEnv } from 'vite';
import { resolveSiteUrl } from './site-url.mjs';
const url = resolveSiteUrl(loadEnv('production', process.cwd(), 'SITE_URL').SITE_URL);
if (!url) {
  console.error('Release build requires SITE_URL. Set the actual public HTTPS origin in the build environment or .env.production.');
  process.exitCode = 1;
} else {
  console.log(`Canonical site configured: ${url}`);
}
