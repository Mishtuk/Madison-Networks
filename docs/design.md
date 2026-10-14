# Madison Network Services: design spec

Designer's spec for the coder. All styling lives in `src/styles/global.css`. Components need **markup only**: no `<style>` blocks unless something here is missing (then ask the designer). Every class named below already exists in global.css.

**Design read:** a B2B contractor site for ISP/telecom PMs, NOC staff and business owners. The language is calm, engineered and trust-first: light pages, charcoal bands, one sand accent, and the fiber light-burst as the only imagery. Dials: variance 5, motion 4, density 4.

## 1. Tokens and rules

| Token | Value | Contrast (WCAG 2.x, computed) | Use |
|---|---|---|---|
| `--charcoal` | #202529 | white 15.46, #f2f2f3 13.82 | header, footer, dark bands, headings on light |
| `--charcoal-2` | #2a3035 | sand 9.23, #bdbdbd 7.11 | raised surfaces on dark |
| `--sand` | #fcd088 | on charcoal 10.69; on white **1.45 (never text on light)** | buttons, rules, text and focus on dark |
| `--sand-soft` | #fde3b5 | charcoal on it 12.39 | sand-button hover, chip hover |
| `--sand-ink` | #80560c | white 6.45, #f2f2f3 5.77 | sand-family text, links, ticks and focus ring on light |
| `--text` | #5d6565 | white 5.97, #f2f2f3 5.34 | body on light. Brand #656d6d measured 5.30 on white but only 4.74 on #f2f2f3, so it is darkened one notch (the difference is barely visible). |
| `--muted-dark` | #bdbdbd | charcoal 8.23 | secondary text on dark |
| `--field-border` | #848b8b | white 3.47, #f2f2f3 3.10 | input borders (non-text needs 3:1) |
| `--error` | #b42318 | white 6.57 | required `*`, field errors |

- **Buttons:** `.btn` (sand) goes on dark backgrounds and over the photo. `.btn-dark` is the primary on light backgrounds. `.btn-light` is the secondary on dark or photo; `.btn-outline` is the secondary on light.
- **Shape rule:** buttons and inputs are 6px, cards and media are 12px. Pills are only for `.chips`, `.svc-tag`, `.ring-label` and the bottom-bar active icon.
- **One CTA label per intent:** the contact intent is always **"Request service"** (header, hero, CTA bands, menu). The form's submit button reads "Send request".
- **Eyebrows** (`.eyebrow`) are rationed to at most 1 per 3 sections. On Home they appear only in the hero and the service area. On inner pages they appear only in the page head.
- **No em or en dashes** in any copy, alt text or titles. Use a hyphen, colon or full stop.
- **Fonts:** only 4 files exist, so never set Open Sans to 700 (global.css maps `b`/`strong` to 600). Headings use Josefin 700, and eyebrows, nav and labels use Josefin 600 caps.
- **Theme:** light pages with deliberate charcoal bands (hero, emergency, footer), the same as the original. There's no dark-mode toggle; that's out of scope.

### Fonts in Base.astro
Keep the four `face(...)` lines. **Replace the two approximate fallback lines** with these. They are measured from the actual woff2 files against Arial with fontTools; both fonts set USE_TYPO_METRICS, so typo metrics are the ones used. The weight ranges stop the browser from synthesizing bold on top of Arial Bold.
```js
"@font-face{font-family:'Josefin Fallback';font-weight:700;src:local('Arial Bold'),local('Arial-BoldMT');size-adjust:100.28%;ascent-override:74.79%;descent-override:24.93%;line-gap-override:0%}",
"@font-face{font-family:'Josefin Fallback';font-weight:600;src:local('Arial Bold'),local('Arial-BoldMT');size-adjust:96.63%;ascent-override:77.62%;descent-override:25.87%;line-gap-override:0%}",
"@font-face{font-family:'Open Sans Fallback';font-weight:400;src:local('Arial'),local('ArialMT');size-adjust:105.27%;ascent-override:101.53%;descent-override:27.83%;line-gap-override:0%}",
"@font-face{font-family:'Open Sans Fallback';font-weight:600;src:local('Arial Bold'),local('Arial-BoldMT');size-adjust:100.72%;ascent-override:106.12%;descent-override:29.09%;line-gap-override:0%}",
```
Keep the two existing preloads (josefin-700 and open-sans-400) and remove the `TEMP-NOCSS` comment so global.css is imported.

