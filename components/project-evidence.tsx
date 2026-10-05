import { projectEvidence } from '@/content/project-evidence';

export function ProjectEvidence({ slug, repository, commit }: { slug: string; repository: string | null; commit: string }) {
  const evidence = projectEvidence[slug];
  if (!evidence || !repository) return null;
  return <section className="evidence-summary wrap" aria-labelledby="evidence-summary-title">
    <h2 id="evidence-summary-title" className="eyebrow">{evidence.label}</h2>
    <dl className="evidence-metrics">{evidence.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
    <p className="evidence-payoff">{evidence.payoff}</p>
    <details className="evidence-scope"><summary>Measurement scope & source</summary><p>{evidence.scope}</p><div>{evidence.sources.map(source => <a key={source.path} href={`${repository}/blob/${commit}/${source.path}`}>{source.label} ↗</a>)}</div></details>
  </section>;
}
