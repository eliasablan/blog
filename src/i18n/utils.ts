import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, ui, type Lang, type UIKey, languages } from './ui';
import { sectionSlugs, type Section } from './routes';

export { defaultLang, languages, type Lang };

/** Extract the language from a URL like new URL(Astro.request.url) */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es' || lang === 'en') return lang;
  return defaultLang;
}

/** Translation helper bound to a language */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Content entries are loaded from `src/content/<collection>/<lang>/<slug>.mdx`,
 * so the entry id is `<lang>/<slug>`. This splits it.
 */
export function splitEntryId(id: string): { lang: Lang; slug: string } {
  const [first, ...rest] = id.split('/');
  const lang: Lang = first === 'es' || first === 'en' ? first : defaultLang;
  return { lang, slug: rest.join('/') };
}

/** Filter a collection to entries of a specific language */
export function filterByLang<T extends { id: string }>(entries: T[], lang: Lang): T[] {
  return entries.filter((e) => splitEntryId(e.id).lang === lang);
}

/**
 * Find the translated counterpart of an entry by translationKey.
 * Returns null if no translation exists in the target language.
 */
export async function getTranslatedEntry<C extends 'blog' | 'portfolio'>(
  collection: C,
  entry: CollectionEntry<C>,
  targetLang: Lang
): Promise<CollectionEntry<C> | null> {
  // `data` shape differs per collection but both have translationKey.
  const translationKey = (entry.data as { translationKey: string }).translationKey;
  if (!translationKey) return null;
  const all = await getCollection(collection);
  const match = all.find((e) => {
    const { lang } = splitEntryId(e.id);
    return (
      lang === targetLang &&
      (e.data as { translationKey: string }).translationKey === translationKey
    );
  });
  return match ?? null;
}

/**
 * Given the current page URL and the entry being rendered,
 * return the URL of the translated counterpart for the language switcher.
 *
 * - If on a collection entry page, returns the translated entry's URL (or null).
 * - If on a static page (home, list pages), returns the corresponding page
 *   in the target language by swapping the lang prefix and remapping section slugs.
 */
export function altLangUrl(currentUrl: URL, targetLang: Lang): string {
  const segments = currentUrl.pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (segments.length === 0) return `/${targetLang}/`;
  const [currentLang, ...rest] = segments;
  if (currentLang !== 'es' && currentLang !== 'en') return `/${targetLang}/`;

  // Remap section slug if present (rest[0])
  const remapped = rest.map((seg, i) => {
    if (i === 0) {
      const sourceSlugs = sectionSlugs[currentLang as Lang];
      const section = (Object.keys(sourceSlugs) as Section[]).find(
        (k) => sourceSlugs[k] === seg
      );
      if (section) return sectionSlugs[targetLang][section];
    }
    return seg;
  });

  return `/${targetLang}/${remapped.join('/')}`;
}
