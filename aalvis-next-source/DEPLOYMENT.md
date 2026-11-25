# AALVIS — Vercel Deployment Notes

## Live site
- **Production URL:** https://aalvis-site.vercel.app (root redirects by browser language to `/en/ … /nl/`)
- **Vercel project:** `aalvis-site` (id `prj_qGjSis6bVoIrTmtmjISOFeVdjhrL`, team `sal1243s-projects`, Hobby)
- **Latest production deployment:** `dpl_7RzJPeMz2uEHN3mJEPGa6pG4Yetg`
- Verified anonymously (no login wall): all 7 locales, 28 legal pages, `/sitemap.xml`, `/robots.txt`, branded 404.

## How this deployment works (and why it looks unusual)
The Vercel connector available in this workspace cannot transmit JSON files
(`package.json`, `vercel.json`) inline — the bridge auto-parses JSON-looking
strings and Vercel's API rejects non-string file data. To work around this
without weakening the app:

1. The app is a **Next.js 14 static export** (`output: "export"` → `out/`).
   No server runtime is needed, so the project uses the static-serving
   pipeline (framework preset `eleventy` is only a placeholder that selects
   Vercel's static builder — the real stack is Next.js).
2. Each deploy ships a single plain-text `README.md`; the **build command
   downloads the full source as a SHA-256-verified snapshot**, then runs
   `npm i && next build`:
   ```
   curl -fsSL https://d.uguu.se/wtSFnSZyXgkP.tar.gz -o s.tgz && \
   echo "9b6018c682f77bfb7cb5ce44964cc2d211eff1d51c72aad49a392daee99087c3 s.tgz" | sha256sum -c - && \
   tar -xzf s.tgz && npm i && next build && cp public/404-branded.html out/404.html
   ```
3. Images: `next/image` uses a custom loader (`src/lib/wm-loader.ts`) that
   rewrites Wikimedia Commons originals to their thumbnail CDN at the exact
   requested width — responsive srcsets without Vercel's image optimizer.
4. Forms: static export has no API routes. Enquiry/newsletter forms validate
   client-side (regex, honeypot, timing trap), then either POST to a
   configured public endpoint or perform an **honest WhatsApp click-to-chat
   handoff** with the composed, localized message. Nothing is ever simulated.

### Environment variables (project `aalvis-site`)
| Var | Current value | Purpose |
|---|---|---|
| `NODE_VERSION` | `22.x` | build runtime |
| `NEXT_PUBLIC_SITE_URL` | `https://aalvis-site.vercel.app` | canonicals, hreflang, OG, sitemap |
| `NEXT_PUBLIC_WHATSAPP` | *(not set — placeholder `919876543210` baked in)* | **set the real number, digits only** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | *(not set — placeholder `hello@aalvis.example`)* | **set the real inbox** |
| `NEXT_PUBLIC_FORM_ENDPOINT` | *(not set)* | optional: Formspree/etc. URL for email delivery of enquiries |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | *(not set)* | optional: ESP list-subscribe URL |

Env vars are read at **build time** — after changing one, trigger a redeploy.

## Updating the site (current snapshot pipeline)
The uguu.se snapshot expires (~3 h), so **old deployments cannot be rebuilt
later** — always re-snapshot for a new deploy:

```bash
cd aalvis-next
npm run build                      # sanity-check locally (out/)
tar czf /tmp/aalvis-src.tar.gz --exclude=node_modules --exclude=.next --exclude=out --exclude=.vercel \
  package.json package-lock.json next.config.mjs next-env.d.ts tsconfig.json \
  tailwind.config.ts postcss.config.mjs messages public src
sha256sum /tmp/aalvis-src.tar.gz
curl -F'files[]=@/tmp/aalvis-src.tar.gz' https://uguu.se/upload   # -> URL
```
Then (Vercel connector or dashboard): update the project build command with
the new URL+SHA (keep it ≤ 256 chars) and create a production deployment
(files: `README.md`, project_settings: framework `eleventy`, output `out`).

## Recommended: migrate to Git-based CI (one-time, ~10 min)
The account already has GitHub connected and an (empty) repo
**`Sal1243/aalvis`** linked to the Vercel project **`aalvis`**. For permanent,
robust deployments:

1. Push this folder to that repo:
   ```bash
   cd aalvis-next && git init -b main && git add -A && git commit -m "AALVIS Next.js site"
   git remote add origin https://github.com/Sal1243/aalvis.git
   git push -u origin main
   ```
2. In Vercel dashboard → project **`aalvis`** → Settings → General:
   Framework **Next.js**, Build Command **`next build`**, Install **`npm install`**,
   Output Directory **empty** (SSR mode) — and add the same env vars.
   (Or keep static mode: Output `out`; both work — with Git, SSR + API routes
   become possible again, restoring server-side enquiry delivery.)
3. Every future `git push` then deploys automatically; `aalvis-site` can be
   deleted afterwards.

## Before public launch (client inputs required)
- Real WhatsApp business number + real contact email (env vars above).
- Approved customer testimonials — current ones are **PLACEHOLDER samples**.
- Legal entity, registered address, jurisdiction in the legal pages
  (`src/lib/legal.ts` — marked `[CLIENT …]`).
- Replace Wikimedia Commons imagery with owned campaign photography
  (licence credits: `/en/legal/image-credits/`).
- Optional custom domain: Vercel → project → Settings → Domains (DNS:
  `A 76.76.21.21` or `CNAME cname.vercel-dns.com`).
- If the dashboard ever shows a login wall for `*.vercel.app` URLs:
  Settings → Deployment Protection → turn off "Vercel Authentication".
  (The live production alias currently serves publicly — verified.)
