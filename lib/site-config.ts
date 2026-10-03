import type { Metadata } from 'next';
const configured = process.env.SITE_URL;
if (configured && (new URL(configured).protocol !== 'https:' || new URL(configured).pathname !== '/')) {
  throw new Error('SITE_URL must be an HTTPS root origin without a path.');
}
export const site = {
  origin: configured ? new URL(configured).origin : null,
  indexable: Boolean(configured && (process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL_ENV && process.env.SITE_INDEXABLE === 'true'))),
  title: 'Haryshwa Nair | Cybersecurity & Security Automation',
  description: 'Cybersecurity graduate and practical security tool builder. Explore Haryshwa Nair’s work in alert triage, security automation, and applied AI.',
};
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: site.origin ? { canonical: `${site.origin}${path}` } : undefined,
    openGraph: { title, description, type: 'website', siteName: 'Haryshwa Nair', ...(site.origin ? { url: `${site.origin}${path}` } : {}), images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Haryshwa Nair — Security, built with intent.' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image.png'] },
  };
}
