import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { withBase } from '../data/site';

export const GET: APIRoute = async ({ site }) => {
  const preview = import.meta.env.SITE_MODE !== 'production';
  const conditions = (await getCollection('conditions')).filter((item) => item.data.status === 'published');
  const studies = (await getCollection('studies')).filter((item) => item.data.status === 'published');
  const doctors = (await getCollection('doctors')).filter((item) => item.data.status === 'published');

  const routes = preview ? [] : [
    '/',
    '/padecimientos/',
    ...conditions.map((item) => `/padecimientos/${item.id}/`),
    '/estudios/',
    ...studies.map((item) => `/estudios/${item.id}/`),
    '/especialistas/',
    ...doctors.map((item) => `/especialistas/${item.id}/`),
    '/nosotros/',
    '/recursos/',
    '/recursos/eventos/',
    '/pacientes/guia-para-tu-cita/',
    '/contacto/'
  ];

  const urls = routes
    .map((path) => `<url><loc>${new URL(withBase(path), site)}</loc></url>`)
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
