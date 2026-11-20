# DESIGN.md

Sistema de diseño del blog. Fuente: prototipo HTML/CSS en `claude.ai/design`
(bundle `blog/project/{index,article,tag}.html`). Este documento es la
referencia canónica para implementación; cualquier desviación debe
documentarse aquí antes de aterrizar en código.

---

## 1. Paleta

La dirección **Dither × ASCII** (#3, referencia
`docs/design/references/dither-ascii.png`) usa tinta azul marino sobre
papel con grano. En modo oscuro el papel es azul y la tinta es clara.
Los dos modos derivan sus tonos de interfaz de la tinta y el papel.

### 1.1 Colores base

| Token     | Claro       | Oscuro       | Uso                               |
| --------- | ----------- | ------------ | --------------------------------- |
| `--ink`   | `#1C2056`   | `#E4E5F4`    | Texto, bordes, bloques y dither   |
| `--paper` | `#EBEBE6`   | `#11143A`    | Fondo y texto sobre tinta         |
| `--grain` | ruido negro | ruido blanco | Textura SVG con alfa en el filtro |
| `--red`   | `#AF3029`   | `#D14D41`    | Error                             |
| `--green` | `#66800B`   | `#879A39`    | Indicador de éxito                |

### 1.2 Tokens semánticos

| Token            | Valor              | Uso                                           |
| ---------------- | ------------------ | --------------------------------------------- |
| `--bg`           | `--paper`          | Fondo de la página                            |
| `--bg-secondary` | 5% tinta en papel  | Fondo alterno                                 |
| `--ui-hover`     | 14% tinta en papel | Fondo del botón secundario                    |
| `--tx`           | `--ink`            | Texto principal                               |
| `--tx-secondary` | 92% tinta en papel | Texto de apoyo                                |
| `--tx-muted`     | 88% tinta en papel | Texto auxiliar y fechas                       |
| `--rule`         | 25% tinta en papel | Borde discreto de código inline               |
| `--error`        | 45% rojo en tinta  | Texto, borde y foco de error                  |
| `--accent`       | `--ink`            | Enlaces de prosa y la utilidad `text-primary` |

Las cajas y los controles usan borde de tinta. La sintaxis usa los tonos
`--code-*` derivados de la tinta, con keywords en negrita y comentarios
en cursiva (§5.10).

---

## 2. Tipografía

| Familia            | Variable       | Uso                                                 |
| ------------------ | -------------- | --------------------------------------------------- |
| **Pixelify Sans**  | `--font-pixel` | display: brand, titular del Hero (700)              |
| **Space Mono**     | `--font-mono`  | chrome en mayúsculas: nav, labels, CTAs, meta, code |
| **IBM Plex Serif** | `--font-serif` | body, prosa del Blog, h1–h3 de páginas              |

Pesos: Pixelify 700; Space Mono 400/700 (no hay 500: `font-medium` cae a
400); Plex Serif 400/600 con italics. Cargadas con la API de fuentes de
Astro (`astro.config.mjs` + `<Font>` en `BaseLayout.astro`).

### Escala

| Rol           | Tamaño                           | Peso    | Line-height | Tracking    |
| ------------- | -------------------------------- | ------- | ----------- | ----------- |
| h1 hero/page  | `clamp(36px, 5vw, 52px)`         | 600     | 1.08        | -0.018em    |
| h2 sección    | `32px`                           | 600     | 1.2         | -0.012em    |
| h3            | `22px`                           | 600     | 1.3         | 0           |
| lede          | `22px` italic                    | 400     | 1.4         | 0           |
| body          | `18px`                           | 400     | 1.7         | normal      |
| display Hero  | `clamp(26px, 3.5vw, 42px)` pixel | 700     | 1.12        | 0.01em      |
| eyebrow / nav | `12px` mono uppercase            | 400/700 | 1.4         | 0.06–0.08em |
| micro / fin   | `11–12px` mono                   | 400     | —           | 0.1em       |

Reglas:

- `text-wrap: balance` en headings; `text-wrap: pretty` en ledes y
  blockquotes.
- `font-feature-settings: "kern","liga","onum"` en body — números old-style
  en prosa, no en tablas/UI.
- `body` por defecto en serif. El chrome (Header, Footer, Buttons, labels
  de formulario, código) usa mono.

---

## 3. Espaciado

Los márgenes y rellenos de layout siguen la escala de utilidades de
Tailwind. El dither tiene su propia cuadrícula en `global.css`
(`--px: 3px`, `--cell: 12px`, `--control-h: 48px`, `--dith-w: 48px`).
Ver §5.2.1.

---

