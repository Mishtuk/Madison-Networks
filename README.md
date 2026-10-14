# Madison Network Services

Website for Madison Network Services, a fiber optic contractor in Warminster, PA, serving the Philadelphia area.

- **Preview:** https://mishtuk.github.io/Madison-Networks/ (redeploys on every push to `main`)
- **Full reference:** [HANDOFF.md](HANDOFF.md) covers facts, design, structure, launch steps and open items.
- **Layout spec:** [docs/design.md](docs/design.md)

## Run it locally
Requires Node 22.12 or newer.

```
npm install
npm run dev       # http://localhost:4321/Madison-Networks/
npm run build     # static site in dist/
```

## Common edits
- Company facts (email, address, services, phone): `src/lib/site.ts`. Pages read from it.
- Colours and styles: `src/styles/global.css`
- Page content: `src/pages/*.astro`

## Going live on madisonnetworkservices.com
Follow "Launching" in [HANDOFF.md](HANDOFF.md). In short: point the domain's DNS at GitHub Pages, set the repo variables `SITE` and `BASE`, and set the custom domain in Settings → Pages.
