# Use Prettier (not Biome) for formatting

We picked Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` over Biome because Biome currently formats only the frontmatter of `.astro` files, not the template body. With 28 `.astro` and 22 `.md`/`.mdx` files vs 7 `.ts` files, Biome would leave the bulk of the codebase unformatted. A hybrid (Biome + Prettier) was rejected as overkill for a solo blog — one tool, one config, full coverage is simpler.

## Considered Options

- **Pure Biome** — fast, lint+format in one tool, but `.astro` templates and MDX stay unformatted.
- **Hybrid Biome + Prettier** — full coverage and linting, but two tools, two configs, two editor extensions for marginal speed gains at this scale.
- **Pure Prettier** *(chosen)* — single tool, single config, formats everything; loses the linting Biome would have provided (acceptable: TypeScript + `astro check` cover most of it).

## Consequences

- Tailwind class sorting works via `prettier-plugin-tailwindcss` with `tailwindStylesheet: ./src/styles/global.css` (Tailwind v4 CSS-first config).
- MDX content under `src/content/` is ignored — prose stays under author control.
- If Biome ships full `.astro` template support later, revisiting is cheap (config swap, one reformat commit).