## 4. Layout

- **Ancho de columna:** `680px` para todo el contenido editorial (home,
  artículo, tag).
- **Padding base:** `64px 32px 96px` (≥600px); `40px 20px 64px` en mobile.
- **Topbar:** `padding: 16px clamp(20px, 4vw, 40px)` (`16px 12px` mobile).
- Composición: un single column centrado. No hay sidebar.

---

## 5. Componentes

### 5.1 Topbar (`Header.astro`)

- Sticky, `z-50`, fondo `--bg` + `.grain`, borde inferior `1px dotted
var(--ink)`. Padding `16px`; los controles miden `48px` (4 celdas).
- **Brand:** `.boxhead` `EA | ELIAS ABLAN` en Pixelify 15px (13px
  mobile, solo el nombre). El nombre conserva el efecto scramble al hover;
  una copia invisible fija el ancho de la caja. El efecto requiere
  puntero fino y movimiento normal.
- **Nav:** Space Mono 12px uppercase con prefijo `//` en `tx-muted`;
  hover → subrayado punteado con puntero fino. Bajo `lg` baja a su propia
  fila. Cada etiqueta permanece entera cuando la fila envuelve.
- **Idioma / tema:** `.ctl` (caja 48×48, hover invertido).
- **Contacto:** `.dith-bar` de 48px con `.dith` de 12 píxeles de dither (36 px CSS), u 8 (24 px CSS) en móvil.

### 5.2 Hero (`home/Hero.astro`)

- Columna centrada de hasta 640px con texto alineado a la izquierda.
  La escalera ocupa el margen izquierdo desde 1168px. Son 16 escalones
  de tinta con un `.dith` colgando a la derecha, alto redondeado a celdas
  enteras (`round(…, var(--cell))`) y ancho a pixeles enteros.
- `.boxhead`: `//01 | eyebrow (.box-fill)`.
- h1 = one-liner del spec: primera cláusula en Pixelify, resto en Space
  Mono 12.5px `tx-muted`.
- Lista `//ALCANCE` + `.checker`, `.rule-dots`, línea `Caracas, Venezuela`.
- CTA principal `.dith-bar` de 60px (5 celdas) → `/[lang]/#contact`;
  enlace secundario punteado a Proyectos.
- Entrada escalonada (`rise`, `grow`) desactivada con
  `prefers-reduced-motion`.

### 5.2.1 Primitivas Dither (`global.css`, `@layer components`)

Reutilizables por Home, Services y About. Todo se mide en `--px` (3px) y
`--cell` (12px = 4 filas de dither).

| Clase                    | Qué es                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `.dith`                  | borde dither Bayer 4×4 (75→12.5%) que se estira al alto del padre; ancho `--dith-w`                 |
| `.dith-bar`              | barra de tinta sólida que termina en un `.dith` (último hijo, sin padding derecho)                  |
| `.ctl`                   | control encajado; la altura la fija su tamaño (48px en el Header); `aria-disabled="true"` lo atenúa |
| `.boxhead` + `.box-fill` | fila de label encajada `//LABEL`; `.box-fill` invierte una celda                                    |
| `.rule-dots`             | regla doble punteada (2px + 1px)                                                                    |
| `.checker`               | damero de celdas de 12px; tamaño en celdas enteras (5×5 por defecto)                                |
| `.grain`                 | grano de papel para superficies opacas sobre el body                                                |

**Regla de no-recorte:** todo lo que aloje un `.dith` debe medir un número
entero de celdas de alto (`--cell`, 12px) y todo escalón/offset debe ser
múltiplo de `--px`; si no, la primera o la última fila de pixeles se
corta. Por eso los controles del header miden 48px y el CTA 60px.

### 5.2.2 Orden de Home y Services (`home/ServicesSection.astro`)

Hero → Services → Selected work (Client work + Solutions destacados) →
About → Writing (últimos 3 Posts) → Contact. Los Temas viven arriba del
índice del Blog (`ThemesSection.astro`), no en Home.

Services: h2 §, una línea de intro y una rejilla de 2 columnas (1 bajo
600px) con 5 cards-enlace a la página de Services. Cada card es una caja
`1px var(--ink)` cuya cabecera es un `.dith-bar` de 24px (2 celdas) con
`//01…//05` y un `.dith` de 12 píxeles de dither (36 px CSS); debajo, título serif 19px y una
línea `tx-secondary`. La celda 6 es un `.dith-bar` de 48px "Ver todos los
servicios". Nunca hay precios.

