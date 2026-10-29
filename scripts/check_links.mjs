import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
const config = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'BASE_PATH');
const result = spawnSync('python3', [fileURLToPath(new URL('./check_links.py', import.meta.url))], {
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: config.BASE_PATH || '' },
});
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
