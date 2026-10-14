# LAYZOX website

Next.js 15 (App Router) + React 19 + Motion (Framer Motion) + Lenis smooth scroll.
Two themes: clean light editorial and dark cinematic. The toggle is in the header and remembers the choice.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 20 or newer.

## Before launch

1. `npm install`, then `npm run typecheck` and `npm run build`. Fix anything they report, then set
   `typescript.ignoreBuildErrors` to `false` in `next.config.mjs`.
2. Copy `.env.example` to `.env.local` and fill it in (see Forms).
3. In `lib/content.ts` fill `company.cin` and `company.grievance` (shown in the footer and Privacy Policy).
4. Have a lawyer read `app/privacy/page.tsx` and `app/terms/page.tsx` before relying on them.
5. Check the wording in `lib/pages.ts` (About, Why Layzox, FAQ, service pages). It describes how you work; edit anything that is not true for you.
6. `npm test` runs the Playwright smoke tests (`npx playwright install chromium` the first time).

## Forms

Forms post to `/api/enquiry`. Set `RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` (and a verified `ENQUIRY_FROM_EMAIL`)
and every enquiry arrives in your inbox. Without them the route answers 503 and the form opens a pre-filled
WhatsApp message instead, so no lead is lost. Spam protection: hidden honeypot field, 5 submissions per IP per
10 minutes, same-origin check.

## Structure

- `app/` routes: home, about, why-layzox, faq, careers, privacy, terms, services/[slug], api/enquiry, plus 404, error, OG image, sitemap and robots
- `components/` Hero, Converge (scroll story), Services (film reel), Scenes (animated explainer scenes), Process, Work, Industries, Products, Contact, Footer
- `lib/content.ts` home-page copy and company details; `lib/pages.ts` inner-page copy
- `styles/` tokens.css holds both themes; the rest is split by area
- `public/brand/` logo files

## Notes

- The animated scenes are interactive demos with illustrative data (explained in the Terms page). Do not present them as real client dashboards.
- Reduced-motion users see the finished state of every animation.
- Deploy: push to GitHub and import in Vercel. Add the environment variables there too.