### Imagery
- `source/hero-original.jpg` is actually **4288×2848 landscape** (HANDOFF says portrait, which is wrong). The burst center sits at 51% / 52%.
- The coder's existing `hero-wide-*` (16:9) and `hero-tall-*` (9:16) crops are fine. global.css positions them with `object-position` (tall: `50% 30%`).
- Optional refinement for desktop: a wide crop at x0=0, y0=570, 3200×1800 puts the burst at 68% x, away from the headline. Only do it if the hero looks crowded.
- The same wide file is reused everywhere (hero, page heads, restoration card, emergency band, 404), so it's one cached download. Below the fold, use `loading="lazy" decoding="async"` and `alt=""`, because the image is decorative.
- Icons are **Phosphor, regular weight**, with the SVG pasted inline. Copy each one from `https://unpkg.com/@phosphor-icons/core@2.1.1/assets/regular/<name>.svg`. That's an MIT copy-paste, not a dependency. Use `viewBox="0 0 256 256" aria-hidden="true"`, no width/height attributes, and global.css sets the fill.

## 2. Global chrome

### Header (`Header.astro`, prop `overlay` on Home only)
```html
<!-- overlay only --> <div class="header-sentinel" aria-hidden="true"></div>
<header class="site-header [is-overlay]" [data-overlay]>
  <div class="container header-bar">
    <a class="wordmark" href={href('/')} aria-label="Madison Network Services home">
      <span class="wordmark-name">Madison</span><span class="wordmark-sub">Network Services</span>
    </a>
    <nav class="nav-desktop" aria-label="Main"><ul>{NAV: <li><a aria-current>..</a></li>}</ul></nav>
    <div class="header-actions">
      <a class="btn btn-sm" href={href('/contact')}>Request service</a>
      <details class="nav-mobile">
        <summary><span class="burger" aria-hidden="true"><span></span></span><span class="menu-label">Menu</span></summary>
        <div class="sheet">
          <nav aria-label="Main menu"><ul>
            <li><a href="/">Home</a></li> {NAV items} <!-- Home is included in the sheet only -->
          </ul></nav>
          <div class="sheet-info">
            <p>Emergency restoration: 24x7 rapid response support</p>
            <a href="mailto:{email}">{email}</a>
            <p>{city}, {region} {zip}. Primarily Philadelphia and the surrounding areas, with options nationwide.</p>
            <a class="btn" href={href('/contact')}>Request service</a>
          </div>
        </div>
      </details>
    </div>
  </div>
</header>
```
- Use Riverside's two inline scripts verbatim: the menu focus/Escape/close-on-tap script, and the IntersectionObserver that toggles `is-fixed`/`is-solid`.
- The header is always charcoal. On Home it starts transparent over the hero and turns solid charcoal on scroll, so the wordmark never needs inverting.
- The desktop nav shows at 1024px and up; below that, the Menu sheet is used. Below 700px the header button hides because the bottom bar carries the actions.
- The wordmark is text only, with no symbol, and it doubles as the logo until the client supplies one.

### Phone bottom bar (`MobileBar.astro`, under 700px): **Services · Emergency · Email · Contact**
| Item | href | Phosphor icon | Notes |
|---|---|---|---|
| Services | `/services` | `toolbox` | `aria-current` on /services |
| Emergency | `/contact?type=restoration` | `siren` | add `class="is-urgent"` (always sand) |
| Email | `mailto:{email}` | `envelope-simple` | the only direct line today |
| Contact | `/contact` | `chat-centered-text` | `aria-current` on /contact |

- **When `COMPANY.phone` is set**, render "Call" (`tel:`, Phosphor `phone`) in place of Email. Write that as a conditional in the component now, so the client's number goes live with a one-line site.ts change.
- Markup: `<nav class="mobile-bar" aria-label="Quick actions"><a ...><svg/><span>Label</span></a>...</nav>`.
- Reuse Riverside's hide-on-scroll-down script verbatim (rAF-throttled and passive, so it is acceptable).
- Why this choice: the visitor's jobs are "can they do it" (Services), "outage" (Emergency) and "reach them" (Email or Contact). Area is one tap away in the menu and sits on Home and About, so it doesn't earn a slot.

