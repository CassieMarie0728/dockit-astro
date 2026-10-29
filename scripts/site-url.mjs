/** Canonical origin for the host origin; no fallback production domain. */
export function resolveSiteUrl(value) {
  if (!value?.trim()) return undefined;
  let url;
  try { url = new URL(value.trim()); }
  catch { throw new Error('SITE_URL must be a complete HTTPS origin.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('SITE_URL must use HTTPS without credentials, query or fragment.');
  }
  if (url.pathname !== '/') {
    throw new Error('SITE_URL must be the host origin; configure a deployment subpath with BASE_PATH.');
  }
  if (url.hostname === 'localhost' || url.hostname.endsWith('.localhost')) {
    throw new Error('SITE_URL must identify the public deployment, not localhost.');
  }
  return url.origin + '/';
}
