const nodes = [
  { x: 24, y: 120, title: 'Event', sub: 'Host · signal', stage: 0 },
  { x: 214, y: 120, title: 'Guardrails', sub: 'Rules in code', stage: 1 },
  { x: 404, y: 30, title: 'Context', sub: 'History · facts', stage: 2 },
  { x: 404, y: 210, title: 'Local model', sub: 'Ollama', stage: 2 },
  { x: 594, y: 120, title: 'Audit', sub: 'Verdict · rationale', stage: 3 },
];
export function TriageNetwork({ step, choice, running }: { step: number; choice: number; running: boolean }) {
  const model = choice === 1;
  return <div className="triage-network" data-running={running}>
    <svg viewBox="0 0 770 320" role="img" aria-label={`Arbiter architecture: event to guardrails, ${model ? 'scoped context and local model, then validation and audit' : 'model bypassed, verdict recorded'}`}>
      <defs><pattern id="triage-grid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#34444c" /></pattern></defs>
      <rect width="770" height="320" fill="url(#triage-grid)" />
      <g className="network-wires"><path d="M174 155 H214" className={step >= 1 ? 'lit' : ''} /><path d="M364 155 H380 V65 H404" className={model && step >= 2 ? 'lit' : ''}/><path d="M479 100 V210" className={model && step >= 2 ? 'lit' : ''}/><path d="M554 245 H575 V155 H594" className={model && step >= 3 ? 'lit' : ''}/><path d="M289 190 V290 H669 V190" className={!model && step >= 2 ? 'lit' : ''}/></g>
      {nodes.map(n => <g key={n.title} className={`network-node ${n.stage === step ? 'active' : ''} ${n.stage === 2 && !model ? 'bypassed' : ''}`}><rect x={n.x} y={n.y} width="150" height="70" rx="7"/><circle cx={n.x+133} cy={n.y+13} r="3"/><text x={n.x+15} y={n.y+30}>{n.title}</text><text className="network-sub" x={n.x+15} y={n.y+51}>{n.sub}</text></g>)}
      <text className="network-label" x="388" y="282">{model ? 'Suppression checked before recording' : 'Deterministic route · inference bypassed'}</text>
    </svg>
    <div className="network-readout" aria-live={running ? 'off' : 'polite'}><span>EVENT / 001</span><strong>{['Receiving event', 'Checking decision boundaries', model ? 'Reviewing scoped context locally' : 'Following the rule verdict', 'Writing the decision trail'][step]}</strong><span>{step+1} / 4</span></div>
  </div>;
}
