export type AssetFormat = 'news_article' | 'blog_post' | 'video' | 'short_video' | 'podcast' | 'slideshow' | 'infographic';
export type Faq = { q: string; a: string };
export type ArticleSection = { heading: string; body: string };
export type Scene = { index: number; narration: string; visual_prompt: string; overlay_text?: string; duration_seconds: number };
export type Slide = { index: number; heading: string; bullets: string[] };
export type InfographicSection = { index: number; label: string; stat?: string; detail: string; icon_hint?: string };
export type AssetPayload = { slug?: string; dek?: string; sections?: ArticleSection[]; key_takeaways?: string[]; faq?: Faq[]; schema_jsonld?: Record<string, unknown>; meta_title?: string; meta_description?: string; canonical_url?: string; narration_script?: string; segments?: Array<{ label: string; text: string; start_seconds?: number }>; estimated_duration_seconds?: number; audio_url?: string; audio_length?: number; audio_type?: string; show_notes?: string; transcript?: string; hook?: string; scenes?: Scene[]; total_duration_seconds?: number; aspect_ratio?: '16:9' | '9:16' | '1:1' | '4:5'; rendered_url?: string; slides?: Slide[]; headline?: string; infographic_sections?: InfographicSection[]; palette?: string[] };
export type PublishedAsset = { id: string; campaignId: string; organizationId: string; format: AssetFormat; title: string; slug: string; summary: string; body: string; payload: AssetPayload; mediaUrls: string[]; publishedAt: string; updatedAt: string; campaignName?: string };
