# AALVIS — Next.js 14 (CELESTIAL CHAMPAGNE)

International luxury gold & diamond jewellery brand experience.
**Live:** https://aalvis-site.vercel.app · **Deployment details:** `DEPLOYMENT.md`

Brand presentation + enquiries only — **no e-commerce** (no cart, checkout,
payments, prices, inventory or purchase accounts anywhere).

## Stack
Next.js 14 App Router · TypeScript · Tailwind (design tokens) · Motion
(framer-motion) · next-intl (7 locales: en fr de es it pt nl) · static export.

## Develop
```bash
npm install
npm run dev        # http://localhost:3000 (SSR dev server)
npm run build      # static export -> out/
npx serve out      # preview the production build locally
```

## Structure
- `messages/<locale>.json` — all copy per language (edit here; keys mirror the
  section components). Includes per-locale SEO `meta.*`.
- `src/app/[locale]/` — locale layout (fonts, metadata, hreflang, JSON-LD),
  home page composition, legal pages (`legal/[doc]`).
- `src/components/` — chrome (preloader/curtain/cursor), header (announcement,
  floating nav, language picker, browser-language suggestion bar), hero,
  collections (asymmetric grid, vitrine treatment), featured (signature
  creations), story, craft (parallax macro band), campaign (pinned horizontal
  gallery + native touch fallback), gallery, testimonials, contact, newsletter,
  footer, WhatsApp FAB.
- `src/lib/` — `site.ts` (public config/env), `images.json` + `images.ts`
  (licensed imagery per slot), `wm-loader.ts` (Wikimedia thumbnail loader),
  `legal.ts` (legal documents, `[CLIENT …]` markers), `locales.ts`.
- `src/styles/base.css` — the full CELESTIAL CHAMPAGNE design system:
  emerald `#183B38`, champagne `#D5B98C`, pearl ivory `#F3EEE5`, muted rose
  `#B76E62`, graphite `#242522`; Cormorant Garamond + Jost via `next/font`;
  motion primitives (preloader, curtain, cursor, sweeps, mask reveals, pinned
  horizontal gallery, sparkles) with `prefers-reduced-motion` respected.

## Motion system (summary)
Loading identity reveal → full-screen curtain page transitions → dot+ring
custom cursor → magnetic CTAs → character-split hero headline ("Beauty Beyond
Time.") → scroll mask-reveals → pinned horizontal campaign gallery (desktop)
with native scroll-snap fallback (touch/reduced-motion) → parallax craft band →
light-sweep image cards → ambient sparkles. All animations are GPU-friendly
(transform/opacity), gated by `useReducedMotion`, and cleaned up on unmount.

## Content honesty rules (carried through)
- Testimonials are clearly flagged **PLACEHOLDER** — replace with approved
  customer feedback only.
- No invented addresses, founding years, awards or store claims.
- Forms never simulate success: validated client-side (email/phone regex,
  ≥20-char message, consent, honeypot, 2.5 s timing trap), then delivered via
  configured endpoint or an explicit WhatsApp handoff.
- WhatsApp `919876543210` and `hello@aalvis.example` are **placeholders** —
  override via env vars (see DEPLOYMENT.md).

## Imagery
Wikimedia Commons / MET Open Access, per-slot licences and creators listed on
`/<locale>/legal/image-credits/` and in `src/lib/images.json`. Replace with
client-owned photography before commercial launch.
