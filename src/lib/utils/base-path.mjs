export function resolveBasePath(value) {
  if (!value?.trim() || value.trim() === '/') return '/';
  const base = value.trim().replace(/\/$/, '');
  if (!/^\/(?:[\w.-]+\/)*[\w.-]+$/.test(base) || base.split('/').some(part => part === '.' || part === '..')) {
    throw new Error('BASE_PATH must be a safe root-relative path such as /dockit-astro.');
  }
  return base;
}

export function withBase(href, base = import.meta.env?.BASE_URL ?? '/') {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
  const prefix = resolveBasePath(base);
  if (prefix === '/' || href === prefix || href.startsWith(prefix + '/')) return href;
  return prefix + href;
}

export function rehypeBaseLinks({ base = '/' } = {}) {
  return function transform(tree) {
    function visit(node) {
      if (node.properties) {
        for (const attr of ['href', 'src']) {
          if (typeof node.properties[attr] === 'string') node.properties[attr] = withBase(node.properties[attr], base);
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
