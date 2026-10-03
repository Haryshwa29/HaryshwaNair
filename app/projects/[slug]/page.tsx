import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '@/content/projects';
import { Architecture } from '@/components/architecture';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site-config';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return { title: 'Project not found' };
  return pageMetadata(project.name, project.title, `/projects/${slug}`);
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index]; const next = projects[(index + 1) % projects.length];
  return <main id="main"><div className="wrap case-hero"><Link href="/#work" className="back-link"><ArrowLeft size={16} aria-hidden="true" />Selected work</Link><p className="eyebrow">Chapter {project.number} / {project.category}</p><h1>{project.name}<span className="accent">.</span></h1><p className="case-deck">{project.title}</p><div className="case-meta"><div><span className="eyebrow">Status</span><p>{project.status}</p></div><div><span className="eyebrow">My role</span><p>{project.role}</p></div><a className="text-link" href={project.repository}>View source on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>{project.demo && <a className="text-link" href={project.demo}>View demo <ArrowUpRight size={17} aria-hidden="true" /></a>}</div></div>
    <div className="case-feature wrap"><div><p className="eyebrow">The idea</p><h2>{project.summary}</h2><p className="tech-line">{project.technologies.join(' / ')}</p></div><Architecture variant={slug} /></div>
    <div className="case-body wrap"><aside className="case-index"><p className="eyebrow">In this case study</p><nav aria-label="Case study sections"><a href="#problem">01 / The problem</a><a href="#contribution">02 / My contribution</a><a href="#implementation">03 / How it works</a><a href="#decision">04 / A design decision</a><a href="#evidence">05 / The evidence</a><a href="#limitations">06 / Current boundaries</a></nav></aside><div className="case-prose"><section id="problem"><p className="eyebrow">01 / The problem</p><h2>A practical starting point.</h2><p>{project.problem}</p></section><section id="contribution"><p className="eyebrow">02 / My contribution</p><h2>The work I brought to it.</h2><p>{project.contribution}</p></section><section id="implementation"><p className="eyebrow">03 / How it works</p><h2>From input to insight.</h2><p>{project.implementation}</p><ol className="pipeline">{project.steps.map(step => <li key={step}>{step}</li>)}</ol></section><section id="decision" className="decision"><p className="eyebrow">04 / A design decision</p><h2>{project.decisionTitle}</h2><p>{project.decision}</p></section><section id="evidence"><p className="eyebrow">05 / The evidence</p><h2>Look under the surface.</h2><p>These links point to the reviewed source revision, so the implementation behind this story stays inspectable.</p><div className="evidence-list">{project.evidence.map(item => <a key={item.path} href={`${project.repository}/blob/${project.commit}/${item.path}`}><div><h3>{item.label}</h3><p>{item.detail}</p><span className="source-path">{item.path}</span></div><ArrowUpRight size={20} aria-hidden="true" /></a>)}</div></section><section id="limitations"><p className="eyebrow">06 / Current boundaries</p><h2>Useful work. Honest limits.</h2><ul>{project.limitations.map(item => <li key={item}>{item}</li>)}</ul><p className="review-date">Source reviewed October 3, 2026. Security testing is intended for authorized environments.</p></section></div></div>
    <div className="next-project wrap"><div><p className="eyebrow">Keep exploring / Chapter {next.number}</p><Link href={`/projects/${next.slug}`}>{next.name} <ArrowRight size={32} aria-hidden="true" /></Link></div><p>{next.title}</p></div><Contact />
  </main>;
}
