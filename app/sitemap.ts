import type { MetadataRoute } from 'next';
import { site } from '@/lib/site-config';
import { projects } from '@/content/projects';
export default function sitemap(): MetadataRoute.Sitemap { if (!site.origin || !site.indexable) return []; return ['', '/privacy', ...projects.map(p => `/projects/${p.slug}`)].map(path => ({ url: `${site.origin}${path}`, lastModified: '2026-10-03', changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })); }
