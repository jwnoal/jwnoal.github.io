import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://jump.icu',
  integrations: [mdx(), sitemap(), vue(), react({
    include: ['**/react/*'],
  })],
  output: "hybrid",
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      // 选择 Shiki 内置的主题（或添加你自己的主题）
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'one-dark-pro',
      // 添加自定义语言
      // 注意：Shiki 内置了无数语言，包括 .astro！
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // 启用自动换行，以防止水平滚动
      wrap: true,
    },
  },
});