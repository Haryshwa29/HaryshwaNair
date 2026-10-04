import Link from 'next/link';
import { ProjectGallery } from '@/components/project-gallery';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site-config';
export const metadata = pageMetadata('The project collection', 'Explore Haryshwa’s security tools, team AI projects, web experiments, earlier work, and planned research.', '/work');
export default function WorkPage() { return <main id="main"><section className="collection wrap collection-page"><Link className="back-link" href="/">← Back to the introduction</Link><div className="collection-heading"><div><p className="eyebrow">A growing body of work</p><h1>The project <em>collection.</em></h1></div><p>Browse by discipline. Follow the source.<br />Explore what went into the decisions.</p></div><ProjectGallery /></section><Contact /></main>; }
