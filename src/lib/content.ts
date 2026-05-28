import type { CollectionEntry } from "astro:content";

type PublishableEntry = CollectionEntry<"blog"> | CollectionEntry<"portfolio">;

export function isPublished(entry: PublishableEntry): boolean {
  return !entry.data.draft;
}

export function sortPostsByRecent(
  a: CollectionEntry<"blog">,
  b: CollectionEntry<"blog">,
): number {
  const dateDiff = b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  if (dateDiff !== 0) return dateDiff;
  return a.data.title.localeCompare(b.data.title);
}

function projectSortDate(project: CollectionEntry<"portfolio">): number {
  return (
    project.data.publishedAt?.valueOf() ??
    new Date(project.data.year, 0, 1).valueOf()
  );
}

export function sortProjectsByRecent(
  a: CollectionEntry<"portfolio">,
  b: CollectionEntry<"portfolio">,
): number {
  const dateDiff = projectSortDate(b) - projectSortDate(a);
  if (dateDiff !== 0) return dateDiff;
  return a.data.title.localeCompare(b.data.title);
}
