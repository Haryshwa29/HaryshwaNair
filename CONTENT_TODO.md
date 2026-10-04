# Launch dependencies and optional improvements

## Needed before final launch sign-off

- Supply/designate the current approved resume PDF in `public/resume/`, then set `profile.resume` in `content/profile.ts`. This automatically enables header, hero, contact view, and download actions. A LinkedIn Featured resume exists, but was not imported without repository designation.
- Choose the production root domain and set `SITE_URL`. Until set, the site deliberately stays noindex, emits no canonical, and returns an empty sitemap. Set Vercel environment to production (automatic on Vercel) or `SITE_INDEXABLE=true` only on a non-Vercel production build. Rebuild when changing values.
- Public deployment still requires user authorization; nothing was published.

## Editorial confirmation

- GDG title and start corrected by the user: Digital Strategist Lead since June 2026, following GDG VIT membership and Brooklyn DevFest volunteering.
- Provide certification/course evidence and issuer/date details if desired; do not assume active CEH status or renewal.
- Confirm any more granular Arbiter ownership description before adding claims of sole module authorship.

## Optional assets / later validation

- A generated professional portrait is now configured. To replace it later, add a portrait under `public/images/`, then set `profile.portrait` in `content/profile.ts`, for example `{ src: '/images/haryshwa.webp', alt: 'Haryshwa Nair' }`. The frame has fixed dimensions, responsive image sizing, and a monogram fallback for a missing/broken asset. Do not publish an invented portrait.
- Expand individual contribution detail for Financial RAG Analyst if desired; it is currently correctly described as a collaborative team fork.
- Provide source or documentation for Clean Energy Awareness if available. Steganography is the only planned project shown and is explicitly not started.

- The user-selected `public/images/teal_suite.jpg` portrait is configured and served without recompression.
- Add demo links only after verifying actual hosted demos. Repository evidence is available now.
- Arbiter portable clean-machine / USB / real collector milestones remain project dependencies, not website features.
- Email was verified from the supplied LinkedIn Contact info on 2026-10-03 and is configured.
- Recheck content against upstream revisions before future updates; case-study evidence is pinned to reviewed commits.
