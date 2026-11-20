# DESIGN.md

Sistema de diseño del blog. Fuente: prototipo HTML/CSS en `claude.ai/design`
(bundle `blog/project/{index,article,tag}.html`). Este documento es la
referencia canónica para implementación; cualquier desviación debe
documentarse aquí antes de aterrizar en código.

---

## 1. Paleta

Dirección **Dither × ASCII** (elegida en #3; referencia
`docs/design/references/dither-ascii.png`): tinta navy sobre papel con
grano. Solo dos colores raw que se intercambian entre modos; todo token
semántico es una mezcla `color-mix` de ellos, así que `.dark` solo
redefine `--ink`, `--paper` y `--grain`.

### 1.1 Raw

| Token     | Light       | Dark         | Uso                                         |
| --------- | ----------- | ------------ | ------------------------------------------- |
| `--ink`   | `#1C2056`   | `#E4E5F4`    | texto, bordes de cajas, bloques, dither     |
| `--paper` | `#EBEBE6`   | `#11143A`    | fondo, texto sobre tinta                    |
| `--grain` | ruido negro | ruido blanco | textura (SVG `feTurbulence`, alfa horneado) |

Los acentos Flexoki (`--red`, `--green`, …) se conservan solo para
feedback de formularios y sintaxis; no son color de marca.

### 1.2 Tokens semánticos

| Token            | Valor (ambos modos) | Notas                  |
| ---------------- | ------------------- | ---------------------- |
| `--bg`           | `--paper`           | fondo de página        |
| `--bg-secondary` | ink 5% en paper     | bloques alternos       |
| `--bg-tertiary`  | ink 9% en paper     | code blocks, inputs    |
| `--tx`           | `--ink`             | texto principal        |
| `--tx-secondary` | ink 80% en paper    | texto de apoyo (≥7:1)  |
| `--tx-muted`     | ink 70% en paper    | meta, fechas (≥5:1)    |
| `--rule`         | ink 25% en paper    | hairlines de listas    |
| `--accent`       | `--ink`             | no hay color de acento |
| `--on-accent`    | `--paper`           | texto sobre tinta      |

En Tailwind v4 (`@theme inline`) se exponen como `bg-background`,
`text-foreground`, `text-tx-secondary`, `border-rule`, `border-ink`, etc.
Las cajas del lenguaje Dither usan `--ink` puro; `--rule` es solo para
divisores discretos.

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

Escala fija (en `global.css`):

```
--space-1: 4px    --space-8:  32px
--space-2: 8px    --space-12: 48px
--space-3: 12px   --space-16: 64px
--space-4: 16px   --space-24: 96px
--space-6: 24px
```

Grid de pixel (en `global.css`, estos sí existen): `--px: 3px`,
`--cell: 12px` (4 filas de dither), `--control-h: 48px`, `--dith-w: 48px`.
Ver §5.2.1.

Convivencia con Tailwind: las utilidades `p-*` y `m-*` siguen usando la
escala default de Tailwind. Estas variables se usan en CSS custom (style
blocks de componentes) para mantener cohesión con el prototipo.

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
- **Brand:** `.boxhead` `EA | ELIAS ABLAN | ©año` en Pixelify 15px (13px
  mobile, solo el nombre). El nombre conserva el efecto scramble al hover;
  una copia invisible fija el ancho de la caja.
- **Nav:** Space Mono 12px uppercase con prefijo `//` en `tx-muted`;
  hover → subrayado punteado. Bajo `lg` baja a su propia fila.
- **Idioma / tema:** `.ctl` (caja 48×48, hover invertido).
- **Contacto:** `.dith-bar` de 48px con `.dith` de 12 px de ancho de
  rampa (8 en mobile).

### 5.2 Hero (`home/Hero.astro`)

- Grid `escalera | columna (max 640px)`. La escalera son 16 escalones de
  tinta con un `.dith` colgando a la derecha; alto redondeado a celdas
  enteras (`round(…, var(--cell))`), ancho a pixeles enteros. Se oculta
  bajo 760px.
- `.boxhead`: `//01 | eyebrow (.box-fill) | ©año`.
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

