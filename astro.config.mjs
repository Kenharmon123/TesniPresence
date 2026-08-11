import { defineConfig } from 'astro/config';

const domain = process.env.PUBLIC_TESNI_DOMAIN ?? 'tesnillc.com';

export default defineConfig({
  output: 'static',
  site: `https://${domain}`,
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      postcss: './postcss.config.cjs',
    },
  },
});
