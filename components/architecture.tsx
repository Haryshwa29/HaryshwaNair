'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Play, Pause, RotateCcw, Database, ShieldCheck, GitBranch, Cpu, ScanLine, FileCheck2, Globe, Layers, Inbox } from 'lucide-react';
import { architectures } from '@/content/architectures';
const icons = { input: Inbox, process: Layers, database: Database, shield: ShieldCheck, branch: GitBranch, model: Cpu, scan: ScanLine, output: FileCheck2, external: Globe };
const subscribeMotion = (callback: () => void) => { const query = matchMedia('(prefers-reduced-motion: reduce)'); query.addEventListener('change', callback); return () => query.removeEventListener('change', callback); };
const subscribeReady = () => () => {};
export function Architecture({ variant = 'arbiter-ai', repository, commit }: { variant?: string; repository?: string | null; commit?: string }) {
  const diagram = architectures[variant];
  const [stage, setStage] = useState(0);
  const [node, setNode] = useState(0);
  const [playing, setPlaying] = useState(diagram?.animated ?? false);
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => matchMedia('(prefers-reduced-motion: reduce)').matches, () => true);
  const ready = useSyncExternalStore(subscribeReady, () => true, () => false);
  const root = useRef<HTMLElement>(null);
  const running = playing && !reduced && visible && ready;
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 }); if (root.current) observer.observe(root.current); return () => observer.disconnect(); }, []);
  useEffect(() => {
    if (!running || !diagram) return;
    const timer = setTimeout(() => { if (stage === diagram.stages.length - 1) setPlaying(false); else { setStage(stage + 1); setNode(0); } }, 3400);
    return () => clearTimeout(timer);
  }, [running, stage, diagram]);
  if (!diagram) return null;
  const selected = diagram.stages[stage].nodes[node];
  return <figure className="system-map" ref={root} data-running={running} aria-label={`${variant} architecture`}>
    <figcaption className="map-header"><div><p className="eyebrow">{diagram.animated ? 'Animated architecture' : 'Visual walkthrough'}</p><h2>{diagram.title}</h2></div><span className="map-mark" aria-hidden="true"><GitBranch size={29} strokeWidth={1} /></span></figcaption>
    <p className="map-intro">{diagram.note}</p>
    {ready && <div className="map-controls">{diagram.animated && !reduced && <button onClick={() => { if (stage === diagram.stages.length - 1) { setStage(0); setNode(0); } setPlaying(!running); }}>{running ? <Pause size={15} /> : <Play size={15} />}{running ? 'Pause walkthrough' : 'Play walkthrough'}</button>}<button onClick={() => { setStage(0); setNode(0); setPlaying(false); }}><RotateCcw size={15} />Reset</button><button disabled={stage === diagram.stages.length - 1} onClick={() => { setStage(stage + 1); setNode(0); setPlaying(false); }}>Next stage <ArrowRight size={15} /></button><span>{stage + 1} / {diagram.stages.length}{reduced ? ' · Reduced motion' : ''}</span></div>}
    <div className="map-layout"><div className="map-flow">{diagram.stages.map((item, i) => <div className="map-stage" data-current={stage === i} key={item.label}>
      {i > 0 && <div className="map-connector" aria-hidden="true"><span /><ArrowDown size={17} /></div>}<p className="map-stage-label">{item.label}</p><div className="map-nodes">{item.nodes.map((entry, j) => { const Icon = icons[entry.icon as keyof typeof icons] || Layers; return <button type="button" className="map-node" aria-pressed={stage === i && node === j} key={entry.title} onClick={() => { setStage(i); setNode(j); setPlaying(false); }}><Icon size={24} strokeWidth={1.3} aria-hidden="true" /><span><strong>{entry.title}</strong><small>{entry.subtitle}</small></span><span className="node-signal" aria-hidden="true" /></button>; })}</div>
    </div>)}</div><aside className="map-inspector"><p className="eyebrow">Inside this stage</p><div aria-live={running ? 'off' : 'polite'}><h3>{selected.title}</h3><p>{selected.detail}</p></div>{selected.path && repository && commit && <a href={`${repository}/blob/${commit}/${selected.path}`} className="map-source">Inspect this component <ArrowUpRight size={15} /><span>{selected.path}</span></a>}<div className="map-legend"><span><i /> Selected stage</span><p>Select any component to read its role.{diagram.animated ? ' Play follows the stages once; pause to explore.' : ''}</p></div></aside></div>
    <noscript><div className="map-static-notes">{diagram.stages.flatMap(s => s.nodes).map(n => <p key={n.title}><strong>{n.title}:</strong> {n.detail}</p>)}</div></noscript>
  </figure>;
}