La página de Services abre con una `.boxhead`, un titular Pixelify y prosa
serif. Cada servicio tiene una cabecera `.dith-bar` numerada de 48px y
el contenido alineado a un borde izquierdo de tinta. El proceso usa una
cabecera encajada. El cierre reúne la llamada a contacto y WhatsApp.

### 5.3 About

- En Home, prosa serif 18px entre Selected work y Writing. **Sin h2**: la
  voz no necesita anuncio. En su lugar abre con un `.rule-dots` (la
  sección empieza con `mt-16`, igual que las demás) a ancho de columna.
- Enlace de cierre: `Link.astro` (`.link`) a la página About, `mt-8`, con
  flecha. Sin divisor al final.

La página About usa una cabecera encajada y titular Pixelify. Las secciones
numeradas presentan experiencia en una línea de tiempo punteada, el stack
en grupos con separadores, las prioridades en barras dither de 48px y el
CV en una barra de 60px junto a los enlaces sociales.

### 5.4 Section heading (h2 con §)

Los encabezados de sección visibles en Home usan Plex Serif 32px,
peso 600, y un `§` de tinta en `::before` con 12px de separación.
Los índices de Blog y Projects y sus agrupaciones usan las cabeceras
encajadas que se describen en sus respectivas secciones.

### 5.5 Blog index, Temas y página de Tema

**Shell** (Blog index y Tema): la columna de 680px de Services/About
(`max-w-170 px-8 pt-16 pb-24`, `px-5 pt-10 pb-16` bajo 600px). Cada página
y sección abre con `SectionHead.astro`: un `.boxhead` `// | LABEL
(.box-fill)`, mono 12px bold mayúsculas. El label es el heading
(`h1`/`h2`, o `p` cuando el `h1` va debajo). `aside` añade una celda con
un conteo de dos cifras (`07`, `00`).

**Blog index** (`blog/index.astro`): `SectionHead h1 Blog` → intro en
display Pixelify (`clamp(26px,3.5vw,42px)`, como el head de Services) →
Temas → `SectionHead Posts <n>` → lista de Posts (§5.8) o estado
vacío.

**Lista de Temas** (`ThemesSection.astro`, `#topics`): `SectionHead Temas
07`, intro serif 18px `tx-secondary`, y un índice en rejilla de 2 columnas
(1 bajo 600px) con líneas de tinta compartidas (`border-t/l` en la lista,
`border-r/b` en cada celda). Cada celda es un enlace de alto mínimo 48px:
`//01` muted · nombre del Tema (mono 12px mayúsculas, tracking 0.08em) ·
conteo de Posts + Proyectos publicados en ese idioma (`countByTopic`, en
`i18n/tags.ts`), `00` incluido. Hover (puntero fino) y `:active` (también
táctil) invierten la celda como `.ctl`, en `--dur-hover`; sin escala, que
la despegaría de las líneas compartidas. En dos columnas, la última fila
muestra una sola celda con los cuatro bordes visibles.

**Página de Tema** (`tags/[tag].astro`): existe para los 7 Temas aunque
estén vacíos (la lista los enlaza todos). `SectionHead p Tema <total>` →
`h1` con el nombre en display Pixelify → `SectionHead Posts <n>` +
lista de Posts → `SectionHead Proyectos <n>` + `ProjectCard`. Cada sección
solo aparece si tiene algo; si no hay nada, estado vacío. Cierra con
`.link` "← Volver al blog" a `/blog#topics`.

**Estado vacío** (`EmptyState.astro`): caja `1px dotted var(--ink)`
(punteado = aquí no hay nada aún), padding 24px (16px móvil), un
`.checker` de 4×4 celdas y el mensaje en serif italic 18px `tx-secondary`.
Lo usan el Blog index sin Posts y el Tema sin contenido. Home oculta
Escritos cuando no hay Posts.

### 5.6 Projects: índice, Project card y Selected work

**Project card** (`ProjectCard.astro`, sobre `starwind/Card`): caja
`1px var(--ink)` sin radio. Cabecera `.dith-bar` de 24px (2 celdas,
`whitespace-nowrap`) con `//KIND` (singular, mono 11px bold) a la
izquierda, el año a la derecha y un `.dith` de 12 píxeles de dither (36 px CSS). Todo
Project muestra su kind, también los Side projects. Debajo, en `p-4`:
título serif 600 (22px en fila, 19px en tile), descripción 16px
`tx-secondary` (max 56ch), chips de Tema en filas flexibles y acciones `Button` `outline` `sm`
(36px) con icono
11px: `visitar` (flecha) y `código` (`</>`).

Dos formas, prop `form`:

