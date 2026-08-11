import type { APIRoute } from 'astro'; import { absoluteUrl } from '../config/domains';
const paths=['/','/about','/services','/locations','/blog','/podcast','/faq','/contact','/privacy','/terms'];
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path)=>`<url><loc>${absoluteUrl(path)}</loc><changefreq>weekly</changefreq><priority>${path==='/'?'1.0':'0.7'}</priority></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