| Clase                    | Qué es                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `.dith`                  | borde dither Bayer 4×4 (75→12.5%) que se estira al alto del padre; ancho `--dith-w` |
| `.dith-bar`              | barra de tinta sólida que termina en un `.dith` (último hijo, sin padding derecho)  |
| `.ctl`                   | control encajado de 48px; `aria-disabled="true"` lo atenúa                          |
| `.boxhead` + `.box-fill` | fila de label encajada `//LABEL`; `.box-fill` invierte una celda                    |
| `.rule-dots`             | regla doble punteada (2px + 1px)                                                    |
| `.checker`               | damero de celdas de 12px; tamaño en celdas enteras (5×5 por defecto)                |
| `.grain`                 | grano de papel para superficies opacas sobre el body                                |

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
`//01…//05` y un `.dith` de 12 px de rampa; debajo, título serif 19px y una
línea `tx-secondary`. La celda 6 es un `.dith-bar` de 48px "Ver todos los
servicios". Nunca hay precios.

### 5.3 About (`home/AboutSection.astro`)

- Prose serif 18px, corta, entre Selected work y Writing. **Sin h2**: la
  voz no necesita anuncio. En su lugar abre con un `.rule-dots` (la
  sección empieza con `mt-16`, igual que las demás) a ancho de columna.
- Enlace de cierre: `Link.astro` (`.link`) a la página About, `mt-8`, con
  flecha. Sin divisor al final.

### 5.4 Section heading (h2 con §)

Toda sección semántica (Temas, Proyectos, Escritos, Contacto) abre con:

```html
<h2 class="section">Título</h2>
```

Estilo: serif 32px weight 600, con un `§` accent inserto vía `::before`:

```css
h2.section::before {
  content: "§";
  color: var(--accent);
  font-style: italic;
  margin-right: 12px;
  opacity: 0.85;
}
```

### 5.5 Themes / Tag list

Lista en línea (mono 14px, line-height 2) con separadores `·` muted entre
tags. Links a `tag.html` (próximamente — por ahora `#`).

### 5.6 Project row (`ProjectCard.astro`)

Grid `60px 1fr auto`:

- Columna 1: año en mono 12px muted, `padding-top: 6px`.
- Columna 2: título (serif 22px weight 600 con underline sutil),
  `desc` 17px `tx-secondary` (max-width 56ch), `stack` mono 12px muted
  con separadores `·`.
- Columna 3: acciones en mono 12px `tx-secondary`, hover → accent, con
  iconito 11×11 (flecha externa o llaves `</>`).

Mobile (`<600px`): colapsa a una sola columna.

### 5.7 Post row (`PostCard.astro`)

Grid `100px 1fr`:

- Columna 1: fecha mono 12px muted (`2026 · May`), `padding-top: 5px`.
- Columna 2: título serif 19px weight 600 con underline, hover accent.
  Lede 16px `tx-secondary` `margin-top: 4px`.

Mobile: una columna.

### 5.8 Contact form (`ContactForm.astro`)

- Labels mono 11px uppercase tracking 0.12em `tx-secondary`.
- Inputs/textarea: bg `var(--bg-tertiary)`, borde `1px var(--rule)`,
  border-radius `2px`, padding `12px 14px`, serif 16px. Focus → borde
  accent (sin glow).
- Placeholder italic muted.
- Submit: bg accent, texto `on-accent`, serif weight 600 16px,
  border-radius `2px`. Hover → `filter: brightness(0.95)`.
- Feedback en italic verde / red según éxito o error.

### 5.9 Article layout (`blog/[slug].astro`)

Replica el prototipo `article.html`:

- **Eyebrow:** `tag <span class="sep">·</span> reading time <span class="sep">·</span> fecha`
  en mono 12px uppercase, `tx-secondary`.
- **h1:** clamp 36–52px, balance, peso 600.
- **Lede:** descripción del frontmatter en italic 22px `tx-secondary`,
  cerrando con `border-bottom: 1px var(--rule)` + `padding-bottom: 32px`.
- **Byline:** avatar circular accent con inicial italic + meta mono.
- **Body:**
  - `p` con `margin-top: 24px` (`.body > p + p`, especificidad necesaria
    para ganar a `p { margin: 0 }`).
  - `h2` con `§` accent (el espacio bajo el header sticky lo da
    `scroll-padding-top` en `html`, ver §6.6).
  - `h3` sin marker.
  - `code` inline: mono 0.88em, bg `bg-tertiary`, borde rule, radius 3px.
  - `kbd` con borde inferior `2px` para look de tecla.
  - `blockquote`: padding-left 24px, borde izquierdo 2px accent, serif
    italic 22px, `cite` mono 11px uppercase muted.
  - `ul / ol`: markers en color accent.
  - `hr`: 60px centrado, divider visual entre secciones.