| Forma           | Uso                                            | Acciones                                        |
| --------------- | ---------------------------------------------- | ----------------------------------------------- |
| `row` (default) | Client work del índice, Selected work, Topics  | columna a la derecha; debajo en fila bajo 600px |
| `tile`          | Solutions y Side projects del índice (rejilla) | al pie de la caja (`mt-auto`)                   |

Toda la card abre el Project: el enlace del título se estira con un
`::after` (`inset: 0`, `z-index: 1`); Topics y botones van encima
(`z-2`). Los `transition:name` del título, año y descripción viven en
`span` internos: en el propio enlace lo volverían bloque contenedor del
`::after`.

Estados (solo cuando el puntero está sobre la card, no sobre un Topic o
botón; hover tras `(hover: hover) and (pointer: fine)`):

- **Hover:** fondo `--bg-secondary`, la tinta de la cabecera avanza una
  celda sobre la rampa (como todo `.dith-bar` enlace) y el título se
  subraya.
- **Foco:** el anillo compartido se dibuja en la card
  (`:has(.pcard-link:focus-visible)`), no en el título, que se subraya.
- **Press:** `scale(1 - (1 - var(--press-scale)) / 3)` (0.99; una caja
  grande a 0.97 salta) y `--press-opacity`. Con reduced motion queda en
  atenuado, sin escala.

**Índice** (`[projectsSlug]/index.astro`): columna de 680px como el
resto del sitio. Cabecera como Services: `.boxhead`
`// | PROYECTOS (h1, .box-fill)` y la intro 18px `tx-secondary`.
Grupos por kind en orden `kindSlugs` (Client work primero), saltando los
vacíos; cada uno abre con `.boxhead` `//0N | KIND (h2) | total`. Client
work va en filas; Solutions y Side projects en rejilla de 2 columnas
(gap 16px, 1 columna bajo 600px). Sin Projects: frase italic
`tx-secondary`.

**Selected work** (`home/FeaturedProjects.astro`): h2 §, la misma card
en filas (Client work y Solutions destacados, hasta 5) y un `Button`
`primary` `md` (48px) "Ver todos los proyectos" a media columna, alineado
a la derecha (ancho completo bajo 600px), como la celda final de
Services.

### 5.7 Página de Project (`[projectsSlug]/[slug].astro`)

Columna de 680px como Services (`px-8 pt-16 pb-24`; `px-5 pt-10 pb-16`
bajo 600px). Mismo esqueleto para los tres tipos; cambia el cierre.

- **Volver:** `Link` (`.link`) a Proyectos, arriba.
- **Cabecera:** `.boxhead` `// | TIPO (.box-fill) | año`; h1 Plex Serif
  `clamp(36px, 5vw, 52px)` 600; lede = descripción en italic 22px
  `tx-secondary` (20px en mobile). Topics como `.link` precedidos por `//`
  y separados por `·`. Acciones con `Button` `md` (48px): demo `primary`,
  repo `outline`. Se conservan los `transition:name` de título, año,
  descripción y cover que comparte con `ProjectCard`.
- **Cover:** `figure` con caja `1px var(--ink)`; arriba una `.dith-bar` de
  24px (2 celdas, rampa de 12 px) con `//host` del demo (o el slug), y la
  imagen a ancho completo con su proporción natural. Las imágenes del body
  llevan el mismo marco (no hay galería en el contenido todavía).
- **Body (MDX):** serif 18px, párrafos a 24px. Cada h2 se renderiza con
  `ProjectSectionHeading.astro`: `.dith-bar` de 48px como los títulos de
  Services, número `//01…` por contador CSS (oculto a lectores de
  pantalla) y título Pixelify `clamp(15px, 4.4vw, 19px)` en una línea. Lo
  que sigue a cada h2 cuelga de un borde izquierdo `1px var(--ink)` con
  20px de sangría (16px en mobile). Así el caso de Client work (problema,
  qué construí, resultado) se lee en tres bloques; un body sin h2 es prosa
  normal.
- **Cierre por tipo:**
  - _Client work_: `.rule-dots`, h2 § "¿Quieres uno como este?", una línea
    `tx-secondary`, `Button` `primary` `md` a `/#contact` y un `.checker`
    a la derecha (oculto bajo 600px).
  - _Solution_: panel de tinta sólida. El interior intercambia `--ink` y
    `--paper` (re-scope de tokens vía `--ink-x`/`--paper-x`, no es una
    primitiva nueva), así el `Button` `primary` `lg` (60px), su `.dith` y
    el anillo de foco se dibujan en papel sobre tinta. Título Pixelify,
    label `//SOLUCIÓN`. El enlace lleva `?subject=Solución: <título>` y
    `ContactForm` lo precarga (también tras navegar con ClientRouter).
  - _Side project_: se repiten demo y repo y se ofrece un `.link` de
    vuelta a la derecha. El Footer aporta la regla punteada de cierre.

