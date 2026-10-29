// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { resolveSiteUrl } from "./scripts/site-url.mjs";
import { resolveBasePath, rehypeBaseLinks } from "./src/lib/utils/base-path.mjs";
import starlight from "@astrojs/starlight";
import { viewTransitions } from "astro-vtbot/starlight-view-transitions";

import tailwindcss from "@tailwindcss/vite";
import config from "./src/config/config.json";
import social from "./src/config/social.json";
import locals from "./src/config/locals.json";
import sidebar from "./src/config/sidebar.json";

import { fileURLToPath } from "url";

const { site } = config;
const { title, logo, logo_darkmode } = site;

const buildEnv = loadEnv(process.env.NODE_ENV || "production", process.cwd(), ["SITE_URL", "BASE_PATH"]);
const base = resolveBasePath(buildEnv.BASE_PATH);

export const locales = locals


// https://astro.build/config
export default defineConfig({
  site: resolveSiteUrl(buildEnv.SITE_URL),
  base,
  markdown: { rehypePlugins: [[rehypeBaseLinks, { base }]] },
  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },
  integrations: [
    starlight({
      title,
      // @ts-ignore
      social: social.main || [],
      locales,
      sidebar: sidebar.main || [],
      customCss: ["./src/styles/global.css"],
      components: {
        Head: "./src/components/override-components/Head.astro",
        Header: "./src/components/override-components/Header.astro",
        Hero: "./src/components/override-components/Hero.astro",
        PageFrame: "./src/components/override-components/PageFrame.astro",
        PageSidebar: "./src/components/override-components/PageSidebar.astro",
        TwoColumnContent: "./src/components/override-components/TwoColumnContent.astro",
        ContentPanel: "./src/components/override-components/ContentPanel.astro",
        Pagination: "./src/components/override-components/Pagination.astro",
        Sidebar: "./src/components/override-components/Sidebar.astro",
        
        
      },
      
    }),
  ],
  vite: {
    plugins: /** @type {any} */ ([tailwindcss(), viewTransitions()]),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
