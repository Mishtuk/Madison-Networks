# Madison Network Services website: handoff

This is a rebuild of https://madisonnetworkservices.com (currently a one-page WordPress site on the Astrid theme, served from madisonworldwide.net) for desktop and mobile.

- **Preview (live):** https://mishtuk.github.io/Madison-Networks/. It redeploys automatically on every push to `main`.
- **Repo:** https://github.com/Mishtuk/Madison-Networks. The local copy is `V:\MadisonNetworks`.
- **Commits:** authored as `Mish <113945444+Mishtuk@users.noreply.github.com>`, set in the repo's git config.
- **Status (2026-10-14):** the first full build is live on the preview. All pages are built from `docs/design.md`. Lighthouse mobile scores 100/100/100/100 on Home and Contact, and there are 0 broken links. Next: the client input listed below.

## The company (facts from the live site only)
- **Name on the site:** Madison Network Services. The original copy also says "Madison WorldWide" / "Madison Worldwide", and the domain is madisonworldwide.net. The brand is **Madison Network Services**, and this site is only about that business.
- **Tagline:** "Philadelphia Area Fiber Optic Solutions Provider".
- **Location:** Warminster, PA 18974.
- **Email:** contactus@madisonworldwide.net.
- **Phone:** none listed. Don't invent one; use "Contact us" until the client provides it.
- **Service area:** primarily Philadelphia and the surrounding areas, with options nationwide.
- **Works with:** customers directly, their technicians, or their Network Operations Centers (NOC). Works closely with local ISP and telecom companies.
- **Services:**
  1. **Fiber optic splicing and termination:**
     - OSP and ISP fiber splicing
     - loose tube and ribbon fiber splicing
     - point-to-point splicing connections
     - ring configuration splicing connections
     - small fiber placements and lashing
     - splicing customers in and out of live networks
     - re-entering existing fiber splice cases: mid-sheath entries (ring cuts/splices) and butt splices
  2. **Fiber optic cable testing and certification:**
     - fiber optic network audits
     - reel testing
  3. **Emergency restoration:**
     - troubleshooting
     - identification of the damage location
     - repair service
     - 24x7 rapid response support
- The original copy is in `source/original-home.html`. Port its wording faithfully, fixing only typos and the stray `�` characters.
- **Never invent** years in business, certifications, client names, testimonials, project counts, crews or prices. Unknown means "Contact us" or leave it out.