- **Codeblock:**
  - Wrapper `bg-tertiary`, borde rule, radius 3px.
  - Header en `bg-secondary`: filename mono 11px uppercase muted, lang en
    accent.
  - Pre: mono 14px line-height 1.75, padding `20px 24px`, scroll horizontal.
  - **Syntax tokens:**
    - `tk-kw` purple, `tk-fn` blue, `tk-str` green, `tk-num` orange,
    - `tk-cmt` tx-muted italic, `tk-op` magenta, `tk-ty` cyan,
    - `tk-bi` red, `tk-pr` tx (texto plano).
- **Footer del artículo:** tags como chips (mono 12px, bg-secondary,
  borde rule, radius 999px) a la izquierda, etiqueta `~ FIN ~` mono muted
  a la derecha.

### 5.10 Site footer (`Footer.astro`)

Columna de 680px (`px-8`, `px-5` mobile), `pt-16 pb-12`.

- Abre con `.rule-dots`.
- Fila de enlaces `.link` (`gap-x-6 gap-y-3`, envuelve): RSS
  (`/[lang]/rss.xml`), GitHub, LinkedIn, WhatsApp, Email, CV
  (Curriculum / Resume según idioma). Los externos abren en pestaña nueva
  (lo decide `Link.astro`).
- Cierre: `.dith-bar` de 36px (3 celdas, sin hover: no es enlace) a ancho
  de columna con `© año ELIAS ABLAN · CARACAS` en mono 11px bold
  mayúsculas y un `.dith` de 12 px de rampa a la derecha.
- Conserva `view-transition-name: site-footer`.

### 5.11 Fundación interactiva (botones, enlaces, campos, cards, foco, movimiento)

Base que reutiliza toda superficie nueva. Los componentes Starwind
(`starwind/Button`, `Input`, `Textarea`, `Label`, `Card`) y `Link.astro`
son envoltorios finos sobre primitivas de `global.css`; imports y props no
cambian.

**Tokens de movimiento** (`:root`):

| Token             | Valor                            | Uso                                  |
| ----------------- | -------------------------------- | ------------------------------------ |
| `--ease-out`      | `cubic-bezier(0.23, 1, 0.32, 1)` | press y todo lo que se mueve         |
| `--dur-hover`     | `150ms`                          | cambios de color, relleno, subrayado |
| `--dur-press`     | `160ms`                          | press, avance de tinta               |
| `--press-scale`   | `0.97`                           | escala al presionar                  |
| `--press-opacity` | `1`                              | opacidad al presionar                |

Con `prefers-reduced-motion: reduce`: `--dur-press: 0ms`,
`--press-scale: 1`, `--press-opacity: 0.8`. Nada se mueve ni escala; el
press se ve como atenuado y el avance de tinta salta sin pasos. Los
cambios de color siguen con su fundido.

**Foco:** un solo anillo para todo, `:where(:focus-visible)` en `@layer
base`: `outline: 2px solid var(--ink)`, offset `3px`. Especificidad cero:
un componente puede cambiarlo (los campos inválidos lo pasan a `--red`).

**Hover** de primitivas y campos con `(hover: hover) and (pointer: fine)`; las utilidades `hover:` de Tailwind (Button `secondary`/`destructive`, Card) con `(hover: hover)`; el enlace de prosa sin condición.
**Disabled** (`:disabled` o `aria-disabled="true"`): opacidad 0.5, sin
hover ni press.

**Button** (`starwind/Button.astro`): Space Mono bold, mayúsculas,
tracking 0.08em, sin radio. Altos en celdas enteras para que el `.dith`
no se corte: `sm` 36px (3 celdas, 11px), `md` 48px (4, 12px), `lg` 60px
(5, 13px), `icon` 48×48.

| Variante      | Primitiva   | Hover                               |
| ------------- | ----------- | ----------------------------------- |
| `primary`     | `.dith-bar` | la tinta sólida avanza una celda    |
| `outline`     | `.ctl`      | invertido (tinta / papel)           |
| `secondary`   | `.ctl`      | relleno `--ui-hover` → invertido    |
| `ghost`       | `.ctl`      | sin borde → invertido               |
| `destructive` | `.ctl`      | borde y texto `--red` → relleno red |

`primary` añade su `.dith` como último hijo (rampa de 8, 12 y 16 px de
ancho según el tamaño; `icon` va sin dither). Press: `scale(0.97)` en
todas.

