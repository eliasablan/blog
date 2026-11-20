# Astro Starter Kit: Minimal

## Deploy to Cloudflare Workers

The site uses static pages plus server routes for language selection and the
contact form. The Cloudflare adapter builds both for `https://eablan.dev`.

```sh
pnpm install
pnpm exec wrangler login
pnpm deploy
```

Configure the contact form's runtime secrets with `pnpm exec wrangler secret put`
for each name: `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_TO_EMAIL`. See
`.env.example` for the expected values. For local development, use `.env` or
`.dev.vars`; never commit credentials.

The domain must be an active zone in the same Cloudflare account. The custom
domain in `wrangler.jsonc` lets Cloudflare manage its DNS record and certificate.

## Local checks

Run `pnpm format:check`, `pnpm astro check`, and `pnpm test` for formatting,
type diagnostics, and unit tests.

For browser checks, build the Worker and start it locally with Wrangler:

```sh
pnpm exec playwright install --only-shell chromium
pnpm build
pnpm preview
```

From another terminal, confirm that the preview serves the site and run the
Chromium checks:

```sh
curl --fail http://127.0.0.1:4518/en/ -o /dev/null
pnpm test:browser
```

See [Agent handoff and worktree cleanup](docs/agents/handoff.md) when resuming
work from another coding session or retiring its branches.

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Serves the built Worker on localhost:4518        |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