## Brand (keep the original site's colours)
| Token | Value | Use |
|---|---|---|
| charcoal | `#202529` | header (90% opacity on the original), footer, dark bands |
| sand / accent | `#fcd088` | the Astrid accent: links, buttons, highlights on dark backgrounds |
| body text | `#656d6d` | body copy on light backgrounds |
| muted | `#bdbdbd` | tagline and secondary text on dark backgrounds |
| light | `#f2f2f3` / `#ffffff` | light section backgrounds |
- `#fcd088` fails contrast as text on light backgrounds. Make a darker "sand-ink" token for that case (the same idea as Riverside's `--gold-ink`). `#656d6d` on white is borderline, so check it for AA and darken it slightly if needed.
- **Fonts:** Josefin Sans for headings and Open Sans for body, as on the original. Both are OFL licensed, so self-host the woff2 files.
- **Imagery:** the fiber-optic light burst (blue, cyan and magenta on black). Use it in the hero and as the visual motif.
  - `source/hero-original.jpg` is 4288×2848 landscape, from Unsplash (Umberto, free to use).
  - The burst sits at about (0.50, 0.52). Crops are in `public/media/`: `hero-wide-*` is 16:9 and `hero-tall-*` is 9:16.
- **Logo:** none exists. The original uses the text title. Make a clean wordmark in Josefin Sans; don't invent a symbol.

## Look and feel
Use **Riverside** (`V:\RiversideWebsite`, live at https://mishtuk.github.io/Riverside-Website/) as the reference for overall feel and quality.
- calm, spacious layout
- strong typography
- a full-bleed hero
- clear section rhythm
- a mobile-first, app-like phone experience with a bottom action bar and a full-screen menu
- native view transitions, with all motion off under reduced motion
- Lighthouse in the high 90s
- **Not** Riverside's cream/gold church palette. Madison stays charcoal, sand and white with the fiber imagery.

This is a B2B contractor site. A visitor (an ISP or telecom project manager, NOC staff, or a business owner) has three jobs, in this order:
1. Can they do my job? (services)
2. Do they cover my area? (Philadelphia, plus nationwide)
3. How do I reach them, fast if it's an outage? (contact and emergency restoration)

## Pages
- **`/` Home:**
  - hero (tagline, primary "Request service" CTA, secondary "Emergency restoration")
  - the three service lines as cards
  - who we work with (ISPs, telecoms, NOCs, businesses)
  - service area (Philadelphia region plus nationwide)
  - a 24/7 emergency restoration band
  - about
  - contact CTA
- **`/services`:** all three service lines in full, each with an anchor (`#splicing`, `#testing`, `#restoration`).
- **`/about`:** the About Us copy, how the company works (direct, with your technicians, or with your NOC), and the service area.
- **`/contact`:** a quote/service request form with the original fields: first and last name, company, email, phone, and message. Add a service-type select. The email and location sit next to the form.
- **`404`**.

## Stack (same as Riverside)
- **Astro**, static output. Plain CSS (`src/styles/global.css` plus component `<style>` blocks). No client framework; only small inline scripts. No new npm dependencies unless really needed.
- **Facts:** company facts and nav live in `src/lib/site.ts` only. Never hard-code them in pages. Use base-aware links through `href()`.
- **Config:** `astro.config.mjs` with `BASE` defaulting to `/Madison-Networks` and `SITE` to `https://mishtuk.github.io`, plus `build.inlineStylesheets: 'always'`.
- **Hosting:** GitHub Pages via `.github/workflows/deploy.yml` (already in the repo). Pages source = "GitHub Actions".
- **Per page:** sitemap, robots.txt, manifest and icons, Open Graph and a social image, and LocalBusiness JSON-LD on Home with only real fields.
- **Contact form:** there is no backend yet.
  - For now the form builds a `mailto:` to contactus@madisonworldwide.net with the fields filled in, and the email address is always visible as plain text.
  - Swapping in a form service (Formspree, Web3Forms or similar) is a one-line `action` change once the client picks one.

## Quick start
```
npm install
npm run dev       # http://localhost:4321/Madison-Networks/
npm run build
npm run preview
```

## Quality bar
- WCAG AA contrast. Keyboard usable. Works without JavaScript (except the mailto prefill).
- Tuned at 360, 390 and 430px, at 768px, and on desktop. No horizontal scroll. Tap targets are at least 44px. Form inputs are at least 16px.
- Lighthouse mobile at 95 or above in every category. 0 broken links.

## Still needed from the client
- A phone number, especially for emergency restoration.
- A logo, if one exists.
- Real job photos: crews, splice trailers, OTDR testing, aerial and underground work.
- Certifications (for example FOA/CFOT), insurance, years in business, and client or partner logos that may be shown.
- Which name to lead with: "Madison Network Services" or "Madison WorldWide". The domain to launch on: madisonnetworkservices.com.
- Where form submissions should go, and whether to use a form service.

## Launching on madisonnetworkservices.com (after the client approves)
1. In the deploy workflow, set the build env to `SITE=https://madisonnetworkservices.com` and `BASE=/`.
2. Add `public/CNAME` containing the domain, and set the custom domain under Settings → Pages. Enforce HTTPS.
3. DNS: point a `www` CNAME at `mishtuk.github.io` and add the apex A records 185.199.108.153, .109.153, .110.153 and .111.153.

## Out of scope unless requested
A CMS or logins, a blog, a customer portal, online payments, or live chat.
