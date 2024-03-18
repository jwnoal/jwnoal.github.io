import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
// import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://jump.icu',
  integrations: [mdx(), sitemap(), vue(), react({
    include: ['**/react/*']
  }), svelte()],
  // output: 'hybrid',
  // adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    }
  }
});