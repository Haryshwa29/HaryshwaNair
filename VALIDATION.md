# Validation — October 3, 2026

Local production build on Windows, Node 24.18.0, npm 11.16.0, Next.js 16.3.8 / React 19.3.0. Nothing deployed publicly.

## Passed

- `npm run build`: static homepage, privacy, all three generated case studies, robots, sitemap, and 404.
- `npm run lint`: no errors or warnings.
- `npm run typecheck`: no errors.
- `npm run test:smoke`: **5 passed** (final run 3.8 seconds).
- Direct HTTP 200 for each content route, HTTP 404 for an invalid project slug, meaningful 404 content.
- Axe WCAG A/AA automated checks: no violations on homepage, three case studies, and privacy.
- All five content pages fit 320px without horizontal overflow.
- Native mobile menu, keyboard skip link, reduced-motion styles, and project navigation with JavaScript disabled.
- LinkedIn and mailto destinations; resume actions correctly absent; clipboard success and rejected-access fallback.
- Local link/anchor targets; pinned GitHub evidence URL format; 1200×630 PNG dimensions; robots and sitemap availability.
- No third-party network requests on homepage load. No credentials or sensitive log assets in shipped content.
- Visual review in Codex browser: desktop hero, work section, ivory experience/about; 375×812 mobile hero and case-study architecture/navigation. Viewport override reset afterward.
- Labels adjusted after Lighthouse's supplementary label-in-name check flagged the monogram and mobile menu; final check passes.
- Essential email link remains usable without JavaScript; copy button appears only after hydration.
- Calculated WCAG text contrast: ivory/navy **16.67:1**, secondary/navy **9.99:1**, champagne/navy **8.10:1**; light-section label/ivory **5.29:1**, body/ivory **6.06:1**, serif accent/ivory **5.04:1**. All exceed 4.5:1 for ordinary text.

## Lighthouse (actual measurements)

Lighthouse **13.5.0**, headless Chrome **154**, local `next start`, http://127.0.0.1:3000/. Mobile uses Lighthouse's default simulated mobile network and 4× CPU slowdown; desktop uses its desktop preset. These are local lab measurements, not field data or deployment guarantees.

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 96 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 63 | 63 |
| First contentful paint | 1.5 s | 0.4 s |
| Largest contentful paint | 2.6 s | 0.6 s |
| Total blocking time | 30 ms | 0 ms |
| Cumulative layout shift | 0.058 | 0.005 |

Raw reports: `reports/lighthouse-mobile.json`, `reports/lighthouse-desktop.json`.

SEO is deliberately limited by **noindex**: the production origin has not been chosen. Preserve this protection for local/preview builds. Configure SITE_URL and production environment, then repeat the SEO audit on the approved deployment. Do not remove preview noindex merely to raise the score.

## Known limits

- `npm audit --omit=dev`: **0 vulnerabilities**.
- Full npm audit reports **5 high-severity entries in the development-only ESLint → fast-glob → micromatch → braces chain**, all stemming from a braces stack-exhaustion advisory. Registry latest braces is still 3.0.3. npm's suggested resolution downgrades Next's lint configuration to 14; that incompatible downgrade was not applied. No user-submitted glob patterns are processed by this site's lint tooling. Recheck when an upstream patch is available.
- Next logs an internal `NoFallbackError` on the intentionally invalid dynamic slug; the externally observed result is the correct 404 and custom page. Known generated routes pass direct visits and refreshes.
- Automated accessibility checks do not substitute for a full assistive-technology audit. Keyboard, no-JavaScript, reduced-motion, and visual checks supplement them.
- External project code and model evaluations were inspected, not executed. No runtime claims or new benchmark figures are inferred.
- Production domain, canonical URLs, and populated sitemap need final production-environment verification. Current resume and newer GDG title are documented in CONTENT_TODO.md.
