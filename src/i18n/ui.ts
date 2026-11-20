export const languages = {
  es: "Español",
  en: "English",
} as const;

export const defaultLang = "es" as const;
export type Lang = keyof typeof languages;

export const ui = {
  es: {
    "nav.services": "Servicios",
    "nav.blog": "Blog",
    "nav.projects": "Proyectos",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",

    "home.title": "Elías Ablán — Desarrollador full-stack en Caracas",
    "home.description":
      "Elías Ablán, desarrollador full-stack en Caracas. Construyo, lanzo y mantengo sitios web, aplicaciones y servidores para negocios.",

    "home.hero.eyebrow":
      "Desarrollador full-stack · sistemas e infraestructura",
    "home.hero.head":
      "Construyo tu sitio o aplicación y me encargo de mantenerlo funcionando.",
    "home.hero.tail":
      "Soy Elías Ablán, desarrollador full-stack en Caracas. También trabajo con redes y servidores.",
    "home.hero.cta.contact": "Cuéntame sobre tu proyecto",
    "home.hero.cta.projects": "Ver los proyectos",

    "home.services.title": "Servicios",
    "home.services.intro":
      "Una sola persona para el código, los servidores y la red.",
    "home.services.cta": "Ver todos los servicios",
    "home.about.cta": "Más sobre mí",
    "home.featured.posts.title": "Escritos",
    "home.featured.posts.cta": "Ver todos los posts",
    "home.featured.projects.title": "Trabajo destacado",
    "home.featured.projects.cta": "Ver todos los proyectos",
    "home.contact.title": "Contacto",

    "blog.title": "Blog",
    "blog.intro": "Notas sobre lo que aprendo, construyo y rompo.",
    "blog.empty": "Todavía no hay posts publicados.",
    "blog.back": "← Volver al blog",
    "blog.readingTime": "min de lectura",
    "blog.rss.description":
      "Notas sobre desarrollo web, proyectos y aprendizajes.",

    "projects.title": "Proyectos",
    "projects.intro": "Proyectos en los que he trabajado, agrupados por tipo.",
    "projects.empty": "Todavía no hay proyectos publicados.",
    "projects.back": "← Volver a proyectos",
    "projects.repo": "Repositorio",
    "projects.demo": "Ver demo",
    "projects.repo.short": "código",
    "projects.demo.short": "visitar",
    "projects.cta.clientWork.title": "¿Quieres uno como este?",
    "projects.cta.clientWork.body":
      "Cuéntame qué necesitas y te digo cómo lo construiría.",
    "projects.cta.solution.title": "Consigue uno para tu negocio",
    "projects.cta.solution.body":
      "Lo configuro con tu marca, lo alojo y lo mantengo por ti.",
    "projects.cta.button": "Escríbeme",

    "services.title": "Servicios",
    "services.description":
      "Páginas web, tiendas en línea, aplicaciones, hosting, servidores y sistemas de negocio, de un solo desarrollador en Caracas. Cada proyecto se cotiza por escrito.",
    "services.head": "Lo que construyo, alojo y mantengo funcionando",
    "services.intro":
      "Cinco tipos de trabajo, desde la primera página web hasta el servidor donde corre. Cotizo cada proyecto por escrito después de leer lo que necesitas.",
    "services.includes": "Incluye",
    "services.process.title": "Cómo funciona un proyecto",
    "services.process.note":
      "Los cambios fuera del alcance acordado se cotizan aparte. Funciona mejor cuando ya sabes qué necesitas o puedes describir el problema que quieres resolver.",
    "services.proof.title": "Trabajo real",
    "services.proof.tanques.body":
      "Tanques Australianos: sitio de ventas para un fabricante de tanques de acero en Guacara. La empresa lo ha usado para vender varios productos.",
    "services.proof.tanques.cta": "Ver el caso",
    "services.closing":
      "¿Algo que no está en la lista? Pregúntame. Todo lo que ves en esta página lo aprendí en un proyecto real.",
    "services.cta.whatsapp": "O escríbeme por WhatsApp",

    "topics.title": "Temas",
    "topics.intro":
      "Lo que escribo y construyo cae en uno de estos siete temas. Cada enlace lleva al archivo correspondiente.",

    "tags.eyebrow": "Tema",
    "tags.empty": "Aún no hay contenido bajo este tema.",
    "tags.articles": "Posts",
    "tags.projects": "Proyectos",

    "notFound.title": "Página no encontrada",
    "notFound.description":
      "La página que buscas no existe o fue despublicada.",
    "notFound.eyebrow": "404",
    "notFound.heading": "Esta página no está disponible",
    "notFound.body":
      "Puede que el enlace haya cambiado, que el contenido esté en borrador o que nunca haya existido.",
    "notFound.home": "Volver al inicio",
    "notFound.blog": "Ver el blog",

    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.namePlaceholder": "Cómo te llamas",
    "contact.form.emailPlaceholder": "tu@correo.com",
    "contact.form.subjectPlaceholder": "De qué se trata",
    "contact.form.messagePlaceholder": "Cuéntame brevemente de qué se trata.",
    "contact.form.submit": "Enviar mensaje",
    "contact.form.submitting": "Enviando...",
    "contact.form.success": "¡Mensaje enviado! Te respondo pronto.",
    "contact.form.error": "Algo falló. Inténtalo de nuevo o escríbeme directo.",
    "contact.form.required": "Este campo es obligatorio.",
    "contact.form.invalidEmail": "El email no es válido.",
    "contact.form.tooShort": "Escribe al menos 10 caracteres.",

    "article.byline.prefix": "Por",
    "article.end": "Fin",

    "theme.toggle": "Cambiar tema",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    "lang.switch": "Cambiar idioma",
    "lang.notAvailable": "No traducido aún",

    "footer.rights": "Todos los derechos reservados.",
    "footer.cv": "Curriculum",
  },
  en: {
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",

    "home.title": "Elías Ablán — Full-stack developer in Caracas",
    "home.description":
      "Elías Ablán, full-stack developer in Caracas. I build, ship and run websites, web apps and servers for businesses.",

    "home.hero.eyebrow": "Full-stack developer · systems & infrastructure",
    "home.hero.head": "I build your website or app and keep it running.",
    "home.hero.tail":
      "I'm Elías Ablán, a full-stack developer in Caracas. I also work with networks and servers.",
    "home.hero.cta.contact": "Tell me about your project",
    "home.hero.cta.projects": "See the projects",

    "home.services.title": "Services",
    "home.services.intro":
      "One person for the code, the servers and the network.",
    "home.services.cta": "See all services",
    "home.about.cta": "More about me",
    "home.featured.posts.title": "Writing",
    "home.featured.posts.cta": "See all posts",
    "home.featured.projects.title": "Selected work",
    "home.featured.projects.cta": "See all projects",
    "home.contact.title": "Contact",

    "blog.title": "Blog",
    "blog.intro": "Notes on what I learn, build, and break.",
    "blog.empty": "No posts published yet.",
    "blog.back": "← Back to blog",
    "blog.readingTime": "min read",
    "blog.rss.description":
      "Notes on web development, projects, and lessons learned.",

    "projects.title": "Projects",
    "projects.intro": "Projects I have worked on, grouped by kind.",
    "projects.empty": "No projects published yet.",
    "projects.back": "← Back to projects",
    "projects.repo": "Repository",
    "projects.demo": "View demo",
    "projects.repo.short": "code",
    "projects.demo.short": "visit",
    "projects.cta.clientWork.title": "Want one like this?",
    "projects.cta.clientWork.body":
      "Tell me what you need and I'll tell you how I'd build it.",
    "projects.cta.solution.title": "Get one for your business",
    "projects.cta.solution.body":
      "I set it up with your brand, host it and maintain it for you.",
    "projects.cta.button": "Get in touch",

    "services.title": "Services",
    "services.description":
      "Websites, online stores, web apps, hosting, servers and business systems from one developer in Caracas. Every project is quoted in writing.",
    "services.head": "What I build, host and keep running",
    "services.intro":
      "Five kinds of work, from a first website to the server it runs on. I quote each project in writing after reading what you need.",
    "services.includes": "Includes",
    "services.process.title": "How a project works",
    "services.process.note":
      "Changes outside the agreed scope are quoted separately. This works best when you already know what you need or can describe the problem you want solved.",
    "services.proof.title": "Real work",
    "services.proof.tanques.body":
      "Tanques Australianos: sales site for a steel tank manufacturer in Guacara. The company has used it to sell multiple products.",
    "services.proof.tanques.cta": "Read the case study",
    "services.closing":
      "Something not listed? Ask. Everything on this page I learned on a real project.",
    "services.cta.whatsapp": "Or message me on WhatsApp",

    "topics.title": "Topics",
    "topics.intro":
      "Everything I write and build lands in one of these seven topics. Each link leads to its archive.",

    "tags.eyebrow": "Topic",
    "tags.empty": "Nothing under this topic yet.",
    "tags.articles": "Posts",
    "tags.projects": "Projects",

    "notFound.title": "Page not found",
    "notFound.description":
      "The page you are looking for does not exist or was unpublished.",
    "notFound.eyebrow": "404",
    "notFound.heading": "This page is not available",
    "notFound.body":
      "The link may have changed, the content may be in draft, or the page may never have existed.",
    "notFound.home": "Back home",
    "notFound.blog": "Read the blog",

    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "you@email.com",
    "contact.form.subjectPlaceholder": "What is it about",
    "contact.form.messagePlaceholder": "Tell me briefly what it is about.",
    "contact.form.submit": "Send message",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Message sent! I'll get back to you soon.",
    "contact.form.error":
      "Something went wrong. Try again or reach out directly.",
    "contact.form.required": "This field is required.",
    "contact.form.invalidEmail": "Invalid email address.",
    "contact.form.tooShort": "Write at least 10 characters.",

    "article.byline.prefix": "By",
    "article.end": "End",

    "theme.toggle": "Toggle theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    "lang.switch": "Switch language",
    "lang.notAvailable": "Not translated yet",

    "footer.rights": "All rights reserved.",
    "footer.cv": "Resume",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)["es"];
