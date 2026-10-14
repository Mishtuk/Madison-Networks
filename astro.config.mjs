import { defineConfig } from 'astro/config';

// Launch = env change: SITE=https://madisonnetworkservices.com BASE=/ npm run build (defaults are the GitHub Pages preview).
export default defineConfig({
  site: process.env.SITE ?? 'https://mishtuk.github.io',
  base: process.env.BASE ?? '/Madison-Networks',
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
