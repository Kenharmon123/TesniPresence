# Tesni Presence

Tesni Presence is the static, public web layer for four businesses: `tesnillc.com`, `tesnicapital.com`, `tesnioutdoorliving.com`, and `4yourhomeloan.com`. It is an Astro 5 static build with TypeScript strict mode and Tailwind CSS.

## Architecture

Presence deliberately owns no database, authentication, AI calls, background jobs, or lender/business logic. Tesni Agents owns those systems and publishes campaign assets. At build time only, `src/lib/content.ts` can use the RLS-protected Supabase anon key to read published `campaign_assets` joined to their campaigns for the selected `domain_id`. No Supabase client is sent to a visitor browser.

If the build-time variables are missing, the domain slot is not yet configured, the public view is unavailable, or the database request fails, the build logs a clear warning and uses `src/content/samples/` together with the faithfully ported Tesni LLC pages/articles. A database outage therefore cannot break deployment.

## Local development

```bash
cp .env.example .env
npm install
npm run dev
npm run build
npm run check
```

`PUBLIC_SUPABASE_ANON_KEY` is intentionally public and must be protected by RLS/public read-only views. Do not add a Supabase service-role key to this project.

## Add or configure a domain

1. Add its typed entry in `src/config/domains.ts` (brand, contacts, IDs, legal text, and profiles).
2. Set its real Agents `organizationId` and `domainId` after the domain rows are provisioned.
3. Deploy a separate Netlify site/build with `PUBLIC_TESNI_DOMAIN=the-domain.example`.
4. Add the custom domain in Netlify and point DNS there. Repeat per domain.

The same codebase produces a full static site per domain. Canonicals, schema, feeds, robots, sitemaps, branding, legal notice, contacts, and analytics all use the configured active domain.

## Deployment

Netlify runs `npm run build` and publishes `dist`. `netlify.toml` includes baseline security headers, immutable cache for Astro hashed assets, and legacy service-path redirects. Configure `PUBLIC_LEAD_ENDPOINT` to the Tesni Agents Edge Function; form handling still degrades to a normal HTML form post when JavaScript is unavailable.