### 5.8 Post row (`PostCard.astro` en `PostList.astro`)

Una sola lista (`PostList`) para el Blog index, la página de Tema y
Escritos en Home, así las filas son idénticas en las tres. Lista `ul` con
regla inferior `1px dotted var(--ink)`; cada fila es un `article` con
regla superior igual, padding `20px 14px` (los 14px alinean la fecha con
el `//` del `SectionHead`) y grid `100px 1fr` (una columna bajo 600px):

- Columna 1: fecha mono 12px mayúsculas `tx-muted` (`2026 · MAY`).
- Columna 2: `h3` serif 19px/1.3 weight 600, balance; el título
  enlaza al Post y usa el subrayado de prosa (40% → 100%). Lede
  16px `tx-secondary`, pretty. Debajo, los Temas del Post como chips.
- Hover del título (puntero fino): toda la fila se tiñe a
  `--bg-secondary` (`:has()`, `--dur-hover`). Solo color: una fila de
  680px no escala.
- Se conservan los `transition:name` de fecha, título y descripción para
  el morph hacia el artículo.

**Chip de Tema:** enlace `Button` `outline` `sm` (36px) con las
interacciones de la fundación. PostCard, ProjectCard y el pie de Post
usan el mismo control. Los chips envuelven en filas.

Escritos en Home conserva su h2 § y cierra con un `.link` «Ver todos los
posts →».

### 5.9 Contact form (`ContactForm.astro`, `home/ContactSection.astro`)

Bloque de cierre de Home: h2 § (§5.4), el párrafo MDX y el formulario.
Todo se arma con la fundación §5.12 (`Label`, `Input`, `Textarea`,
`Button`); los estilos propios viven en el componente.

- **Rejilla:** Nombre | Email en 2 columnas desde `sm` (gap 24px), Asunto
  y Mensaje a lo ancho; una columna en mobile. Cada grupo es label → 8px
  → campo → ranura de error.
- **Obligatorio:** `*` en `tx-muted`, `aria-hidden`; el campo lleva
  `required`. Email con `autocapitalize="off"` y `spellcheck="false"`.
- **Estados del campo:** vacío (placeholder italic), hover/foco (fondo
  `--bg-secondary` + anillo compartido), lleno, inválido (borde y anillo
  `--error`) y deshabilitado al enviar (`<fieldset disabled>`: borde
  punteado, opacidad 0.5; el botón también).
- **Errores:** mono 12px en una ranura reservada de 24px, así que
  aparecer o desaparecer no mueve nada. Usan el color `--error`.
  Se validan al enviar y el foco va al primer campo inválido
  (queda bajo el header sticky gracias a §6.6) y cada error se borra en
  cuanto el campo se corrige. Mensaje < 10 caracteres → «Escribe al
  menos 10 caracteres».
- **Acciones:** submit `Button` primario `lg` (60px, 5 celdas), ancho
  `max-w-sm`, `origin-left` para que el press (`scale(0.97)`) no despegue
  el borde izquierdo de la columna de campos. Debajo, WhatsApp como
  `Button outline` 48px: ruta secundaria, nunca a la par del submit.
  Bajo 400px ambos van al ancho de la columna.
- **Estado de envío:** el label del botón pasa a «Enviando…» (ancho fijo,
  no salta) y el form declara `aria-busy`. Al terminar, el foco vuelve
  al control anterior si sigue en el cuerpo del documento.
- **Feedback:** un único `<p role="status">` siempre presente cierra el
  form, con 48px reservados (2 líneas a 375px): solo cambia su texto, así
  se anuncia y no desplaza nada. Texto serif 16px en tinta (el verde
  crudo no llega a 4.5:1 en light); el estado lo marca una celda de 12px:
  rampa dither que cicla en `steps(4)` al enviar (estática con
  `prefers-reduced-motion`), `--green` al éxito, `--red` al error.
- **Asunto precargado:** `?subject=` (lo ponen los CTA de Solution)
  rellena el campo al cargar o tras navegar con el ClientRouter.

### 5.10 Lectura de un Post (`ArticleLayout.astro`, `.article-body`)

La legibilidad manda: el texto es serif liso sobre el papel y el lenguaje
Dither vive en el marco (reglas, labels, bordes), nunca encima de la prosa.
Estilos de cabecera, byline y pie en utilidades de `ArticleLayout.astro`;
la prosa MDX en `.article-body` (`global.css`), porque el HTML renderizado no
lleva clases.

