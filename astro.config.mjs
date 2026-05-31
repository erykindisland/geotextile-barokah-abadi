// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://geotextile.barokahabadi.web.id',
  integrations: [sitemap()],
  adapter: cloudflare(),
  image: {
    service: passthroughImageService()
  }
});