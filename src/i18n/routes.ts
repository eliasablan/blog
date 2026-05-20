import type { Lang } from './ui';

/**
 * Localized section slugs.
 * Top-level routes like /<lang>/<section>/ use these slugs.
 * Example: portafolio (es) vs portfolio (en).
 */
export const sectionSlugs = {
  es: {
    blog: 'blog',
    portfolio: 'portafolio',
  },
  en: {
    blog: 'blog',
    portfolio: 'portfolio',
  },
} as const satisfies Record<Lang, Record<'blog' | 'portfolio', string>>;

export type Section = 'blog' | 'portfolio';

/** Build a localized section URL: sectionPath('es', 'portfolio') → '/es/portafolio' */
export function sectionPath(lang: Lang, section: Section): string {
  return `/${lang}/${sectionSlugs[lang][section]}`;
}

/** Build a localized entry URL */
export function entryPath(lang: Lang, section: Section, slug: string): string {
  return `${sectionPath(lang, section)}/${slug}`;
}
