# LAYZOX website

Marketing site for LAYZOX (legal entity Layzox India Pvt Ltd): custom software, AI/workflow automation, web and mobile apps, cloud and data, consulting.
Owner: Amit. He writes in Hinglish; reply to him in Hinglish, keep code and UI copy in English.

## Stack
Next.js 15 App Router, React 19, TypeScript, `motion` (motion/react), `lenis`, plain CSS with variables (no Tailwind). Fonts: Sora + Newsreader via next/font.

## Structure
- `lib/content.ts` all copy, links, company details. Edit copy here, not in components.
- `styles/tokens.css` colours for both themes. `data-theme="light|dark"` on `<html>`, set before paint in `app/layout.tsx`. Light = clean editorial, dark = cinematic. Every new element must look right in BOTH.
- `components/Converge.tsx` scroll-driven hero story (sticky, `useScroll`). `components/Scenes.tsx` + `styles/scenes.css` looping CSS "explainer film" scenes. `components/Services.tsx` pinned film reel.
- `lib/enquiry.ts` posts to `app/api/enquiry/route.ts` (Resend); if mail is not configured the route returns 503 and the form opens WhatsApp.
- `lib/pages.ts` copy for inner pages. Shared page frame is `components/Shell.tsx`; page bits in `components/PageBits.tsx`.

## Hard rules
- Audience is worldwide and the site is English only. Never mention Ranchi or "businesses in India" in site copy; the office address appears only in the footer. Legal entity name may appear in footer and legal pages only.
- Never invent clients, testimonials, metrics, team members or certifications. The company is new; proof is the website itself. Scenes are illustrations of what Layzox builds; never present their numbers as real results.
- Keep CIN / grievance officer placeholders until Amit supplies real values.
- Respect `prefers-reduced-motion`; animations must show the finished state without motion.
- Link to local routes only (next/link). Never point at old layzox.com pages.
- Only one active caption/panel at a time in pinned scroll sections (an overlap bug happened before with opacity-based crossfades; use state-driven switching).
- Scenes: do not name a global CSS class `.btn` (it collides with the site button).
- Mobile first-check at 390px, plus 768 and 1440. No horizontal scroll.

## Quality bar
`npm run typecheck` and `npm run build` must pass with `ignoreBuildErrors` set to false before finishing. Lighthouse mobile target: Performance 90+, Accessibility 100, SEO 100. Contrast WCAG AA.