### Footer (`Footer.astro`)
```html
<footer class="site-footer"><div class="container">
  <div class="footer-grid">
    <div class="footer-brand"><a class="wordmark" ...>(same as header)</a><p>{COMPANY.tagline}</p></div>
    <div class="footer-col"><h2>Services</h2><ul>
      <li><a href="/services#splicing">Splicing and termination</a></li>
      <li><a href="/services#testing">Testing and certification</a></li>
      <li><a href="/services#restoration">Emergency restoration</a></li></ul></div>
    <div class="footer-col"><h2>Company</h2><ul><li>About</li><li>Contact</li></ul></div>
    <div class="footer-col"><h2>Contact</h2><ul>
      <li><a href="mailto:">{email}</a></li><li><span>{city}, {region} {zip}</span></li>
      <li><span>Philadelphia area, options nationwide</span></li></ul></div>
  </div>
  <div class="footer-bottom"><span>&copy; {year} {COMPANY.name}</span><span>Fiber optic splicing, testing and restoration</span></div>
</div></footer>
```
The footer's bottom padding already clears the phone bar (`--bar-h`).

### Inner-page head (`PageHead.astro`: props `eyebrow`, `title`, `lede`)
```html
<section class="page-head">
  <div class="page-head-media" aria-hidden="true"><picture>(hero-wide 960/1920, alt="", fetchpriority="high")</picture></div>
  <div class="container"><p class="eyebrow">{eyebrow}</p><h1>{title}</h1><p class="lede">{lede}</p></div>
</section>
```
It's a charcoal band with the burst bleeding off the right (full width and dimmed on phones). The `.page-head .eyebrow` is sand because the band is dark; add `on-dark` to the section class so eyebrows and links pick up dark styling.

### Motion
- Hero copy: `.fade-up` with `style="--i:0..3"`.
- Key blocks below the fold get `.reveal`: the svc-grid, who-grid, area-rings, emergency-steps and about-cols. Don't use it on headings.
- View transitions, the hero/page-head image settle, and the sheet slide-in are already in CSS.
- Everything is gated on `prefers-reduced-motion: no-preference`, and there is a global reduce override.

## 3. Home `/` (seven sections, in this order)

1. **Hero:** `<section class="hero" aria-labelledby="hero-title">`
   ```html
   <div class="hero-media" aria-hidden="true"><picture>
     <source media="(max-width: 699px) and (orientation: portrait)" type="image/avif" srcset={photo('tall').avif} sizes="100vw">
     <source media="(max-width: 699px) and (orientation: portrait)" type="image/webp" srcset={photo('tall').webp} sizes="100vw">
     <source type="image/avif" srcset={photo('wide').avif} sizes="100vw"><source type="image/webp" srcset={photo('wide').webp} sizes="100vw">
     <img src={photo('wide').src} alt="" width="1920" height="1080" fetchpriority="high" decoding="async"></picture></div>
   <div class="container hero-content">
     <p class="eyebrow fade-up">{COMPANY.tagline}</p>
     <h1 id="hero-title" class="hero-title fade-up" style="--i:1">Fiber splicing, testing and <span class="accent">restoration</span></h1>
     <p class="hero-sub fade-up" style="--i:2">{COMPANY.name} works with ISPs, telecoms, NOCs and businesses across the Philadelphia area, with options nationwide.</p>
     <div class="btn-row fade-up" style="--i:3"><a class="btn" href="/contact">Request service</a>
       <a class="btn btn-light" href="/contact?type=restoration">Emergency restoration</a></div>
   </div>
   <div class="hero-strip"><div class="container strip-inner">
     <p><strong>{city}, {region}.</strong> Serving the Philadelphia area, with options nationwide.</p>
     <a href="mailto:{email}">{email}</a></div></div>
   ```
   The strip's email hides on phones because the bottom bar has it. The H1 is 2 lines at 1280px, as checked in a headless render.
