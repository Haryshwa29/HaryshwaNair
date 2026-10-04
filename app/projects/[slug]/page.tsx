import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '@/content/projects';
import { ProjectFlow } from '@/components/project-flow';
import { flows } from '@/content/flows';
import { Architecture } from '@/components/architecture';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site-config';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(p => p.slug === slug);
  return project ? pageMetadata(project.name, project.title, `/projects/${slug}`) : { title: 'Project not found' };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index]; const next = projects[(index + 1) % projects.length];
  return <main id="main"><div className="wrap case-hero"><Link href="/#work" className="back-link"><ArrowLeft size={16} aria-hidden="true" />Selected work</Link><p className="eyebrow">Chapter {project.number} / {project.category}</p><h1>{project.name}<span className="accent">.</span></h1><p className="case-deck">{project.title}</p><div className="case-meta"><div><span className="eyebrow">Status</span><p>{project.status}</p></div><div><span className="eyebrow">My role</span><p>{project.role}</p></div>{project.repository && <a className="text-link" href={project.repository}>View source on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>}{project.demo && <a className="text-link" href={project.demo}>View demo <ArrowUpRight size={17} aria-hidden="true" /></a>}</div></div>
    <section className="case-concept wrap"><p className="eyebrow">The idea</p><h2>{project.summary}</h2><p className="tech-line">{project.technologies.join(' / ')}</p></section>
    <section id="architecture" className="case-architecture wrap" aria-label="Project visual explanation"><Architecture variant={slug} repository={project.repository} commit={project.commit} /></section>
    <ProjectFlow slug={slug} />
    <div className="case-body wrap"><aside className="case-index"><p className="eyebrow">In this case study</p><nav aria-label="Case study sections"><a href="#architecture">Visual walkthrough</a>{flows[slug] && <a href="#execution-flow">Detailed flow diagram</a>}<a href="#problem">The starting point</a><a href="#contribution">My contribution</a>{project.implementation && <a href="#implementation">How it works</a>}{project.decision && <a href="#decision">A design decision</a>}{project.evidence.length > 0 && <a href="#evidence">The evidence</a>}{project.limitations.length > 0 && <a href="#limitations">Current boundaries</a>}</nav></aside><div className="case-prose"><section id="problem"><p className="eyebrow">The starting point</p><h2>Why this project?</h2><p>{project.problem}</p></section><section id="contribution"><p className="eyebrow">My contribution</p><h2>The work I brought to it.</h2><p>{project.contribution}</p></section>{project.implementation && <section id="implementation"><p className="eyebrow">How it works</p><h2>From input to output.</h2><p>{project.implementation}</p><ol className="pipeline">{project.steps.map(step => <li key={step}>{step}</li>)}</ol></section>}{project.decision && <section id="decision" className="decision"><p className="eyebrow">A design decision</p><h2>{project.decisionTitle}</h2><p>{project.decision}</p></section>}{project.repository && project.evidence.length > 0 && <section id="evidence"><p className="eyebrow">The evidence</p><h2>Look under the surface.</h2><p>These links point to the reviewed source revision, so the implementation behind this story stays inspectable.</p><div className="evidence-list">{project.evidence.map(item => <a key={item.path} href={`${project.repository}/blob/${project.commit}/${item.path}`}><div><h3>{item.label}</h3><p>{item.detail}</p><span className="source-path">{item.path}</span></div><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div></section>}{project.limitations.length > 0 && <section id="limitations"><p className="eyebrow">Current boundaries</p><h2>{project.status.startsWith('Planned') ? 'Still on the drawing board.' : 'Useful work. Honest limits.'}</h2><ul>{project.limitations.map(item => <li key={item}>{item}</li>)}</ul>{project.repository && <p className="review-date">Source reviewed October 3, 2026.</p>}</section>}</div></div>
    <div className="next-project wrap"><div><p className="eyebrow">Keep exploring / Chapter {next.number}</p><Link href={`/projects/${next.slug}`}>{next.name} <ArrowRight size={32} aria-hidden="true" /></Link></div><p>{next.title}</p></div><Contact />
  </main>;
}
