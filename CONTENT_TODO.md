# Launch dependencies and optional improvements

## Needed before final launch sign-off

- Supply/designate the current approved resume PDF in `public/resume/`, then set `profile.resume` in `content/profile.ts`. This automatically enables header, hero, contact view, and download actions. A LinkedIn Featured resume exists, but was not imported without repository designation.
- Choose the production root domain and set `SITE_URL`. Until set, the site deliberately stays noindex, emits no canonical, and returns an empty sitemap. Set Vercel environment to production (automatic on Vercel) or `SITE_INDEXABLE=true` only on a non-Vercel production build. Rebuild when changing values.
- Public deployment still requires user authorization; nothing was published.

## Editorial confirmation

- Confirm the exact newer GDG Brooklyn title and dates. A Sept 12 post describes Digital Strategy; supplied July–September Social Media & Volunteer Lead is retained.
- Provide certification/course evidence and issuer/date details if desired; do not assume active CEH status or renewal.
- Confirm any more granular Arbiter ownership description before adding claims of sole module authorship.

## Optional assets / later validation

- Portrait and screenshots are optional. Original typographic identity and labeled architecture illustrations are used instead.
- Add demo links only after verifying actual hosted demos. Repository evidence is available now.
- Arbiter portable clean-machine / USB / real collector milestones remain project dependencies, not website features.
- Email was verified from the supplied LinkedIn Contact info on 2026-10-03 and is configured.
- Recheck content against upstream revisions before future updates; case-study evidence is pinned to reviewed commits.
