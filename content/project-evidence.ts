export const projectEvidence: Record<string, {
  label: string;
  metrics: { value: string; label: string }[];
  payoff: string;
  scope: string;
  sources: { label: string; path: string }[];
}> = {
  'arbiter-ai': {
    label: 'Recorded evaluation · August 22, 2026',
    metrics: [
      { value: '121', label: 'Cases across two evaluated suites' },
      { value: '100%', label: 'Recall · realistic suite' },
      { value: '72%', label: 'Precision · realistic suite' },
      { value: '4', label: 'Python versions in CI configuration' },
    ],
    payoff: 'In the recorded realistic-suite comparison, Qwen caught all labeled attacks while achieving 83% overall accuracy. The evaluation makes the tradeoff visible: preserving recall still leaves false positives for review.',
    scope: 'Qwen3.5:4b with guardrails enabled; 101 realistic cases plus 20 red-team cases, three runs per suite. Recall, precision and accuracy above refer only to the full realistic suite, including rule decisions—not model-only performance or production detection. Local Ollama inference. CI config covers Python 3.10–3.13; its mock evaluation is non-blocking. This historical benchmark was not rerun for the portfolio.',
    sources: [{ label: 'Read the measured comparison', path: 'evals/2026-08-22-1536/comparison.md' }, { label: 'Inspect CI coverage', path: '.github/workflows/ci.yml' }],
  },
  'trustkit-ai': {
    label: 'Source-verified processing budget',
    metrics: [
      { value: '7', label: 'Target frames per uploaded tour' },
      { value: '2', label: 'Quality measures · blur and brightness' },
      { value: '3', label: 'Tour frames used for listing comparison' },
      { value: '2', label: 'Entry paths · live and upload' },
    ],
    payoff: 'The upload path targets seven sampled frames, bounding the number sent through frame analysis. For illustration, a 60-second, 30-fps video contains 1,800 frames: selecting seven sends about 99.6% fewer frames to that analysis stage.',
    scope: 'The reduction is arithmetic for the stated example, not a measured latency, cost or accuracy improvement. Short videos or decoding failures can yield fewer than seven frames. Optional listing comparison uses the first three frames; the combined assessment currently uses the first frame. Prototype processing counts do not establish fraud-detection accuracy.',
    sources: [{ label: 'Inspect frame sampling', path: 'backend/modules/frame_extractor.py' }, { label: 'Inspect the upload pipeline', path: 'backend/routes/deep_scan.py' }, { label: 'Inspect quality measurements', path: 'backend/modules/metadata_analyzer.py' }],
  },
  'ssh-honeypot': {
    label: 'Source-verified session boundaries',
    metrics: [
      { value: '1', label: 'Disposable container per shell session' },
      { value: '256 MiB', label: 'Default container memory limit' },
      { value: '30 s', label: 'Default command execution timeout' },
      { value: '3', label: 'Evidence files per session' },
    ],
    payoff: 'Each session produces metadata, structured events and a transcript, so a reviewer can connect attempted commands to returned output. The configured 256 MiB memory limit bounds each container, and the 30-second subprocess timeout limits how long the manager waits for a command.',
    scope: 'These are configurable code defaults and evidence outputs, not measured throughput or containment results. A subprocess timeout does not prove the command inside the container was terminated. Network isolation needs explicit configuration; the project remains a controlled lab implementation.',
    sources: [{ label: 'Inspect limits and session records', path: 'src/manager.py' }],
  },
};
