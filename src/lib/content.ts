import { createClient } from '@supabase/supabase-js';
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
const fallbackAssets = (): PublishedAsset[] => [...legacyArticles, ...sampleAssets];
const normalize = (row: Record<string, unknown>): PublishedAsset | null => {
  const payload = typeof row.payload === 'object' && row.payload !== null ? row.payload as PublishedAsset['payload'] : {};
  const title = typeof row.title === 'string' ? row.title : '';
  const slug = typeof payload.slug === 'string' ? payload.slug : slugify(title);
  if (!title || !slug || typeof row.id !== 'string' || typeof row.format !== 'string') return null;
  return { id: row.id, campaignId: String(row.campaign_id ?? ''), organizationId: String(row.organization_id ?? ''), format: row.format as AssetFormat, title, slug, summary: String(row.summary ?? ''), body: String(row.body ?? ''), payload, mediaUrls: Array.isArray(row.media_urls) ? row.media_urls.filter((value): value is string => typeof value === 'string') : [], publishedAt: String(row.updated_at ?? row.created_at ?? new Date(0).toISOString()), updatedAt: String(row.updated_at ?? row.created_at ?? new Date(0).toISOString()), campaignName: typeof row.campaigns === 'object' && row.campaigns && 'name' in row.campaigns ? String((row.campaigns as { name?: unknown }).name ?? '') : undefined };
};
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
async function getRemoteAssets(): Promise<PublishedAsset[]> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL; const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || activeDomain.domainId === 'SET_IN_AGENTS') { console.warn('[presence] Published-content source is not configured; using local samples and ported Tesni articles.'); return fallbackAssets(); }
  try {
    const supabase = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.from('campaign_assets').select('id,campaign_id,organization_id,format,title,summary,body,payload,media_urls,created_at,updated_at,campaigns!inner(name,domain_id)').eq('status', 'published').eq('campaigns.domain_id', activeDomain.domainId).order('updated_at', { ascending: false });
    if (error) throw error;
    const remote = (data ?? []).map((row) => normalize(row as Record<string, unknown>)).filter((asset): asset is PublishedAsset => asset !== null);
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
