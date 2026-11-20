import type { Lang } from "./ui";
import type { ServiceSlug } from "./services";

/** One-line summary per Service for the Home cards. Titles and order come from `services.ts` so Home and the Services page never disagree. */
export const serviceCardBlurbs: Record<ServiceSlug, Record<Lang, string>> = {
  websites: {
    es: "Pensados para buscadores, con un editor de contenido que manejas tú.",
    en: "Built for search, with a CMS you can edit yourself.",
  },
  "web-apps": {
    es: "Software a la medida de tu negocio, o un sistema que ya tengo construido y adapto a tu marca.",
    en: "Custom software for your business, or a system I've already built, branded for you.",
  },
  hosting: {
    es: "Publico, monitoreo, actualizo y respaldo lo que construyo, en servidores que administro yo.",
    en: "I deploy, monitor, update and back up what I build, on servers I run.",
  },
  "it-servers": {
    es: "Redes de oficina, Windows Server y Linux, instalados y administrados.",
    en: "Office networks, Windows Server and Linux, set up and administered.",
  },
  "business-systems": {
    es: "NetSuite y SuiteScript, integraciones y automatizaciones entre las herramientas que ya usas.",
    en: "NetSuite and SuiteScript, plus integrations and automations between the tools you already use.",
  },
};