2. **Services:** `<section class="section band-white" aria-labelledby="services-title">`. Use a `.section-head` with `<h2 class="h2">Our services</h2>` and the original sentence "At Madison we provide a professional experience to assist you with your needs as quickly as possible."

   Then a `.svc-grid` with **3 cells**: splicing spans the full width on top, with testing and restoration side by side below (1fr : 1.35fr). Each cell is an `<article>` built from `SERVICES`:
   - `card svc-card svc-card--main`: h3, `<ul class="checklist cols-2">` (7 items), and `<a class="link link-arrow" href="/services#splicing">View splicing services</a>`
   - `card svc-card svc-card--alt`: h3, `ul.checklist`, link "View testing services"
   - `card svc-card svc-card--dark`: `<div class="svc-card-media" aria-hidden="true"><img wide-960 lazy alt=""></div>`, `<span class="svc-tag">24x7</span>`, h3, `ul.checklist cols-2`, link "View restoration"
3. **Who we work with:** `<section class="section band-light">`. Use a `.section-head` with h2 "Who we work with" and the original "We can work directly with you, your technicians or your Network Operations Centers (NOC)." Then `<ul class="who-grid" role="list">` with 4 × `<li class="who-item"><svg/><h3/><p/></li>`. Every line comes from the original copy:
   | Phosphor icon | h3 | p |
   |---|---|---|
   | `cell-tower` | ISPs and telecom companies | We work closely with local ISP and telecom companies. |
   | `monitor` | Network Operations Centers | We can work with your NOC directly. |
   | `hard-hat` | Your technicians | We can work alongside your own technicians. |
   | `buildings` | Businesses | Fiber optics solutions for businesses throughout Philadelphia and the surrounding areas. |
4. **Service area** (`ServiceArea.astro`, reused on About, `id="area"`): `<section class="section band-white" id="area"><div class="container split">`
   - Left column:
     - `<p class="eyebrow">Service area</p>`
     - `<h2 class="h2">Philadelphia area first, with options nationwide</h2>`
     - `<p>` "Our services are available primarily throughout the Philadelphia area, however we do offer options nationwide."
     - `<ul class="area-facts" role="list">` with three items:
       - `<strong>Based in {city}, {region} {zip}</strong>`
       - `<strong>Primarily Philadelphia and the surrounding areas</strong>`
       - `<strong>Options nationwide</strong>Ask about your location.`
     - Use `margin-top` on the h2 and p via the `.stack` wrapper: `<div class="stack">`.
   - Right column, the diagram (CSS only, no map):
     ```html
     <figure class="area-rings" role="img" aria-label="Based in Warminster, PA, serving the Philadelphia area first, with options nationwide.">
       <div class="ring ring-nation"><span class="ring-label">Options nationwide</span></div>
       <div class="ring ring-region"><span class="ring-label">Philadelphia area</span></div>
       <div class="ring-hub"><span>{city}, {region}</span></div>
     </figure>
     ```
     The rings imply no distances or counties, so nothing is invented. The sand hub echoes the light burst.
5. **24/7 emergency restoration band:** `<section class="section band-dark band-emergency" id="emergency" aria-labelledby="emergency-title">`
   ```html
   <div class="band-media" aria-hidden="true"><img wide-1920 lazy alt=""></div>
   <div class="container emergency-inner">
     <div><h2 id="emergency-title">Fiber down? <span class="accent">24x7</span> rapid response.</h2>
       <p class="lede" style="margin-top:1rem">Emergency restoration, from troubleshooting to repair.</p>
       <div class="btn-row" style="margin-top:2rem"><a class="btn" href="/contact?type=restoration">Request emergency service</a>
         {phone && <a class="btn btn-light" href="tel:">Call {phone}</a>}</div>
       <p class="emergency-note">Or email <a class="text-link" href="mailto:">{email}</a></p></div>
     <ul class="emergency-steps" role="list">
       <li><svg magnifying-glass/>Troubleshooting</li><li><svg map-pin/>Identification of the damage location</li>
       <li><svg wrench/>Repair service</li><li><svg clock/>24x7 rapid response support</li></ul>
   </div>
   ```
   Move the inline `style` margins into a `.stack` if you prefer.
6. **About:** `<section class="section band-light"><div class="container">`
   - `<h2 class="sr-only">About us</h2>`
   - `<p class="about-lede">`: original paragraph 1, with **COMPANY.name in place of "Madison WorldWide"** (see open question 1).
   - `<div class="about-cols">`: original paragraphs 2 and 3. Fix the grammar in "Each of our technicians are" to "is". It's a typo-level fix, so it's allowed.
   - `<p><a class="link link-arrow" href="/about">More about us</a></p>`
