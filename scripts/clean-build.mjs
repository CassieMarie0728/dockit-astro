import { rm } from 'node:fs/promises';
// Generated output only: resolve from this script, never from a caller-supplied path.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