**Medida y ritmo.** Columna de 680px (616px de texto): ~70 caracteres por
línea a 18px / 1.7, dentro del rango 45–75. Bajo 600px el cuerpo baja a
17px / 1.65 (~38 caracteres en 375px). El espaciado vertical va en celdas:
24px entre bloques, 36px alrededor de figuras, citas, imágenes y cortes,
60px sobre un h2 (48px en mobile), 36px sobre un h3 y 12px bajo él.

**Cabecera:**

- `.boxhead` de 11px mono: `//` | tema (`.box-fill`, enlace al Tema;
  hover subrayado punteado, anillo de foco en papel hacia dentro) | tiempo
  de lectura. Sin tags, solo `//` | tiempo.
- h1 serif 600 `clamp(32px, 5vw, 52px)`, balance. Lede italic 22px (19px
  mobile) `tx-secondary`. Ambos conservan sus `transition:name` (PostCard
  morfa hacia ellos).
- `.rule-dots` cierra la cabecera.
- **Byline:** cuadro de tinta de 36px (3 celdas) con `EA` en Pixelify 13px
  y, al lado, dos líneas mono 11px / 18px: `POR ELIAS ABLAN · CARACAS` y la
  fecha (UTC) en `tx-secondary`.

**Prosa:**

- `h2` serif 32px (26px mobile) con `§` antepuesto; `h3` 22px (20px) con
  un `//` mono `tx-muted`. Ambos marcadores van como `content: "…" / ""`
  para que el lector de pantalla no los lea.
- `ul`: cuadro de tinta de 6px (dos pixeles de dither); hueco con borde de
  1px cuando está anidado. `ol`: `01`, `02`… mono 12px `tx-muted`, sobre la
  línea base del texto.
- `blockquote`: borde izquierdo de un `--px` de tinta, serif italic 21px
  (19px mobile) `tx-secondary`; `cite` mono 11px mayúsculas `tx-muted`.
- `code` en línea: caja cuadrada `1px var(--rule)` sobre `--bg-secondary`,
  mono 0.84em, `box-decoration-break: clone` al partir línea.
- `kbd`: caja `1px var(--ink)` con borde inferior de un `--px`, mono 0.7em
  mayúsculas.
- `hr`: dinkus de tres cuadros de 6px separados 6px, centrado.
- Imágenes: bloque al 100% del ancho, alto automático, con borde
  `1px var(--ink)`.
- Enlaces: los de prosa de §6.3.

**Code blocks.** Shiki usa el tema `inkTheme` y el transformer `codeFrame`
(`src/lib/codeFrame.ts`, configurados en `astro.config.mjs`), que envuelve
cada `<pre>` en `<figure class="code">`:

- Caja `1px var(--ink)` sobre `--code-bg` (`--bg-secondary`). La cabecera
  (`figcaption`) es un `.dith-bar` de 24px (2 celdas) con `//LANG` mono
  11px bold y un `.dith` de 12 píxeles de dither (36 px CSS), seguido del nombre de archivo si
  el fence trae `title="archivo.ts"`; regla punteada debajo. Sin lenguaje se
  rotula `TEXT`.
- `pre`: mono 14px (13px mobile) sobre líneas de 24px (2 celdas), padding
  `12px 20px`, scroll horizontal con barra fina; es enfocable y su anillo va
  hacia dentro (`outline-offset: -4px`).
- **Sintaxis solo en tinta:** sin paleta de colores. Los tokens se
  distinguen por peso y estilo, con tintes `color-mix` de `--ink` en
  `--paper`:

  | Token                   | Color                           | Estilo |
  | ----------------------- | ------------------------------- | ------ |
  | texto, nombres, números | `--code-fg` (ink 100%)          | normal |
  | keywords, `storage`     | `--code-fg`                     | bold   |
  | strings                 | `--code-str` (ink 80%)          | normal |
  | comentarios             | `--code-cmt` (ink 72%)          | italic |
  | puntuación, operadores  | `--code-punct` (= `--code-cmt`) | normal |

  Contraste sobre `--code-bg`: ≥ 5:1 en light (el tinte del 72% da ~5.1:1)
  y ≥ 6:1 en dark. Space Mono no carga italic: los comentarios usan la
  oblicua sintética del navegador.

**Pie:** `.dith-bar` de 24px `//FIN` (`article.end`) que se disuelve en un
`.rule-dots` hasta el borde; debajo, label `TEMAS` mono 11px `tx-muted` y
los Temas del Post como `Button` `outline` `sm` (36px, hover invertido,
press `scale(0.97)`); al final, `← VOLVER AL BLOG` con `.link`. El fin se
muestra aunque el Post no tenga Temas.