7. **Contact CTA:** `<section class="section band-white cta-band"><div class="container">`
   - h2 "Tell us about your next fiber job"
   - `<p>`Send the details through the form, or email `<a class="text-link">{email}</a>`.`</p>`
   - `.btn-row` containing `<a class="btn btn-dark" href="/contact">Request service</a>`

## 4. `/services`
- **PageHead:** eyebrow "Services", title "Fiber optic services", lede "We can work directly with you, your technicians or your Network Operations Centers (NOC)."
- **Subnav:** `<nav class="subnav" aria-label="On this page"><div class="container"><ul class="chips">`. Three chips link to `#splicing`, `#testing` and `#restoration`, with the labels "Splicing and termination", "Testing and certification" and "Emergency restoration". The sections must directly follow `.subnav` as siblings so `scroll-margin` applies.
- **One section per service**, alternating bands: `#splicing` is `band-white`, `#testing` is `band-light`, and `#restoration` is `band-dark band-emergency` (with `.band-media` image).
  ```html
  <section class="section band-white" id="splicing" aria-labelledby="splicing-title"><div class="container svc-section">
    <div class="svc-section-head"><h2 id="splicing-title">{title}</h2>
      <div class="btn-row"><a class="btn btn-dark" href="/contact?type=splicing">Request service</a></div></div>
    <ul class="svc-items" role="list">{items: <li>..</li>; add class="wide" to the long "Re-entering existing fiber splice cases" item}</ul>
  </div></section>
  ```
  In the restoration section, the button is `.btn` (sand) and goes to `?type=restoration`. Put `<span class="svc-tag">24x7</span>` above its h2, and the "Or email" line under the button.
- **Close the page** with the same CTA band as Home, but on `band-light`.
- Don't write descriptions for services; the original only has the lists. When the client sends real job photos, each `.svc-section-head` can take a `.media` image under the button.

## 5. `/about`
- **PageHead:** eyebrow "About us", title "Fiber optic experts in the Philadelphia area" (from the original "We are experts in fiber optics"), lede `{COMPANY.tagline}`.
- **`band-white`:** the about copy, `.about-lede` plus `.about-cols`, with all three original paragraphs.
- **`band-light`, "How we work":**
  - `.section-head` with h2 "How we work" and the p "At Madison we provide a professional experience to assist you with your needs as quickly as possible."
  - `<ul class="ways" role="list">` with 3 × `<li><h3>..</h3><p>..</p></li>`:
    - h3 "Directly with you", p "Bring the job straight to us."
    - h3 "With your technicians", p "We can work alongside your own technicians."
    - h3 "With your NOC", p "We can coordinate with your Network Operations Center."
  - Then a `<p class="lede" style="margin-top:2rem">`: "We work closely with local ISP and telecom companies."
- **ServiceArea** component (white band, as on Home).
- **CTA band** on `band-light`.

## 6. `/contact`
- **PageHead:** eyebrow "Contact", title "Request service", lede "Tell us about the job and how to reach you."
- Then: `<section class="section band-white"><div class="container contact-layout">`
- **Form** (left), `<form class="form" id="request" action="mailto:{email}" method="post" enctype="text/plain">`
  ```html
  <p class="form-note">Fields marked <span class="req" aria-hidden="true">*</span> are required.</p>
  <fieldset class="field"><legend>Name <span class="req" aria-hidden="true">*</span></legend>
    <div class="form-row">
      <div class="field"><label for="first">First</label><input id="first" name="first_name" autocomplete="given-name" required></div>
      <div class="field"><label for="last">Last</label><input id="last" name="last_name" autocomplete="family-name" required></div>
    </div></fieldset>
  <div class="field"><label for="company">Company name</label><input id="company" name="company" autocomplete="organization"></div>
  <div class="form-row">
    <div class="field"><label for="email">Email <span class="req" aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div>
  </div>
  <div class="field"><label for="type">Service type</label>
    <select id="type" name="service">
      <option value="splicing">Fiber optic splicing and termination</option>
      <option value="testing">Fiber optic cable testing and certification</option>
      <option value="restoration">Emergency restoration</option>
      <option value="other" selected>Something else</option></select></div>
  <div class="field"><label for="msg">Comment or message <span class="req" aria-hidden="true">*</span></label>
    <textarea id="msg" name="message" required aria-describedby="msg-hint"></textarea>
    <p class="field-hint" id="msg-hint">Helpful details: site address, cable type (loose tube or ribbon), fiber count and timing.</p></div>
  <div class="form-actions"><button class="btn btn-dark" type="submit">Send request</button>
    <p class="form-note">This opens your email app with the details filled in.</p></div>
  ```
  - The labels come from the original: Name (First/Last), Company Name, Email, Phone Number, Comment or Message.
  - **Inline script** (progressive enhancement; without JS, the plain `mailto:` action still works):
    1. Read `?type=` from the URL and preselect that option.
    2. On submit, run `preventDefault`, check `form.reportValidity()`, then build `location.href = 'mailto:' + email + '?subject=' + enc(subject) + '&body=' + enc(lines)`.
    3. The subject is `Service request: {service label} - {company or name}`. When the type is restoration, it's **`URGENT: Emergency restoration - {company or name}`**, so outages stand out in the inbox.
    4. The body is one `Label: value` line per field, then a blank line, then the message.
  - To swap in a form service later, change `action`/`method` and drop the script.
