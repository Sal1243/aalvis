# AALVIS — Vercel Deployment Notes

## Live site
- **Production URL:** https://aalvis-site.vercel.app (root redirects by browser language to `/en/ … /nl/`)
- **Vercel project:** `aalvis-site` (id `prj_qGjSis6bVoIrTmtmjISOFeVdjhrL`, team `sal1243s-projects`, Hobby)
- **Git source (connected 2026-11-22):** GitHub `Sal1243/aalvis`, branch `main`, repoId `1468091782`.
  Every push to `main` now auto-deploys to production.
- **Latest verified production deployments:** `dpl_CqrYMzpWNmJ75jzbEZ6eas4xhZrx` (READY, PROMOTED, commit `d140cd63`) —
  all 7 locales 200, 35-URL sitemap, branded 404. Earlier Git builds: `dpl_ESWGGweotMmLPrgXgUSpk988rzMZ`, `dpl_Eu8hek5QtQU55fjgSySbrZMDB2mG`.
- **One pending repo sync:** `aalvis-next-source/src/app/sitemap.ts` in GitHub is still the previous version
  (5-URL, English-only sitemap). Replace it with the updated file (emits all 7 locales × 5 paths = 35 URLs) so
  the next Git build keeps the fixed sitemap.
- Verified anonymously (no login wall): all 7 locales, 28 legal pages, `/sitemap.xml`, `/robots.txt`, branded 404.
- Legacy project **`aalvis`** (`prj_lHnGhW0trXxrnTfwrGaPojH0g2eJ`) is also linked to the same repo but has no
  usable settings — its deployments fail with `NEXT_NO_VERSION`. **Delete it** in the dashboard to stop the
  red ✗ checks on your commits; it is not serving anything.

## How the build works (permanent, Git-based — no external snapshot)
The repo holds the source as loose files inside **`aalvis-next-source/`** (52 files: `package.json`,
`package-lock.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`,
`next-env.d.ts`, `messages/`, `public/`, `src/`). Vercel builds straight from that folder:

| Setting | Value |
|---|---|
| Root Directory | `aalvis-next-source` |
| Framework preset | `eleventy` (**placeholder only** — selects Vercel's static builder so the Next.js SSR detector does not run; the real stack is Next.js 14 static export) |
| Install Command | `echo install-in-build` |
| Build Command | `npm i && next build && cp public/404-branded.html out/404.html` |
| Output Directory | `out` |

Any `git push` to `main` (or a GitHub web upload) now rebuilds and redeploys production in ~40 s. Nothing
depends on temporary file hosts any more.

Housekeeping: `aalvis-next-source.zip` at the repo root is now redundant — it can be deleted. The legacy Vercel
project **`aalvis`** should also be deleted (see top).

### Optional later upgrade — SSR mode
If you want real server-side form delivery instead of the WhatsApp/endpoint handoff:

1. Remove `output: "export"` from `next.config.mjs` and restore `src/middleware.ts` +
   `src/app/api/{enquiry,newsletter}` (deleted for the static export; recoverable from history).
2. Vercel → Settings → General → Framework **Next.js**, Install **`npm install`**, Build **`next build`**,
   Output Directory **empty**.

### Environment variables (project `aalvis-site`)
| Var | Current value | Purpose |
|---|---|---|
| `NODE_VERSION` | `22.x` | build runtime |
| `NEXT_PUBLIC_SITE_URL` | `https://aalvis-site.vercel.app` | canonicals, hreflang, OG, sitemap |
| `NEXT_PUBLIC_WHATSAPP` | *(not set — placeholder `919876543210` baked in)* | **set the real number, digits only** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | *(not set — placeholder `hello@aalvis.example`)* | **set the real inbox** |
| `NEXT_PUBLIC_FORM_ENDPOINT` | *(not set)* | optional: Formspree/etc. URL for email delivery of enquiries |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | *(not set)* | optional: ESP list-subscribe URL |

Env vars are read at **build time** — after changing one, push an empty commit or hit Redeploy.

### Other build notes
- Images: `next/image` uses a custom loader (`src/lib/wm-loader.ts`) rewriting Wikimedia Commons originals to
  their thumbnail CDN at the requested width — responsive srcsets without Vercel's image optimizer.
- Forms: static export has no API routes. Enquiry/newsletter forms validate client-side (regex, honeypot,
  timing trap), then either POST to a configured public endpoint or perform an **honest WhatsApp click-to-chat
  handoff** with the composed, localized message. Nothing is ever simulated.
- `trailingSlash: true` is required — without it, exported locale folders 404 on Vercel.

## Updating the site

**Normal workflow:** change files in `aalvis-next/` → copy them into the repo folder → push.

```bash
cd aalvis-next && npm run build      # sanity-check locally (out/ = 37 HTML files)
```

With local Git credentials:
```bash
cd aalvis-next && git add -A && git commit -m "update" && git push origin main
```

Without Git credentials (GitHub web UI): upload the changed files into
`aalvis-next-source/…` keeping the same paths — the push auto-deploys.

**Via the Vercel connector** (used when no Git credentials are available in this workspace):
`create_deployment` with `git_source {type: "github", repoId: "1468091782", ref: "main"}`,
`project_settings` matching the table above, `target: "production"`.

> The temporary `uguu.se` snapshot pipeline is **retired** — those links expire within hours and no build
> depends on them any more.

## Before public launch (client inputs required)
- Real WhatsApp business number + real contact email (env vars above).
- Approved customer testimonials — current ones are **PLACEHOLDER samples**.
- Legal entity, registered address, jurisdiction in the legal pages (`src/lib/legal.ts` — marked `[CLIENT …]`).
- Replace Wikimedia Commons imagery with owned campaign photography (licence credits: `/en/legal/image-credits/`).
- Optional custom domain: Vercel → project → Settings → Domains (DNS: `A 76.76.21.21` or
  `CNAME cname.vercel-dns.com`).
- If the dashboard ever shows a login wall for `*.vercel.app` URLs: Settings → Deployment Protection → turn off
  "Vercel Authentication". (The live production alias currently serves publicly — verified.)
