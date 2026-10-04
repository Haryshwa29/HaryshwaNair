import type { Metadata } from 'next';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import './globals.css';
import './editorial.css';
import { Header, Footer } from '@/components/site-shell';
import { site } from '@/lib/site-config';
import { MotionLayer } from '@/components/motion-layer';
export const metadata: Metadata = {
  metadataBase: new URL(site.origin || 'http://localhost:3000'),
  title: { default: site.title, template: '%s | Haryshwa Nair' },
  description: site.description,
  robots: { index: site.indexable, follow: site.indexable },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><MotionLayer /><Header />{children}<Footer /></body></html>;
}
