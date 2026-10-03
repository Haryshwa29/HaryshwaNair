export type Project = {
  number: string; slug: string; name: string; category: string; status: string;
  title: string; summary: string; technologies: string[]; repository: string;
  demo: string | null; role: string; problem: string; contribution: string;
  implementation: string; decision: string; decisionTitle: string;
  evidence: { label: string; path: string; detail: string }[];
  limitations: string[]; steps: string[]; commit: string;
};
export const projects: Project[] = [
  {
    number: '01', slug: 'arbiter-ai', name: 'Arbiter AI', category: 'Security automation', status: 'Pre-release',
    title: 'A local-first approach to security alert triage.',
    summary: 'Rules for the clear-cut. Local AI for the ambiguous. A traceable decision for every alert.',
    technologies: ['Python', 'Ollama', 'SQLite', 'GitHub Actions'],
    repository: 'https://github.com/Haryshwa29/Arbiter-AI', demo: null,
    commit: 'f7ca6448bb6d16d20af6635703a1660c40c8ba99',
    role: 'Personal security project',
    problem: 'Small organizations can generate security alerts without having a dedicated SOC to investigate them. Arbiter explores a self-hosted triage workflow that keeps event analysis local and makes each decision inspectable.',
    contribution: 'I am building Arbiter as a personal security project: exploring how deterministic rules, local inference, environment context, and an audit trail can work together. The central design question is what the model should be allowed to decide—and where code must enforce the boundary.',
    implementation: 'Events pass through security guardrails and a deterministic pre-filter. Ambiguous events reach an Ollama-backed local model with asset context and verdict history from SQLite. The engine records a rationale and evidence with its verdict. Inference failures and low-confidence suppression requests escalate for review. Shadow mode and response dry-run are defaults. A JSON API connects the audit store to React dashboard views.',
    decisionTitle: 'Give the model context. Keep the guardrails in code.',
    decision: 'Adversarial evaluation exposed a failure mode: an attack framed as routine maintenance could persuade a model to suppress it. Non-suppressible guardrails check dangerous patterns before and after inference. Current code also permits narrowly scoped, administrator-curated facts to route a matching guardrail to model review; that exception is recorded in the rationale. This trades some flexibility and extra review for a more inspectable safety boundary.',
    evidence: [
      { label: 'Triage engine', path: 'arbiter/triage.py', detail: 'Inspect escalation on model failure, the suppression confidence threshold, and recorded guardrail exceptions.' },
      { label: 'Guardrail tests', path: 'tests/test_guardrails.py', detail: 'Review executable cases around dangerous patterns and attempts to explain them away.' },
      { label: 'Model comparison', path: 'evals/2026-08-22-1536/comparison.md', detail: 'An August 2026 experiment separates model-only decisions from guardrail decisions. Results are bounded to those labeled suites and that setup.' },
      { label: 'Portable demo guide', path: 'docs/PORTABLE.md', detail: 'Build instructions describe a local sample-event demonstration with bundled runtime and model.' },
    ],
    limitations: ['Pre-release software, not a claim of production readiness or universal detection.', 'Dashboard views and a portable builder exist in source. Clean-machine, USB, and broader hardware validation remain open.', 'The demonstration replays sample events. Real host collectors and a signed general release remain future work.', 'Evaluation artifacts are available for inspection; no benchmark was rerun for this portfolio.'],
    steps: ['Sample events', 'Guardrails + pre-filter', 'Local model, when needed', 'Verdict + audit trail'],
  },
  {
    number: '02', slug: 'trustkit-ai', name: 'TrustKit AI', category: 'Applied AI · Fraud signals', status: 'Team hackathon prototype',
    title: 'Exploring fraud signals in rental property tours.',
    summary: 'Turning tour footage into useful observations—and questions worth asking before trusting a listing.',
    technologies: ['Python', 'FastAPI', 'OpenCV', 'Gemini', 'React', 'TypeScript'],
    repository: 'https://github.com/Haryshwa29/TrustKit-AI', demo: null,
    commit: '36f185a1aba11e69c504cda165036aa5ad3d8465',
    role: 'Frame extraction, metadata analysis & vision processing',
    problem: 'Remote renters often have only a listing and a virtual tour to assess a property. The team explored whether voice, visual observations, and listing information could surface inconsistencies for further investigation.',
    contribution: 'My contribution focused on frame extraction, metadata analysis, and vision processing. The broader voice experience, listing comparison, reasoning pipeline, and interface are team work. This repository is a fork of the shared hackathon project.',
    implementation: 'A React and TypeScript interface connects to a FastAPI backend. OpenCV extracts representative frames with timestamps and sampling limits. The current metadata module measures frame blur and brightness, while a vision module integrates Gemini through Google Cloud. The team pipeline brings observations and listing information into an assessment.',
    decisionTitle: 'Sample deliberately. Preserve the uncertainty.',
    decision: 'Frame sampling, resizing, and a maximum frame count bound processing work instead of treating every video frame as equally useful. That keeps a prototype manageable but can miss brief details. Blur or low light can have ordinary causes; visual heuristics should prompt investigation, not become proof of fraud.',
    evidence: [
      { label: 'Frame extraction', path: 'backend/modules/frame_extractor.py', detail: 'Inspect time-based sampling, frame limits, resizing, and per-frame timestamps.' },
      { label: 'Frame quality analysis', path: 'backend/modules/metadata_analyzer.py', detail: 'The current implementation uses Laplacian variance and mean brightness, rather than the EXIF workflow in the early plan.' },
      { label: 'Vision integration', path: 'backend/modules/vision_analyzer.py', detail: 'Inspect the cloud model connection and mock fallback when configuration or inference fails.' },
    ],
    limitations: ['Hackathon prototype; no independently validated fraud-detection accuracy is claimed.', 'Signals and assessments do not establish that a property listing is fraudulent.', 'Cloud credentials and services are required for real model inference. Some vision paths fall back to mock observations.', 'The early architecture plan describes capabilities beyond the current metadata implementation.'],
    steps: ['Tour media', 'Sample frames', 'Visual + listing signals', 'Assessment for review'],
  },
  {
    number: '03', slug: 'sentinelscope', name: 'SentinelScope', category: 'Threat intelligence', status: 'Source available · Prototype',
    title: 'URL reputation checks through a familiar interface.',
    summary: 'A Python Telegram bot that brings VirusTotal reputation signals into a simple chat workflow.',
    technologies: ['Python', 'Telegram', 'VirusTotal', 'FastAPI'],
    repository: 'https://github.com/Haryshwa29/SentinelScope', demo: null,
    commit: 'b13183042d333c8ff9cc57da41cd6a51432da014',
    role: 'Personal security tool',
    problem: 'A suspicious link often arrives in a conversation. SentinelScope explores making a first reputation check accessible through a messaging interface, with enough detail to support a human triage decision.',
    contribution: 'I built a Telegram-based security helper around URL reputation checks. The repository brings together command handling, simple natural-language scan triggers, VirusTotal requests, per-user rate limiting, and activity logging.',
    implementation: 'The /scan_url command normalizes a submitted URL, checks basic input structure, and calls VirusTotal API v3. It retrieves reputation statistics and returns the result to Telegram. Simple scan/check phrases reach the same handler. Requests are rate limited in memory and written to a local audit log. A separate FastAPI entry point configures a Telegram webhook.',
    decisionTitle: 'Put a useful signal where the conversation happens.',
    decision: 'Telegram reduces the steps needed to request a reputation lookup. The tradeoff is dependency on Telegram and VirusTotal, including their availability and quotas. A reputation result is one input to investigation: no detections does not make a URL safe, especially when a threat is new.',
    evidence: [
      { label: 'Bot implementation', path: 'bot.py', detail: 'Inspect /scan_url, VirusTotal submission and report retrieval, phrase handling, rate limits, and logging.' },
      { label: 'Webhook entry point', path: 'app.py', detail: 'FastAPI initializes the bot and routes incoming Telegram updates to its handlers.' },
    ],
    limitations: ['The source implements scanning; a currently running public bot has not been verified.', 'The inline-query path only prepares a message. It does not perform a full reputation scan.', 'Synchronous HTTP calls, an in-memory rate limit, and incomplete error handling need hardening.', 'Submitted URLs reach external services, and logs can contain user identifiers and URLs. Use only authorized, non-sensitive inputs.'],
    steps: ['URL in Telegram', 'Validate + rate limit', 'VirusTotal lookup', 'Reputation response'],
  },
];
