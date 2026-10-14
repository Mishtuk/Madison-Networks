import { defineConfig } from 'astro/config';

// Launch = set SITE=https://madisonnetworkservices.com and BASE=/ (repo variables in CI). Unset or empty = the GitHub Pages preview.
export default defineConfig({
  site: process.env.SITE || 'https://mishtuk.github.io',
  base: process.env.BASE || '/Madison-Networks',
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
