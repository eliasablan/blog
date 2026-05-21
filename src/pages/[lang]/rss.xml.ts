import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import {
  filterByLang,
  splitEntryId,
  useTranslations,
  type Lang,
} from '@/i18n/utils';
import { entryPath } from '@/i18n/routes';

export function getStaticPaths() {
  return [{ params: { lang: 'en' } }, { params: { lang: 'es' } }];
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const t = useTranslations(lang);
  const posts = filterByLang(await getCollection('blog'), lang)
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  const langCode = lang === 'en' ? 'en-US' : 'es-ES';

  return rss({
    title: 'Elías Ablán — Blog',
    description: t('blog.rss.description'),
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: entryPath(lang, 'blog', splitEntryId(post.id).slug),
    })),
    customData: `<language>${langCode}</language>`,
  });
}
