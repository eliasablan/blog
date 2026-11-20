import type { Lang } from "./ui";

export const serviceCardOrder = [
  "websites",
  "web-apps",
  "hosting",
  "it-servers",
  "business-systems",
] as const;

export type ServiceCardSlug = (typeof serviceCardOrder)[number];

/** The five Services shown on Home: title plus a one-line summary. */
export const serviceCards: Record<
  ServiceCardSlug,
  { title: Record<Lang, string>; body: Record<Lang, string> }
> = {
  websites: {
    title: {
      es: "Sitios web y tiendas en línea",
      en: "Websites & online stores",
    },
    body: {
      es: "Pensados para buscadores, con un editor de contenido que manejas tú.",
      en: "Built for search, with a CMS you can edit yourself.",
    },
  },
  "web-apps": {
    title: { es: "Aplicaciones web", en: "Web apps" },
    body: {
      es: "Software a la medida de tu negocio, o un sistema que ya tengo construido y adapto a tu marca.",
      en: "Custom software for your business, or a system I've already built, branded for you.",
    },
  },
  hosting: {
    title: { es: "Hosting y mantenimiento", en: "Hosting & maintenance" },
    body: {
      es: "Publico, monitoreo, actualizo y respaldo lo que construyo, en servidores que administro yo.",
      en: "I deploy, monitor, update and back up what I build, on servers I run.",
    },
  },
  "it-servers": {
    title: { es: "TI y servidores", en: "IT & servers" },
    body: {
      es: "Redes de oficina, Windows Server y Linux, instalados y administrados.",
      en: "Office networks, Windows Server and Linux, set up and administered.",
    },
  },
  "business-systems": {
    title: { es: "Sistemas empresariales", en: "Business systems" },
    body: {
      es: "NetSuite y SuiteScript, integraciones y automatizaciones entre las herramientas que ya usas.",
      en: "NetSuite and SuiteScript, plus integrations and automations between the tools you already use.",
    },
  },
};
