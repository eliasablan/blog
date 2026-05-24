import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang, ui, type Lang, type UIKey, languages } from "./ui";
import { sectionSlugs, type Section } from "./routes";

export { defaultLang, languages, type Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang === "es" || lang === "en") return lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Entry id shape is `<lang>/<slug>` because content lives at src/content/<col>/<lang>/<slug>.mdx */
export function splitEntryId(id: string): { lang: Lang; slug: string } {
  const [first, ...rest] = id.split("/");
  const lang: Lang = first === "es" || first === "en" ? first : defaultLang;
  return { lang, slug: rest.join("/") };
}

export function filterByLang<T extends { id: string }>(
  entries: T[],
  lang: Lang,
): T[] {
  return entries.filter((e) => splitEntryId(e.id).lang === lang);
}

export async function getTranslatedEntry<C extends "blog" | "portfolio">(
  collection: C,
  entry: CollectionEntry<C>,
  targetLang: Lang,
): Promise<CollectionEntry<C> | null> {
  const translationKey = (entry.data as { translationKey: string })
    .translationKey;
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

/** Swap lang prefix and remap localized section slugs (e.g. /es/portafolio → /en/portfolio). */
export function altLangUrl(currentUrl: URL, targetLang: Lang): string {
  const segments = currentUrl.pathname
    .replace(/\/$/, "")
    .split("/")
    .filter(Boolean);
  if (segments.length === 0) return `/${targetLang}/`;
  const [currentLang, ...rest] = segments;
  if (currentLang !== "es" && currentLang !== "en") return `/${targetLang}/`;

  const remapped = rest.map((seg, i) => {
    if (i === 0) {
      const sourceSlugs = sectionSlugs[currentLang as Lang];
      const section = (Object.keys(sourceSlugs) as Section[]).find(
        (k) => sourceSlugs[k] === seg,
      );
      if (section) return sectionSlugs[targetLang][section];
    }
    return seg;
  });

  return `/${targetLang}/${remapped.join("/")}`;
}
