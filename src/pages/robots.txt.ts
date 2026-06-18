import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const preview = import.meta.env.SITE_MODE !== 'production';
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nDisallow: /*?u=\nSitemap: ${new URL('/sitemap.xml', site)}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
