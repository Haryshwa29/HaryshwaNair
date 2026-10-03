# Content provenance

Verification date: **2026-10-03 (America/New_York)**. Public content is bundled locally; the deployed site does not fetch these sources. Remote code was read as evidence, not copied into the portfolio or executed.

## Identity and background

- User brief: primary authority for full/display name, education, Deloitte sector context and escalation work, supplied community history, certification/training, karate, and interests.
- [LinkedIn](https://www.linkedin.com/in/thaithe-haryshwa-nair/): direct web retrieval initially failed. The user then supplied an authenticated browser tab. Read the visible profile and contact panel through that tab. Confirmed M.S. completion in May 2026, Deloitte SOC internship Oct 2023–Jan 2024, and public professional contact email. No private analytics, messages, or job-search information was used.
- Current LinkedIn Experience lists **Graduate Badminton Club Officer, Jan 2025–May 2026**. This supersedes the brief's less formal Event Coordinator wording; visible responsibilities support events, court scheduling, equipment, and outreach.
- A September 12 GDG Brooklyn team-leads post visible on the profile describes Haryshwa's responsibility as **Digital Strategy**. It does not establish an exact formal successor title or start/end dates. The supplied **Social Media & Volunteer Lead, July–September 2026** remains the dated role; confirm formal newer title before replacing it.
- LinkedIn Featured contains a Google Docs resume link. It was **not** imported: the brief requires a current resume explicitly supplied or designated in this repository.
- [GitHub profile](https://github.com/Haryshwa29): user-confirmed identity; project repositories retrieved successfully via public Git.
- CEH is described as a professional certification; TryHackMe Cybersecurity 101 as course completion; Digital Forensics & Electronic Evidence as training. No current validity, issuer, credential ID, or completion date is invented. These rely on the brief pending credential evidence.

## Arbiter AI

[Repository](https://github.com/Haryshwa29/Arbiter-AI), reviewed commit `f7ca6448bb6d16d20af6635703a1660c40c8ba99`.

Read README, `arbiter/triage.py`, response defaults in `arbiter/respond.py`, dashboard routes in `frontend/src/App.tsx`, `docs/PORTABLE.md`, and `evals/2026-08-22-1536/comparison.md`. Evidence links use immutable commit URLs.

- README opening and API section say dashboard views are missing/in progress. Later README paragraphs and actual routes implement overview, live feed, audit, and assets. Publish **dashboard views exist in source**, not a claim of fully validated production functionality.
- Portable builder/guide describes bundled local runtime/model and sample scenarios. The guide explicitly leaves clean-machine, hardware, USB-removal validation, real collectors, and signed release open. No hosted demo, release download, or live monitoring is claimed.
- Guardrails precede/follow inference, but current `triage.py` includes narrowly matched, administrator-curated standing-fact exceptions. Documented this nuance instead of claiming rules can never be reconsidered.
- Model failure and low-confidence suppression escalate. Shadow mode and response dry-run default true.
- Historical “296 cases / 88 event types” omitted: suite boundaries and aggregation were not established for a current combined metric.
- The checked-in August model comparison distinguishes full-suite and model-only subsets and documents model-specific failures. No overall success rate is advertised. No project tests or model benchmarks were rerun for this site.

## TrustKit AI

[Repository](https://github.com/Haryshwa29/TrustKit-AI), reviewed commit `36f185a1aba11e69c504cda165036aa5ad3d8465`; fork of the team repository.

Read README, ARCHITECTURE.md, and `backend/modules/{frame_extractor,metadata_analyzer,vision_analyzer}.py`.

- User-supplied contribution: frame extraction, metadata analysis, vision processing. Architecture plan assigns roles rather than proving individual file authorship; do not infer sole authorship of the team system.
- OpenCV extraction supports intervals, maximum frames, resizing, and timestamps.
- Early plan promises EXIF, codec, creation-date analysis; current metadata module implements live-frame blur/brightness heuristics. Public copy describes current code.
- Vision module uses Vertex AI/Gemini and may substitute mock observations on missing configuration/failure. State that clearly; no independently validated fraud accuracy or working public demo claimed.
- Blur, darkness, and inconsistency signals do not establish fraud.

## SentinelScope

[Repository](https://github.com/Haryshwa29/SentinelScope), reviewed commit `b13183042d333c8ff9cc57da41cd6a51432da014`.

Read README, bot.py, app.py. The direct command implementation submits URLs to VirusTotal, fetches report statistics, performs basic validation, rate limits in memory, and logs activity. FastAPI supplies a webhook entry point.

- Old portfolio labels this completed/verified. Use **source available · prototype**, since no live deployment was verified and implementation needs hardening.
- Inline queries prepare a message only; do not advertise inline reputation scanning.
- `bot.py`'s standalone main only builds an application, `/help` contains stale future-tense text, synchronous HTTP is used inside async handlers, and it imports `curses` (Windows portability concern). The FastAPI entry point is present, but runtime success is not claimed.
- Logs may contain identifiers/URLs; no logs, tokens, or security samples were copied into website assets.

## Previous portfolio (project information only)

[Website](https://haryshwa29.github.io/Portfolio/) could not be fetched by web tool. [Repository](https://github.com/Haryshwa29/Portfolio) was retrieved. Only project-area excerpts of index.html were used. No design, resume, contact, or other personal data was reused.

- SentinelScope's former description supports its intended purpose; current repository takes precedence for status.
- SSH Honeypot listed in progress with Python/Paramiko, authentication/session metadata, and fake shell command logging as roadmap. No specific current source established later Docker or command-logging claims. Omitted this optional entry.
- Planned concepts omitted.

## Implementation references

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind Next.js installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- Stable registry versions resolved with npm; lockfile records exact dependency graph. Local Fontsource packages supply font files and licenses.
