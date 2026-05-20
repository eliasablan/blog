# DESIGN.md

Sistema de diseño del blog. Fuente: prototipo HTML/CSS en `claude.ai/design`
(bundle `blog/project/{index,article,tag}.html`). Este documento es la
referencia canónica para implementación; cualquier desviación debe
documentarse aquí antes de aterrizar en código.

---

## 1. Paleta

Basada en **Flexoki** (Steph Ango). Los nombres "raw" no se usan
directamente en componentes — se consumen vía tokens semánticos.

### 1.1 Raw — escala neutra

| Token        | Hex      | Uso típico                          |
| ------------ | -------- | ----------------------------------- |
| `--paper`    | `#FFFCF0` | bg en light                         |
| `--base-50`  | `#F2F0E5` | bg secundario en light              |
| `--base-100` | `#E6E4D9` | ui / bg terciario en light          |
| `--base-150` | `#DAD8CE` | rule / hover en light               |
| `--base-200` | `#CECDC3` | active / tx en dark                 |
| `--base-300` | `#B7B5AC` | —                                   |
| `--base-500` | `#878580` | tx muted en light                   |
| `--base-700` | `#575653` | tx secundario en light              |
| `--base-850` | `#343331` | rule en dark                        |
| `--base-900` | `#282726` | ui / bg terciario en dark           |
| `--base-950` | `#1C1B1A` | bg secundario en dark               |
| `--black`    | `#100F0F` | bg en dark / tx en light            |

### 1.2 Raw — acentos

Cambian de valor entre temas; el _papel_ semántico se mantiene.

| Token       | Light     | Dark      | Uso típico                |
| ----------- | --------- | --------- | ------------------------- |
| `--red`     | `#AF3029` | `#D14D41` | accent principal          |
| `--orange`  | `#BC5215` | `#DA702C` | syntax `tk-num`           |
| `--yellow`  | `#AD8301` | `#D0A215` | `::selection`             |
| `--green`   | `#66800B` | `#879A39` | syntax `tk-str`, success  |
| `--cyan`    | `#24837B` | `#3AA99F` | syntax `tk-ty`            |
| `--blue`    | `#205EA6` | `#4385BE` | syntax `tk-fn`            |
| `--purple`  | `#5E409D` | `#8B7EC8` | syntax `tk-kw`            |
| `--magenta` | `#A02F6F` | `#CE5D97` | syntax `tk-op`            |

### 1.3 Tokens semánticos

Lo que se usa en componentes. Vive en `src/styles/global.css`.

| Token            | Light          | Dark            | Notas                          |
| ---------------- | -------------- | --------------- | ------------------------------ |
| `--bg`           | `--paper`      | `--black`       | fondo de página                |
| `--bg-secondary` | `--base-50`    | `--base-950`    | bloques alternos               |
| `--bg-tertiary`  | `--base-100`   | `--base-900`    | code blocks, inputs            |
| `--tx`           | `--black`      | `--base-200`    | texto principal                |
| `--tx-secondary` | `--base-700`   | `--base-500`    | texto de apoyo                 |
| `--tx-muted`     | `--base-500`   | `--base-700`    | meta, fechas, captions         |
| `--rule`         | `--base-150`   | `--base-850`    | divisores y bordes             |
| `--accent`       | `--red`        | `--red` (D14D41)| brand color                    |
| `--on-accent`    | `--paper`      | `--black`       | texto sobre accent             |

En Tailwind v4 (`@theme inline` en `global.css`) estos se exponen como
`--color-bg`, `--color-foreground`, `--color-tx-secondary`, etc. — las
clases utilitarias `bg-background`, `text-foreground`,
`text-tx-secondary`, `border-rule` están disponibles.

---

## 2. Tipografía

| Familia                | Variable        | Uso                            |
| ---------------------- | --------------- | ------------------------------ |
| **IBM Plex Serif**     | `--font-serif`  | body, h1–h4, prose, byline ital|
| **IBM Plex Mono**      | `--font-mono`   | brand, nav, meta, code, labels |

