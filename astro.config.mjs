import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.unnepuebla.mx',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
