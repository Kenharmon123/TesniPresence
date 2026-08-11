import { activeDomain } from '../config/domains';
import { blogPosts } from '../data/blogPosts';
import { sampleAssets } from '../content/samples';
import type { AssetFormat, PublishedAsset } from './types';

const articleFormats: AssetFormat[] = ['blog_post', 'news_article'];
const legacyArticles: PublishedAsset[] = blogPosts.map((post) => ({
  id: `legacy-${post.slug}`, campaignId: 'legacy-tesni-site', organizationId: 'legacy-tesni', format: 'blog_post', title: post.title, slug: post.slug,
  summary: post.excerpt, body: post.body.join('\n\n'), mediaUrls: [], publishedAt: post.datePublished, updatedAt: post.dateModified ?? post.datePublished, campaignName: post.category,
  payload: { meta_title: post.title + ' | Tesni, LLC', meta_description: post.description, sections: post.body.map((body, sectionIndex) => ({ heading: sectionIndex === 0 ? 'Overview' : `What to consider`, body })), key_takeaways: [], faq: [], schema_jsonld: { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.datePublished, dateModified: post.dateModified ?? post.datePublished, author: { '@type': 'Organization', name: post.author } }, },
}));
let remoteCache: Promise<PublishedAsset[]> | undefined;
// The ported articles and sample assets are all business-lending content written for
// Tesni, LLC. Serving them as a fallback on every brand meant the outdoor-products
// store published SBA and DSCR loan articles, and the residential mortgage brand
// published business-lending articles. Publishing nothing is better than publishing
// content for the wrong business, so only lending brands get the fallback. The other
// brands render an empty blog until Tesni Agents has published campaign assets
// against their domain_id, which is the intended source for this content.
const lendingVerticals = ['business-lending', 'commercial-lending'];
const fallbackAssets = (): PublishedAsset[] =>
  lendingVerticals.includes(activeDomain.vertical) ? [...legacyArticles, ...sampleAssets] : [];
const normalize = (row: Record<string, unknown>): PublishedAsset | null => {
  const payload = typeof row.payload === 'object' && row.payload !== null ? row.payload as PublishedAsset['payload'] : {};
  const title = typeof row.title === 'string' ? row.title : '';
  const slug = typeof payload.slug === 'string' ? payload.slug : slugify(title);
  if (!title || !slug || typeof row.id !== 'string' || typeof row.format !== 'string') return null;
  return { id: row.id, campaignId: String(row.campaign_id ?? ''), organizationId: String(row.organization_id ?? ''), format: row.format as AssetFormat, title, slug, summary: String(row.summary ?? ''), body: String(row.body ?? ''), payload, mediaUrls: Array.isArray(row.media_urls) ? row.media_urls.filter((value): value is string => typeof value === 'string') : [], publishedAt: String(row.updated_at ?? row.created_at ?? new Date(0).toISOString()), updatedAt: String(row.updated_at ?? row.created_at ?? new Date(0).toISOString()), campaignName: typeof row.campaigns === 'object' && row.campaigns && 'name' in row.campaigns ? String((row.campaigns as { name?: unknown }).name ?? '') : undefined };
};
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
async function getRemoteAssets(): Promise<PublishedAsset[]> {
  // Read import.meta.env first (Vite inlines .env values at build) but fall back to
  // process.env, because on a CI/host build the variables arrive as real process env
  // and are not guaranteed to be inlined.
  const env = typeof process !== 'undefined' && process.env ? process.env : ({} as Record<string, string | undefined>);
  const url = import.meta.env.PUBLIC_SUPABASE_URL || env.PUBLIC_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || activeDomain.domainId === 'SET_IN_AGENTS') { console.warn('[presence] Published-content source is not configured; using local samples and ported Tesni articles.'); return fallbackAssets(); }
  // Deliberately a plain REST fetch rather than @supabase/supabase-js. The JS client
  // pulls in realtime, which throws "Node.js 20 detected without native WebSocket
  // support" during the static build. That throw was caught below and silently
  // downgraded to the fallback, so every brand rendered an empty blog even though
  // the data was there and publicly readable. A read this simple does not need a client.
  try {
    const select = 'id,campaign_id,organization_id,format,title,summary,body,payload,media_urls,created_at,updated_at,campaigns!inner(name,domain_id)';
    const endpoint = `${url.replace(/\/$/, '')}/rest/v1/campaign_assets`
      // PostgREST embed syntax (campaigns!inner(...)) must NOT be percent-encoded;
      // encoding it makes the request fail auth rather than returning a query error.
      + `?select=${select}`
      + `&status=eq.published`
      + `&campaigns.domain_id=eq.${encodeURIComponent(activeDomain.domainId)}`
      + `&order=updated_at.desc`;
    const response = await fetch(endpoint, { headers: { apikey: anon, Authorization: `Bearer ${anon}` } });
    if (!response.ok) {
      // Include the key length, never the key. A truncated or wrong-length anon key is
      // the usual cause of a 401 here and is otherwise invisible in build logs.
      throw new Error(`Published-content request returned HTTP ${response.status} (anon key length ${String(anon).length})`);
    }
    const data = (await response.json()) as Record<string, unknown>[];
    const remote = (data ?? []).map((row) => normalize(row)).filter((asset): asset is PublishedAsset => asset !== null);
    if (!remote.length) { console.warn('[presence] No published campaign assets were returned; using local samples and ported Tesni articles.'); return fallbackAssets(); }
    return remote;
  } catch (error) { console.warn('[presence] Published-content request failed; using local samples and ported Tesni articles.', error); return fallbackAssets(); }
}
async function allAssets() { remoteCache ??= getRemoteAssets(); return remoteCache; }
export async function getPublishedArticles() { return (await allAssets()).filter((asset) => articleFormats.includes(asset.format)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)); }
export async function getArticleBySlug(slug: string) { return (await getPublishedArticles()).find((asset) => asset.slug === slug); }
export async function getArticlesByFormat(format: AssetFormat) { return (await allAssets()).filter((asset) => asset.format === format).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)); }
export async function getRelatedArticles(article: PublishedAsset, count = 3) { return (await getPublishedArticles()).filter((candidate) => candidate.slug !== article.slug && (candidate.campaignName === article.campaignName || candidate.format === article.format)).slice(0, count); }
export async function getPodcastEpisodes() { return getArticlesByFormat('podcast'); }
export async function getVideos() { const assets = await allAssets(); return assets.filter((asset) => asset.format === 'video' || asset.format === 'short_video').sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)); }
export async function getResources() { const assets = await allAssets(); return assets.filter((asset) => asset.format === 'slideshow' || asset.format === 'infographic').sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)); }