**Movimiento:** la prosa no se anima. Solo el chrome responde, con las
primitivas de §5.12 (fundido de color en hover, press en los Temas,
`prefers-reduced-motion` ya resuelto por los tokens).

### 5.11 Site footer (`Footer.astro`)

Columna de 680px (`px-8`, `px-5` mobile), `pt-16 pb-12`.

- Abre con `.rule-dots`.
- Fila de enlaces `.link` (`gap-x-6 gap-y-3`, envuelve): RSS
  (`/[lang]/rss.xml`), GitHub, LinkedIn, WhatsApp, Email, CV
  (Curriculum / Resume según idioma). Los externos abren en pestaña nueva
  (lo decide `Link.astro`).
- Cierre: `.dith-bar` de 36px (3 celdas, sin hover: no es enlace) a ancho
  de columna con `© año ELIAS ABLAN · CARACAS` en mono 11px bold
  mayúsculas y un `.dith` de 12 píxeles de dither (36 px CSS) a la derecha.
- Conserva `view-transition-name: site-footer`.

### 5.12 Fundación interactiva (botones, enlaces, campos, cards, foco, movimiento)

Base que reutiliza toda superficie nueva. Los componentes Starwind
(`starwind/Button`, `Input`, `Textarea`, `Label`, `Card`) y `Link.astro`
son envoltorios finos sobre primitivas de `global.css`; imports y props no
cambian.

**Tokens de movimiento** (`:root`):

| Token                | Valor                           | Uso                                 |
| -------------------- | ------------------------------- | ----------------------------------- |
| `--ease-out`         | `cubic-bezier(0.23, 1, 0.32, 1)` | press y todo lo que se mueve        |
| `--dur-hover`        | `150ms`                         | cambios de color, relleno, subrayado |
| `--dur-dither-hover` | `120ms`                         | avance de tinta                     |
| `--dur-press`        | `160ms`                         | press                               |
| `--press-scale`      | `0.97`                          | escala al presionar                 |
| `--press-opacity`    | `1`                             | opacidad al presionar               |

Con `prefers-reduced-motion: reduce`, `--dur-dither-hover: 0ms`, `--dur-press: 0ms`,
`--press-scale: 1`, `--press-opacity: 0.8`. Nada se mueve ni escala; el
press se ve como atenuado y el avance de tinta salta sin pasos. Los
cambios de color siguen con su fundido.

**Foco:** un solo anillo para todo, `:where(:focus-visible)` en `@layer
base`: `outline: 2px solid var(--ink)`, offset `3px`. Especificidad cero:
un componente puede cambiarlo (los campos inválidos lo pasan a `--error`).

**Hover** de primitivas y campos con `(hover: hover) and (pointer: fine)`; las utilidades `hover:` de Tailwind (Button `secondary`/`destructive`, Card) con `(hover: hover)`; el enlace de prosa sin condición.
**Disabled** (`:disabled` o `aria-disabled="true"`): opacidad 0.5, sin
hover ni press.

**Button** (`starwind/Button.astro`): Space Mono bold, mayúsculas,
tracking 0.08em, sin radio. Altos en celdas enteras para que el `.dith`
no se corte: `sm` 36px (3 celdas, 11px), `md` 48px (4, 12px), `lg` 60px
(5, 13px), `icon` 48×48.

| Variante      | Primitiva   | Hover                                      |
| ------------- | ----------- | ------------------------------------------ |
| `primary`     | `.dith-bar` | la tinta sólida avanza una celda           |
| `outline`     | `.ctl`      | invertido (tinta / papel)                  |
| `secondary`   | `.ctl`      | relleno `--ui-hover` → invertido           |
| `ghost`       | `.ctl`      | sin borde → invertido                      |
| `destructive` | `.ctl`      | borde y texto `--error` → relleno de error |

`primary` añade su `.dith` como último hijo (rampa de 8, 12 y 16 píxeles de dither (24, 36 y 48 px CSS) según el tamaño; `icon` va sin dither). Press: `scale(0.97)` en
todas.

**Avance de tinta** en los botones principales y las cabeceras de las
tarjetas de Proyectos. Al pasar el puntero, el fondo sólido crece una celda
(`--cell`) sobre la rampa en cuatro pasos de 30 ms, uno por píxel de dither
(`--px`). Ambas superficies responden al mismo ritmo y el último paso de la
tarjeta llega 30 ms antes de que termine su fundido de color.

