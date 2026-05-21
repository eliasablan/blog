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
    'home.hero.cta.posts': 'Ver el blog',
    'home.hero.cta.portfolio': 'Ver el portafolio',

    'home.featured.posts.title': 'Artículos recientes',
    'home.featured.posts.cta': 'Ver todos los artículos',
    'home.featured.portfolio.title': 'Proyectos destacados',
    'home.featured.portfolio.cta': 'Ver el portafolio',

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

    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.submitting': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado! Te respondo pronto.',
    'contact.form.error': 'Algo falló. Inténtalo de nuevo o escríbeme directo.',
    'contact.form.required': 'Este campo es obligatorio.',
    'contact.form.invalidEmail': 'El email no es válido.',

    'theme.toggle': 'Cambiar tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',

    'lang.switch': 'Cambiar idioma',
    'lang.notAvailable': 'No traducido aún',

    'footer.rights': 'Todos los derechos reservados.',
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
    'home.hero.cta.posts': 'Read the blog',
    'home.hero.cta.portfolio': 'See the portfolio',

    'home.featured.posts.title': 'Recent articles',
    'home.featured.posts.cta': 'See all articles',
    'home.featured.portfolio.title': 'Featured projects',
    'home.featured.portfolio.cta': 'See the portfolio',

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

    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': "Message sent! I'll get back to you soon.",
    'contact.form.error': 'Something went wrong. Try again or reach out directly.',
    'contact.form.required': 'This field is required.',
    'contact.form.invalidEmail': 'Invalid email address.',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'lang.switch': 'Switch language',
    'lang.notAvailable': 'Not translated yet',

    'footer.rights': 'All rights reserved.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];
