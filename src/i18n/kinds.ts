import type { Lang } from "./ui";

export const kindSlugs = ["client-work", "solution", "side-project"] as const;

export type KindSlug = (typeof kindSlugs)[number];

/** Display order on the Projects index: Client work first. */
export const kindOrder: readonly KindSlug[] = kindSlugs;

/** Plural labels, used as group headings. */
export const kindLabels: Record<KindSlug, Record<Lang, string>> = {
  "client-work": { es: "Trabajo para clientes", en: "Client work" },
  solution: { es: "Soluciones", en: "Solutions" },
  "side-project": { es: "Proyectos personales", en: "Side projects" },
};

/** Singular labels, used on a single card or page. */
export const kindLabelsSingular: Record<KindSlug, Record<Lang, string>> = {
  "client-work": { es: "Trabajo para cliente", en: "Client work" },
  solution: { es: "Solución", en: "Solution" },
  "side-project": { es: "Proyecto personal", en: "Side project" },
};
