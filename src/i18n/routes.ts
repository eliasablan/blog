import type { Lang } from "./ui";

/**
 * Localized section slugs.
 * Top-level routes like /<lang>/<section>/ use these slugs.
 * Example: proyectos (es) vs projects (en).
 */
export const sectionSlugs = {
  es: {
    blog: "blog",
    projects: "proyectos",
    services: "servicios",
    about: "sobre-mi",
  },
  en: {
    blog: "blog",
    projects: "projects",
    services: "services",
    about: "about",
  },
} as const satisfies Record<Lang, Record<Section, string>>;

export type Section = "blog" | "projects" | "services" | "about";

/** Build a localized section URL: sectionPath('es', 'projects') → '/es/proyectos' */
export function sectionPath(lang: Lang, section: Section): string {
  return `/${lang}/${sectionSlugs[lang][section]}`;
}

/** Build a localized entry URL */
export function entryPath(lang: Lang, section: Section, slug: string): string {
  return `${sectionPath(lang, section)}/${slug}`;
}
