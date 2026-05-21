import type { Lang } from './ui';

export const tagSlugs = [
  'web-development',
  'networks',
  'ai',
  'automation',
  'self-hosting',
  'hardware',
  'thinking-tools',
] as const;

export type TagSlug = (typeof tagSlugs)[number];

export const tagLabels: Record<TagSlug, Record<Lang, string>> = {
  'web-development': { es: 'Desarrollo web', en: 'Web development' },
  networks: { es: 'Redes e infraestructura', en: 'Networks & infrastructure' },
  ai: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
  automation: { es: 'Workflows y automatización', en: 'Workflows & automation' },
  'self-hosting': { es: 'Self-hosting', en: 'Self-hosting' },
  hardware: { es: 'Hardware', en: 'Hardware' },
  'thinking-tools': { es: 'Herramientas de pensamiento', en: 'Thinking tools' },
};

export function tagPath(lang: Lang, slug: TagSlug): string {
  return `/${lang}/tags/${slug}`;
}
