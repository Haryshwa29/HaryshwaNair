'use client';
import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight, Search, Plus } from 'lucide-react';
import { work, type WorkCategory } from '@/content/work';
const subscribe = () => () => {};
const categories = ['All work', 'Security', 'Applied AI'] as const;
export function ProjectGallery() {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const [category, setCategory] = useState<WorkCategory | 'All work'>('All work');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const filtered = work.filter(p => (category === 'All work' || p.category === category) && `${p.name} ${p.summary} ${p.stack}`.toLowerCase().includes(query.toLowerCase().trim()));
  const pages = Math.ceil(filtered.length / 6);
  const shown = ready ? filtered.slice(page * 6, page * 6 + 6) : filtered;
  return <div className="project-gallery">
    {ready && <div className="gallery-tools"><div className="filter-list" role="group" aria-label="Filter projects">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => { setCategory(c); setPage(0); }}>{c}<span>{c === 'All work' ? work.length : work.filter(p => p.category === c).length}</span></button>)}</div><label className="project-search"><Search size={16} aria-hidden="true" /><input aria-label="Search projects" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} placeholder="Find a project" type="search" /></label></div>}
    <div className="work-grid" id="project-results">{shown.map(p => <article className={`work-card ${p.category === 'Research' ? 'research-card' : ''}`} key={p.id} data-category={p.category}>
      <div className={`work-art art-${p.id}`} aria-hidden="true"><span className="art-coordinate">{p.category}</span><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-cross" /><span className="art-letter">{p.symbol}<i>.</i></span><span className="art-caption">{p.stack.split(' · ')[0]}</span></div>
      <div className="work-card-content"><p className="work-status">{p.status}</p><h3>{p.caseStudy ? <Link className="card-primary-link" href={p.caseStudy}>{p.name}<ArrowUpRight size={21} aria-hidden="true" /></Link> : p.name}</h3><p className="work-summary">{p.summary}</p><div className="work-card-bottom">{p.caseStudy ? <Link className="case-link" href={p.caseStudy}>Explore the case study <ArrowUpRight size={15} aria-hidden="true" /></Link> : <details className="work-details"><summary>Project notes <Plus size={15} aria-hidden="true" /></summary><p>{p.detail}</p><span className="tech-line">{p.stack}</span></details>}{p.repository && <a className="source-link" href={p.repository} aria-label={`${p.name} source on GitHub`}>Source <ArrowUpRight size={13} aria-hidden="true" /></a>}</div></div>
    </article>)}</div>
    {ready && <div className="gallery-pagination"><p role="status" aria-live="polite">{filtered.length ? `${page * 6 + 1}–${Math.min(page * 6 + 6, filtered.length)} of ${filtered.length} projects` : 'No matching projects. Try another name or category.'}</p>{pages > 1 && <div><button aria-label="Previous projects" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ArrowLeft size={18} /></button><span>{page + 1} / {pages}</span><button aria-label="Next projects" disabled={page === pages - 1} onClick={() => setPage(p => p + 1)}><ArrowRight size={18} /></button></div>}</div>}
    <noscript><p className="nojs-note">All projects are shown. Open project notes for details, or follow a case study.</p></noscript>
  </div>;
}
