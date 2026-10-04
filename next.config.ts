import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(process.env.CLOUDFLARE_EXPORT === 'true' ? { output: 'export' as const, images: { unoptimized: true } } : {
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...((process.env.SITE_URL && (process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL_ENV && process.env.SITE_INDEXABLE === 'true'))) ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }])
    ] }];
  }
  })
};
export default nextConfig;
