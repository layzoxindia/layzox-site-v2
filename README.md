# LAYZOX corporate website

This repository has **two delivery modes**. The current public-facing design is the cinematic static HTML in `public/`; the Next.js components in `app/` and `components/` are legacy/fallback code. Avoid editing the Next.js homepage when the visible page is `public/cinematic.html`.

## Site source of truth
- Homepage: `public/cinematic.html`
- Inner pages: `public/*.html`
- Design system: `public/cine.css`, `public/motion.js`
- Company artwork: `public/brand/` (preserve original logos)
- Canonical routes: `public/_redirects` plus `next.config.mjs`
- SEO for both runtimes: `public/sitemap.xml` and `public/robots.txt`
- Server form integrations: `functions/api/enquiry.ts` (Cloudflare) and `app/api/enquiry/route.ts` (Next.js)

## Hosting
**Cloudflare Pages static site:** publish directory `public`; `public/_redirects` maps canonical routes to the HTML assets and older corporate URLs permanently to their replacements. The `functions/` folder must be included so `/api/enquiry` can work. Check deployment settings and ensure uploaded site includes `_redirects`, `_headers`, `sitemap.xml`, `robots.txt`, assets and the function.

**Next.js server:** `npm ci && npm run build && npm start`. `next.config.mjs` maps the exact same public HTML pages and redirects obsolete paths.

## Verify before publishing
```bash
npm ci
npm run typecheck
npm run routes:check
npm run build
npx playwright install chromium
npm test
```
CI is located at `.github/workflows/ci.yml` and runs these checks on changes to main or pull requests. These checks are not a substitute for real-browser and real-mobile visual review.

## Contact form
Server-side email delivery needs `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, and a verified `ENQUIRY_FROM_EMAIL`. Without these settings the API returns 503 and the visitor must manually send the fallback WhatsApp message. **Do not consider a lead delivered without successful confirmation from the email API.** Test a genuine enquiry before launching.

## Notes
- Make no fabricated claims about company history, clients, achievements or products.
- Demo scenes are illustrative, not real customer dashboards.
- Review Privacy/Terms with appropriate counsel and verify official company details before publishing.
- This repository includes historical app components to be simplified in a later controlled change, not blindly deleted.
