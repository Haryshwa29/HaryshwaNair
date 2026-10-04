import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, CLOUDFLARE_EXPORT: 'true' },
});
if (result.status !== 0) process.exit(result.status ?? 1);

const indexable = Boolean(process.env.SITE_URL && process.env.SITE_INDEXABLE === 'true');
writeFileSync('out/_headers', [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  '  X-Frame-Options: DENY',
  '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
  ...(indexable ? [] : ['  X-Robots-Tag: noindex, nofollow']),
  '',
].join('\n'));
