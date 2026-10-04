## Detailed execution flows

`content/flows.ts` defines named nodes, routing arrows, branch labels, and text explanations for Arbiter, TrustKit, and SSH Honeypot. `components/project-flow.tsx` renders those diagrams alongside the animated architecture. Wide flowcharts support keyboard-accessible horizontal scrolling on phones, with a text explanation underneath. Add another slug-keyed flow to include this section automatically on a future project page.

## Project pages and visual architecture

Every collection entry links to `/projects/[slug]` through the same page template. Project descriptions live in `content/projects.ts`; gallery selections live in `content/work.ts`. Architecture content lives in `content/architectures.ts` with named stages, icon types, component explanations, and optional source paths.

For a future project, add a project record, its gallery entry, and a diagram keyed by the same slug. Set `animated: true` to enable the reusable stage playback. Provide the repository and reviewed commit to enable component source links; leave the repository null and evidence array empty when there is no source. Unknown implementation sections remain empty and are omitted from the page.

The three main projects have animated architecture walkthroughs with pause, replay, reset, manual stage selection, component inspection, and reduced-motion support. Playback stops after one pass and pauses when the diagram is outside the viewport. Diagrams remain readable without JavaScript. The homepage uses a separate local Arbiter decision-path illustration with three selectable scenarios; it makes no backend or model calls.

Clean Energy uses a content map. Steganography uses an explicitly planned research map, not an implemented-system diagram.

## Current editorial scope

The collection contains nine curated entries (eight projects and planned steganography). The introduction foregrounds Haryshwa Nair and his USA location. Experience merges volunteering and subsequent leadership into single journeys. Education, certification/training, and sporting achievements have dedicated visual sections. User corrections on 2026-10-03 supersede older counts and GDG dates in the historical notes.

# Haryshwa Nair — portfolio

A restrained editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS, locally served Instrument Serif / Manrope, and Lucide icons. Homepage, nine statically generated project pages, privacy, 404, social artwork, favicon, robots, and sitemap. No database, analytics, external embeds, runtime profile requests, or contact service.

The revised edition is predominantly warm ivory with navy and champagne accents. It includes a personal introduction, configurable portrait frame, nine-entry searchable/filterable collection with six projects per page, a dedicated `/work` route, expandable experience/volunteering, cursor-following accents, portrait parallax, and short entrance motion. The native cursor remains available. Effects turn off for reduced motion and coarse pointers. All projects and native disclosures remain available without JavaScript.

## Preview

Requires Node.js 20.9+ (validated with Node 24) and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For the production version:

```sh
npm run build
npm start
```

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run test:smoke
```

Smoke tests start the production server automatically (build first). Chromium must be available to Playwright: `npx playwright install chromium`. Tests cover direct routes, 404, no-JavaScript navigation, small viewports, keyboard navigation, reduced motion, contact actions, clipboard failure, and accessibility. See VALIDATION.md for actual results and known limits.

## Edit content

- `content/profile.ts`: identity, verified email, nullable resume.
- `content/work.ts`: complete repository collection, earlier projects, and planned work; add entries here without lengthening the default homepage.
- `content/experience.ts`: sourced experience, leadership, and volunteering timeline.
- `profile.portrait`: set `{ src: '/images/haryshwa.webp', alt: 'Haryshwa Nair' }` after placing the approved photo in `public/images/`. Null or an image-loading error displays the monogram; no public upload service is needed.
- `content/projects.ts`: case studies, nullable demo links, pinned evidence paths, status and limitations.
- `app/page.tsx`: background sections and homepage narrative.
- `app/globals.css`: visual system and responsive layouts.
- `app/editorial.css`: light editorial theme, gallery, portrait, timeline, and reduced-motion behavior.
- `lib/site-config.ts`: production origin and metadata policy.
- `CONTENT_SOURCES.md`: provenance and discrepancies; `CONTENT_TODO.md`: remaining content dependencies. Neither is routed publicly.
- `scripts/generate-sharing.mjs`: original 1200×630 sharing artwork; regenerate with `node scripts/generate-sharing.mjs` (uses Next's installed Sharp dependency). Fonts remain local, including during builds.

To enable a resume, place the approved PDF under `public/resume/` and set `resume: { url: '/resume/haryshwa-nair.pdf', filename: 'Haryshwa-Nair-Resume.pdf' }`. Missing fields render no placeholder buttons. Email copying has a visible selectable fallback and an accessible status message.

## Deployment to Vercel

1. Connect the local repository to the intended GitHub remote and push when authorized. No Git repository was present when work began; a local repository and initial commit now include package-lock.json. No remote has been created or pushed.
2. Import the repository into Vercel, choose the Next.js framework, npm install/build defaults, and a compatible Node release.
3. Set `SITE_URL` to the approved HTTPS root production origin. It must not include a subdirectory; this App Router deployment is not configured for the old GitHub Pages `/Portfolio/` base path.
4. Vercel production builds are indexable only with that configured origin. Preview builds stay noindex through metadata, headers, and robots. For other hosts, explicitly set `SITE_INDEXABLE=true` on production only.
5. Rebuild, then check canonical URLs, sitemap, robots, sharing preview, direct case-study URLs, 404 status, contact, and resume downloads.
6. Run Lighthouse against the final deployment as hosting and real network behavior affect results.

The site is prepared for deployment but has not been published. Hosting providers may retain operational logs, as described by the privacy page. Avoid adding sensitive files anywhere under public/.
