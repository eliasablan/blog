// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { codeFrame, inkTheme } from "./src/lib/codeFrame.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://eablan.dev",
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
    // The dev image endpoint uses the Cloudflare Images binding.
    prerenderEnvironment:
      process.env.NODE_ENV === "development" ? "workerd" : "node",
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
      name: "Space Mono",
      cssVariable: "--font-mono",
      weights: [400, 700],
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
    {
      provider: fontProviders.google(),
      name: "Pixelify Sans",
      cssVariable: "--font-pixel",
      weights: [700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Menlo", "monospace"],
      display: "swap",
    },
  ],
  markdown: {
    shikiConfig: { theme: inkTheme, transformers: [codeFrame] },
  },
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