Pesos cargados: 300 / 400 / 500 / 600 (serif) y 400 / 500 / 600 (mono),
con italics 400 y 600. Vía `<link>` a Google Fonts en `BaseLayout.astro`
con `preconnect` para evitar FOUC.

### Escala

| Rol           | Tamaño                   | Peso | Line-height | Tracking |
| ------------- | ------------------------ | ---- | ----------- | -------- |
| h1 hero/page  | `clamp(36px, 5vw, 52px)` | 600  | 1.08        | -0.018em |
| h2 sección    | `32px`                   | 600  | 1.2         | -0.012em |
| h3            | `22px`                   | 600  | 1.3         | 0        |
| lede          | `22px` italic            | 400  | 1.4         | 0        |
| body          | `18px`                   | 400  | 1.7         | normal   |
| eyebrow / nav | `12px` mono uppercase    | 500  | 1.4         | 0.08em   |
| micro / fin   | `11–12px` mono           | 400  | —           | 0.1em    |

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

Convivencia con Tailwind: las utilidades `p-*` y `m-*` siguen usando la
escala default de Tailwind. Estas variables se usan en CSS custom (style
blocks de componentes) para mantener cohesión con el prototipo.

---

## 4. Layout

- **Ancho de columna:** `680px` para todo el contenido editorial (home,
  artículo, tag).
- **Padding base:** `64px 32px 96px` (≥600px); `40px 20px 64px` en mobile.
- **Topbar:** `padding: 14px 32px` (`12px 20px` mobile).
- Composición: un single column centrado. No hay sidebar.

---

## 5. Componentes

### 5.1 Topbar (`Header.astro`)

- Sticky, `z-50`, fondo `color-mix(in srgb, var(--bg) 92%, transparent)`
  con `backdrop-filter: blur(10px)`. Borde inferior `1px var(--rule)`.
- **Brand:** dot `6×6px` accent + texto `ELIAS ABLAN` (mono 12px uppercase,
  tracking 0.1em, weight 500). Sin underline.
- **Nav:** links mono 12px uppercase tracking 0.08em, `tx-secondary`,
  hover → `tx`.
- **Theme toggle:** botón circular `36×36`, borde `1px var(--rule)`, hover
  → borde accent + texto `tx`. Icono `16×16` (sol/luna SVG inline).
- **Language switcher:** mismo lenguaje que nav (mono uppercase 12px).

### 5.2 Hero (`home/Hero.astro`)

- h1 `Elias Ablan` + lede italic 22px `tx-secondary`.
- Cierra con `border-bottom: 1px var(--rule)` y `margin-bottom: 48px`.
- **Sin botones CTA** (los del topbar bastan).

### 5.3 About (`home/AboutSection.astro`)

- Prose serif 18px directamente debajo del hero. **Sin h2**: la voz no
  necesita anuncio.
- Termina con `<hr>` 60px centrado, `var(--rule)`.

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
  - `h2` con `§` accent + `scroll-margin-top: 80px`.
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

- Mono 12px tracking 0.02em `tx-muted`.
- Padding `32px 32px 48px` (`32px 20px` mobile).
- Borde superior `1px var(--rule)`.
- Layout: izq `© 2026 Elias Ablan · Caracas`, der `RSS · GitHub · Inicio`.

---

## 6. Detalles

### 6.1 Textura de papel (solo light)

Dos `radial-gradient` micros sobre `body` para romper la planitud del
`#FFFCF0`. Se quita en dark (sería ruido sobre `#100F0F`):

```css
body {
  background-image:
    radial-gradient(circle at 25% 30%, rgba(16,15,15,0.018) 0.5px, transparent 1.2px),
    radial-gradient(circle at 75% 70%, rgba(16,15,15,0.013) 0.6px, transparent 1.6px);
  background-size: 3px 3px, 7px 7px;
}
.dark body { background-image: none; }
```

### 6.2 Selección

`::selection { background: var(--yellow); color: var(--black); }` — el
amarillo Flexoki en ambos temas (sin invertir).

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
