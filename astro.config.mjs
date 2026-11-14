// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://eablan.dev",
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "IBM Plex Serif",
      cssVariable: "--font-serif",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Iowan Old Style", "Georgia", "serif"],
      display: "swap",
    },
    {
      provider: fontProviders.google(),
      name: "IBM Plex Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: [
        "SF Mono",
        "Menlo",
        "Consolas",
        "Liberation Mono",
        "monospace",
      ],
      display: "swap",
    },
  ],
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
