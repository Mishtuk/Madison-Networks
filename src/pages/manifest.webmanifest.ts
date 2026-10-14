import type { APIRoute } from 'astro';
import { COMPANY, href } from '../lib/site';

// Generated so start_url/scope/icons follow the BASE env switch at domain launch.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: COMPANY.name,
      short_name: 'Madison Network',
      start_url: href('/'),
      scope: href('/'),
      display: 'standalone',
      background_color: '#202529',
      theme_color: '#202529', // matches <meta name="theme-color"> in Base.astro
      icons: [
        { src: href('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: href('/icon-512.png'), sizes: '512x512', type: 'image/png' },
        { src: href('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' },
        { src: href('/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
