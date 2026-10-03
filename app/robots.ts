import type { MetadataRoute } from 'next';
import { site } from '@/lib/site-config';
export default function robots(): MetadataRoute.Robots { return { rules: site.indexable ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' }, ...(site.indexable && site.origin ? { sitemap: `${site.origin}/sitemap.xml` } : {}) }; }