**Enlaces:** el de prosa sigue §6.3 (subrayado 1px, tinta al 40% → 100%
en hover). `.link` (lo aplica `Link.astro`) es el enlace suelto de chrome:
Space Mono 12px mayúsculas, tracking 0.08em, con el mismo subrayado,
hover y foco que el de prosa (offset 5px).

**Campos** (`.field`, en `Input` y `Textarea`): caja `1px var(--ink)` sin
radio, fondo transparente sobre el grano; Plex Serif 16px / 24px (16px
evita el zoom de iOS); alto 48px (padding `11px 14px`), textarea mínimo
120px (10 celdas) con resize vertical. Placeholder italic `tx-muted`.
Hover y foco tiñen el fondo a `--bg-secondary`. `aria-invalid="true"` →
borde y anillo `--error`. Disabled → borde punteado + opacidad 0.5.

**Label:** Space Mono 11px mayúsculas, tracking 0.12em, `tx-secondary`.

**Card** (`starwind/Card.astro`): caja `1px var(--ink)`, sin radio, sin
sombra, fondo transparente. Con `hover` el fondo pasa a `--bg-secondary`
(sin elevación).

### 5.13 Página 404 (`pages/404.astro`)

Columna de 680px, centrada en vertical (`min-h-58vh`), mismo lenguaje que
el Hero sin animación de entrada. De arriba abajo: `.boxhead` `// | 404`
(`.box-fill` en el número) con un `.checker` de 5×5 celdas a la derecha
(oculto bajo 600px); h1 en Pixelify con la escala del Hero
(`clamp(26px, 3.5vw, 42px)`, mayúsculas); cuerpo serif 18px `tx-secondary`;
`.rule-dots`; `Button` `primary` `lg` (60px, 5 celdas) a ancho de columna
→ `/[lang]/`; `Link` a Blog. El servidor toma el idioma de la URL
solicitada y devuelve el estado HTTP 404. El selector de idioma queda
deshabilitado (`altLangHref={null}`).

---

## 6. Detalles

### 6.1 Textura de papel (ambos modos)

`body { background-image: var(--grain) }`: ruido fractal SVG de 240px con
el alfa horneado en la matriz de color (negro en light, blanco en dark).
Va **debajo** del contenido para que la prosa del Blog siga nítida; las
superficies opacas que tapan el body (el header sticky) usan `.grain`.

### 6.2 Selección

`::selection { background: var(--ink); color: var(--paper); }`: tinta
invertida, en ambos temas.

### 6.3 Enlaces (default)

```
color: var(--accent);
text-decoration: underline;
text-decoration-thickness: 1px;
text-underline-offset: 3px;
text-decoration-color: color-mix(in srgb, var(--accent) 40%, transparent);
```

Hover sube el `text-decoration-color` a accent al 100%. Los enlaces en
chrome (`.brand`, nav, footer, theme toggle, cards) anulan este estilo
con clases propias.

### 6.4 Transición de tema

```
transition: background-color 0.25s, color 0.25s, border-color 0.25s,
            text-decoration-color 0.2s;
```

Se aplica en los elementos base de layout y en enlaces, botones y campos.
Las primitivas interactivas definen su propia transición.

### 6.5 Anti-FOUC

Script inline síncrono en `<head>` que aplica `.dark` antes de pintar,
leyendo `localStorage.theme` y, en su ausencia, `prefers-color-scheme`.
Idéntico patrón en `astro:after-swap` para SPA navigation.

### 6.6 Anclas bajo el header sticky

`html { scroll-padding-top }` evita que `/#contact` y los h2 de los
artículos queden tapados por el header: 96px en escritorio (header 81px),
128px bajo `lg` (header 109px, el nav baja a su propia fila) y 168px bajo
380px (el nav puede envolver, hasta 156px).

### 6.7 Scrollbar y navegación

`scrollbar-color` usa tinta al 55% sobre papel para el pulgar de la
página. Los bloques de código usan tinta al 60% sobre papel para el
pulgar sobre el fondo de código. `transitions.css` define el fundido y las transiciones de
elementos compartidos entre páginas. Header y Footer permanecen fijos
durante el fundido. El modo de movimiento reducido desactiva las
animaciones de navegación.

---

## 7. Cómo evolucionar este doc

- **Cambio de token:** edita el valor en `global.css` y la tabla en §1.
- **Componente nuevo:** documéntalo en §5 con su grid y tokens antes de
  escribirlo. Si el componente solo se usa una vez, considera si vale la
  pena el doc (probablemente no).
- **Variación de tema:** si tiene que vivir solo en light o solo en dark
  (como la textura de papel), anótala en §6 con la razón.
