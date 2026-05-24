export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es' as const;
export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',

    'home.title': 'Elías Ablán — Desarrollador y consultor de redes en Caracas',
    'home.description':
      'Blog personal y portafolio de Elías Ablán. Notas sobre desarrollo web, redes, automatización y herramientas de pensamiento.',

    'home.hero.eyebrow': 'Desarrollador full-stack',
    'home.hero.lede':
      'Desarrollador freelance y consultor de redes en Caracas. Construyo software, configuro redes y a veces mezclo las dos cosas con hardware.',
    'home.hero.cta.posts': 'Ver el blog',
    'home.hero.cta.portfolio': 'Ver el portafolio',

    'home.featured.posts.title': 'Escritos',
    'home.featured.posts.cta': 'Ver todos los artículos',
    'home.featured.portfolio.title': 'Proyectos',
    'home.featured.portfolio.cta': 'Ver el portafolio',
    'home.contact.title': 'Contacto',

    'blog.title': 'Blog',
    'blog.intro': 'Notas sobre lo que aprendo, construyo y rompo.',
    'blog.empty': 'Todavía no hay artículos publicados.',
    'blog.back': '← Volver al blog',
    'blog.readingTime': 'min de lectura',
    'blog.rss.description': 'Notas sobre desarrollo web, proyectos y aprendizajes.',

    'portfolio.title': 'Portafolio',
    'portfolio.intro': 'Proyectos en los que he trabajado.',
    'portfolio.empty': 'Todavía no hay proyectos publicados.',
    'portfolio.back': '← Volver al portafolio',
    'portfolio.repo': 'Repositorio',
    'portfolio.demo': 'Ver demo',
    'portfolio.repo.short': 'código',
    'portfolio.demo.short': 'visitar',

    'topics.title': 'Temas',
    'topics.intro':
      'Lo que escribo y construyo cae en uno de estos siete temas. Cada enlace lleva al archivo correspondiente.',

    'tags.eyebrow': 'Tema',
    'tags.empty': 'Aún no hay contenido bajo este tema.',
    'tags.back': '← Volver al inicio',
    'tags.articles': 'Artículos',
    'tags.projects': 'Proyectos',

    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.namePlaceholder': 'Cómo te llamas',
    'contact.form.emailPlaceholder': 'tu@correo.com',
    'contact.form.subjectPlaceholder': 'De qué se trata',
    'contact.form.messagePlaceholder': 'Cuéntame brevemente de qué se trata.',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.submitting': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado! Te respondo pronto.',
    'contact.form.error': 'Algo falló. Inténtalo de nuevo o escríbeme directo.',
    'contact.form.required': 'Este campo es obligatorio.',
    'contact.form.invalidEmail': 'El email no es válido.',

    'article.byline.prefix': 'Por',

    'theme.toggle': 'Cambiar tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',

    'lang.switch': 'Cambiar idioma',
    'lang.notAvailable': 'No traducido aún',

    'footer.rights': 'Todos los derechos reservados.',
    'footer.cv': 'Curriculum',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'home.title': 'Elías Ablán — Developer and network consultant in Caracas',
    'home.description':
      'Personal blog and portfolio of Elías Ablán. Notes on web development, networking, automation, and thinking tools.',

    'home.hero.eyebrow': 'Full-stack developer',
    'home.hero.lede':
      'Freelance developer and network consultant in Caracas. I build software, set up networks, and sometimes mix the two with hardware.',
    'home.hero.cta.posts': 'Read the blog',
    'home.hero.cta.portfolio': 'See the portfolio',

    'home.featured.posts.title': 'Writing',
    'home.featured.posts.cta': 'See all articles',
    'home.featured.portfolio.title': 'Projects',
    'home.featured.portfolio.cta': 'See the portfolio',
    'home.contact.title': 'Contact',

    'blog.title': 'Blog',
    'blog.intro': 'Notes on what I learn, build, and break.',
    'blog.empty': 'No articles published yet.',
    'blog.back': '← Back to blog',
    'blog.readingTime': 'min read',
    'blog.rss.description': 'Notes on web development, projects, and lessons learned.',

    'portfolio.title': 'Portfolio',
    'portfolio.intro': 'Projects I have worked on.',
    'portfolio.empty': 'No projects published yet.',
    'portfolio.back': '← Back to portfolio',
    'portfolio.repo': 'Repository',
    'portfolio.demo': 'View demo',
    'portfolio.repo.short': 'code',
    'portfolio.demo.short': 'visit',

    'topics.title': 'Topics',
    'topics.intro':
      'Everything I write and build lands in one of these seven topics. Each link leads to its archive.',

    'tags.eyebrow': 'Topic',
    'tags.empty': "Nothing under this topic yet.",
    'tags.back': '← Back to home',
    'tags.articles': 'Articles',
    'tags.projects': 'Projects',

    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.emailPlaceholder': 'you@email.com',
    'contact.form.subjectPlaceholder': 'What is it about',
    'contact.form.messagePlaceholder': 'Tell me briefly what it is about.',
    'contact.form.submit': 'Send message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': "Message sent! I'll get back to you soon.",
    'contact.form.error': 'Something went wrong. Try again or reach out directly.',
    'contact.form.required': 'This field is required.',
    'contact.form.invalidEmail': 'Invalid email address.',

    'article.byline.prefix': 'By',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'lang.switch': 'Switch language',
    'lang.notAvailable': 'Not translated yet',

    'footer.rights': 'All rights reserved.',
    'footer.cv': 'Resume',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];