**Avance de tinta** (`a.dith-bar` / `button.dith-bar`, también Contacto
del Header y los CTA de Hero y Services): al hover el fondo sólido crece
una celda (`--cell`) sobre la rampa, en `steps(4)`, un `--px` por paso.
Es el único hover que se mueve; los demás son fundidos de
color.

**Enlaces:** el de prosa sigue §6.3 (subrayado 1px, tinta al 40% → 100%
en hover). `.link` (lo aplica `Link.astro`) es el enlace suelto de chrome:
Space Mono 12px mayúsculas, tracking 0.08em, con el mismo subrayado,
hover y foco que el de prosa (offset 5px).

**Campos** (`.field`, en `Input` y `Textarea`): caja `1px var(--ink)` sin
radio, fondo transparente sobre el grano; Plex Serif 16px / 24px (16px
evita el zoom de iOS); alto 48px (padding `11px 14px`), textarea mínimo
120px (10 celdas) con resize vertical. Placeholder italic `tx-muted`.
Hover y foco tiñen el fondo a `--bg-secondary`. `aria-invalid="true"` →
borde y anillo `--red`. Disabled → borde punteado + opacidad 0.5.

**Label:** Space Mono 11px mayúsculas, tracking 0.12em, `tx-secondary`.

**Card** (`starwind/Card.astro`): caja `1px var(--ink)`, sin radio, sin
sombra, fondo transparente. Con `hover` el fondo pasa a `--bg-secondary`
(sin elevación).

### 5.12 Página 404 (`pages/404.astro`)

Columna de 680px, centrada en vertical (`min-h-58vh`), mismo lenguaje que
el Hero sin animación de entrada. De arriba abajo: `.boxhead` `// | 404`
(`.box-fill` en el número) con un `.checker` de 5×5 celdas a la derecha
(oculto bajo 600px); h1 en Pixelify con la escala del Hero
(`clamp(26px, 3.5vw, 42px)`, mayúsculas); cuerpo serif 18px `tx-secondary`;
`.rule-dots`; `Button` `primary` `lg` (60px, 5 celdas) a ancho de columna
→ `/[lang]/`; `Link` a Blog. El idioma sale de la URL; el switcher de
idioma queda deshabilitado (`altLangHref={null}`).

### 5.13 Detalles globales

Selección: tinta invertida (§6.2). Foco: el anillo único de §5.11.
Scrollbar: `scrollbar-color` en `html`, pulgar a ink 55% sobre paper y
pista `--bg`, en ambos modos. La transición entre páginas sigue siendo
el crossfade de `transitions.css`; header y footer quedan estáticos.

### 5.14 Página de Project (`[projectsSlug]/[slug].astro`)

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
  - _Side project_: nada a la venta. `.rule-dots`, se repiten demo y repo
    y un `.link` de vuelta a la derecha.

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

Aplicada en `body` y descendientes para evitar el "flash" al togglear.

### 6.5 Anti-FOUC

Script inline síncrono en `<head>` que aplica `.dark` antes de pintar,
leyendo `localStorage.theme` y, en su ausencia, `prefers-color-scheme`.
Idéntico patrón en `astro:after-swap` para SPA navigation.

### 6.6 Anclas bajo el header sticky

`html { scroll-padding-top }` evita que `/#contact` y los h2 de los
artículos queden tapados por el header: 96px en escritorio (header 81px),
128px bajo `lg` (header 109px, el nav baja a su propia fila) y 168px bajo
380px (el nav puede envolver, hasta 156px).

---

## 7. Lo que se omite del prototipo

- **Página de tag (`tag.html`):** todavía no existe ruta `/tags/[slug]/`
  en el proyecto. El sistema visual está documentado y los componentes
  base son los mismos (h2 §, post rows, project rows); cuando se cree la
  ruta, no debería requerir CSS nuevo.
- **Hero CTAs:** el prototipo no los tiene; los del topbar bastan.

---

## 8. Cómo evolucionar este doc

- **Cambio de token:** edita el valor en `global.css` y la tabla en §1.
- **Componente nuevo:** documéntalo en §5 con su grid y tokens antes de
  escribirlo. Si el componente solo se usa una vez, considera si vale la
  pena el doc (probablemente no).
- **Variación de tema:** si tiene que vivir solo en light o solo en dark
  (como la textura de papel), anótala en §6 con la razón.