- **Aside** (right), `<aside class="contact-aside">`:
  - `<div class="contact-card on-dark"><h2>Emergency restoration</h2><p>24x7 rapid response support. Choose "Emergency restoration" above and your email is marked urgent.</p>{phone && tel link}</div>`
  - `<div class="contact-card"><h2>Email</h2><div class="contact-email"><a class="text-link" href="mailto:">{email}</a><button class="copy-btn" type="button" hidden>Copy</button></div></div>`. The copy script: un-hide the button when `navigator.clipboard` exists. On click, write the email, then set the label to "Copied" for 2s. NOC staff paste addresses into tickets.
  - `<div class="contact-card"><h2>Location</h2><p>{city}, {region} {zip}</p><p>Primarily Philadelphia and the surrounding areas, with options nationwide.</p></div>`

## 7. `404`
```html
<section class="notfound on-dark"><div class="band-media" aria-hidden="true"><img wide-960 alt=""></div>
  <div class="container"><p class="eyebrow">Error 404</p><h1>Page not found</h1>
  <p>That link may be out of date or mistyped.</p>
  <div class="btn-row"><a class="btn" href="/">Back to home</a><a class="btn btn-light" href="/services">Our services</a></div></div></section>
```

## 8. Favicon, app icon and OG image
- **Favicon and app icons:** a "M" in Josefin Sans 700, sand #fcd088, on a charcoal #202529 square (rounded about 22% for the 512 icon; full-bleed for maskable, with the M inside the 80% safe zone). There's no other mark. `theme-color` is #202529 (already set).
- **OG image (1200×630, `public/media/og.jpg`):**
  - Background: the wide crop with the burst on the right two-thirds, and a charcoal gradient from the left (as in `.page-head-media`).
  - Left: the wordmark lockup ("Madison" Josefin 700 white at about 96px, "NETWORK SERVICES" Josefin 600 sand, tracked 0.32em), and below it the tagline in Open Sans at about 30px, #bdbdbd.
  - Keep text 64px from the edges. Export as JPEG at about q80, under 200KB.

## 9. Feature ideas included above (all fact-safe)
1. The `?type=` prefill, plus an `URGENT:` subject for restoration requests, so outages are flagged in the inbox without a backend.
2. Phone-ready slots. Once `COMPANY.phone` is set, the bottom-bar Email becomes Call, and a Call button appears in the emergency band and the contact aside, with no redesign.
3. A copy-email button for NOC staff.
4. A "Helpful details" hint on the message field (site address, cable type, fiber count, timing). It guides the PM and makes no claim about the company.
5. Print styles (already in CSS), so a PM can print /services as a clean scope sheet.
6. JSON-LD: extend the LocalBusiness on Home with `hasOfferCatalog`, listing the three SERVICES titles as `Offer` → `Service` names. These are real facts only.

**Add later, when the client supplies the material:** a credentials strip (certifications, insurance) under the services, real job photos in `.svc-section-head`, and a logo in place of the wordmark.

## 10. Open questions for the boss or client
1. Which name to use in the copy: the original paragraph says "Madison WorldWide". The spec uses `COMPANY.name` (Madison Network Services) everywhere. Confirm with the client.
2. HANDOFF says the hero source is portrait, but it's landscape (4288×2848). Update HANDOFF.
