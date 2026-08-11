import type { APIRoute } from 'astro'; import { absoluteUrl } from '../config/domains';
const names=['pages','services','locations','blog','media'];
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${names.map((name)=>`<sitemap><loc>${absoluteUrl(`/sitemap-${name}.xml`)}</loc></sitemap>`).join('')}</sitemapindex>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
