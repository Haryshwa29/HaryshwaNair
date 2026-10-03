# Haryshwa Nair — portfolio

A restrained editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS, locally served Instrument Serif / Manrope, and Lucide icons. Homepage, three statically generated case studies, privacy, 404, social artwork, favicon, robots, and sitemap. No database, analytics, external embeds, runtime profile requests, or contact service.

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
- `content/projects.ts`: case studies, nullable demo links, pinned evidence paths, status and limitations.
- `app/page.tsx`: background sections and homepage narrative.
- `app/globals.css`: visual system and responsive layouts.
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
