import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { filterByLang, splitEntryId } from '@/i18n/utils';
import { entryPath } from '@/i18n/routes';

export async function GET(context: APIContext) {
  const lang = 'en' as const;
  const posts = filterByLang(await getCollection('blog'), lang)
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Elías Ablán — Blog',
    description: 'Notes on web development, projects, and lessons learned.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: entryPath(lang, 'blog', splitEntryId(post.id).slug),
    })),
    customData: `<language>en-US</language>`,
  });
}
