import type { Lang } from "./ui";

export const serviceSlugs = [
  "websites",
  "web-apps",
  "hosting",
  "it-servers",
  "business-systems",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Where a card's proof line points: the Tanques Australianos Client work page, or the Projects index. */
export type ServiceLinkTarget = "tanques" | "projects";

interface Service {
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  items: Record<Lang, string[]>;
  /** Plain proof line, only where it is documented in .agents/product-marketing.md. */
  proof?: Record<Lang, string>;
  link?: { to: ServiceLinkTarget; label: Record<Lang, string> };
}

/** No prices anywhere: Services are priced on request (GLOSSARY.md). */
export const services: Record<ServiceSlug, Service> = {
  websites: {
    title: {
      es: "Páginas web y tiendas en línea",
      en: "Websites & online stores",
    },
    summary: {
      es: "Un sitio que vende, aparece en Google y que tú mismo puedes editar. Catálogo, formulario de cotización, SEO y un CMS, o una tienda en Shopify cuando conviene más.",
      en: "A site that sells, shows up in search and that you can edit yourself. Catalog, quote form, SEO and a CMS, or a Shopify store when that fits better.",
    },
    items: {
      es: [
        "Sitios de ventas con SEO",
        "Un CMS que editas tú, sin llamar a un programador",
        "Tiendas en línea, incluido Shopify",
      ],
      en: [
        "Sales sites with SEO",
        "A CMS you edit yourself, no developer call needed",
        "Online stores, including Shopify",
      ],
    },
    link: {
      to: "tanques",
      label: {
        es: "Hecho: Tanques Australianos",
        en: "Built: Tanques Australianos",
      },
    },
  },
  "web-apps": {
    title: { es: "Aplicaciones web", en: "Web apps" },
    summary: {
      es: "Software a la medida de cómo trabaja tu negocio, publicado y funcionando en internet.",
      en: "Custom software shaped around how your business works, live on the internet.",
    },
    items: {
      es: [
        "Herramientas internas para tu equipo",
        "Apps para tus clientes",
        "Sistemas ya construidos que adapto con tu marca",
      ],
      en: [
        "Internal tools for your team",
        "Apps for your customers",
        "Systems already built that I adapt with your brand",
      ],
    },
    link: {
      to: "projects",
      label: {
        es: "Ver lo que ya está construido",
        en: "See what is already built",
      },
    },
  },
  hosting: {
    title: { es: "Hosting y mantenimiento", en: "Hosting & maintenance" },
    summary: {
      es: "Lo publico, lo vigilo, lo actualizo y le hago respaldos. Tienes una sola persona a quien llamar cuando algo falla.",
      en: "I deploy it, watch it, update it and back it up. You get one person to call when something breaks.",
    },
    items: {
      es: ["Publicación", "Monitoreo", "Actualizaciones", "Respaldos"],
      en: ["Deployment", "Monitoring", "Updates", "Backups"],
    },
    proof: {
      es: "Una cuota mensual, acordada desde el inicio.",
      en: "A monthly fee, agreed up front.",
    },
  },
  "it-servers": {
    title: { es: "Informática y servidores", en: "IT & servers" },
    summary: {
      es: "Redes de oficina, dominios con Windows Server y servidores y equipos Linux, instalados y administrados.",
      en: "Office networks, Windows Server domains, and Linux servers and workstations, set up and administered.",
    },
    items: {
      es: ["Redes de oficina", "Windows Server", "Linux"],
      en: ["Office networks", "Windows Server", "Linux"],
    },
    proof: {
      es: "Reconstruí la red de oficina de una empresa pequeña sobre Windows Server 2025.",
      en: "I rebuilt a small company's office network on Windows Server 2025.",
    },
  },
  "business-systems": {
    title: { es: "Sistemas de negocio", en: "Business systems" },
    summary: {
      es: "Personalizaciones en NetSuite con SuiteScript, integraciones entre los sistemas que ya usas y automatizaciones para el trabajo repetitivo.",
      en: "NetSuite customizations with SuiteScript, integrations between the systems you already use, and automations for repetitive work.",
    },
    items: {
      es: ["NetSuite y SuiteScript", "Integraciones", "Automatizaciones"],
      en: ["NetSuite and SuiteScript", "Integrations", "Automations"],
    },
    proof: {
      es: "Cuatro años escribiendo SuiteScript en Kavak.",
      en: "Four years writing SuiteScript at Kavak.",
    },
  },
};

/** How a project works. Written to set scope up front (see anti-persona in .agents/product-marketing.md). */
export const processSteps: {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}[] = [
  {
    title: { es: "Planteamiento", en: "Brief" },
    body: {
      es: "Me cuentas qué necesitas y qué tiene que hacer el sitio o el sistema.",
      en: "You tell me what you need and what the site or system has to do.",
    },
  },
  {
    title: { es: "Alcance", en: "Scope" },
    body: {
      es: "Te respondo con un alcance por escrito: qué incluye, qué no, cuánto cuesta y en cuánto tiempo.",
      en: "I reply with a written scope: what is included, what is not, what it costs and how long it takes.",
    },
  },
  {
    title: { es: "Desarrollo", en: "Build" },
    body: {
      es: "Empiezo cuando ambos estamos de acuerdo con ese alcance.",
      en: "I start once we both agree on that scope.",
    },
  },
  {
    title: { es: "Entrega", en: "Launch" },
    body: {
      es: "Lo publico, te lo entrego y, si quieres, lo mantengo funcionando.",
      en: "I deploy it, hand it over and, if you want, keep it running.",
    },
  },
];
