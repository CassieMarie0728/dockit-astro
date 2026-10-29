import { loadEnv } from 'vite';
import { resolveSiteUrl } from './site-url.mjs';
import { resolveBasePath } from '../src/lib/utils/base-path.mjs';
const url = resolveSiteUrl(loadEnv('production', process.cwd(), 'SITE_URL').SITE_URL);
if (!url) {
  console.error('Release build requires SITE_URL. Set the actual public HTTPS origin in the build environment or .env.production.');
  process.exitCode = 1;
} else {
  const base = resolveBasePath(loadEnv('production', process.cwd(), 'BASE_PATH').BASE_PATH);
  console.log(`Canonical site configured: ${url}${base === "/" ? "" : base.slice(1) + "/"}`);
}
