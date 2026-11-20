import type { AstroUserConfig } from "astro";

type ShikiConfig = NonNullable<
  NonNullable<AstroUserConfig["markdown"]>["shikiConfig"]
>;
type Transformer = NonNullable<ShikiConfig["transformers"]>[number];

/** Header text for a code block: its language and, when the fence says
 *  ```ts title="file.ts", the file name. */
export function codeFrameLabel(
  lang: string,
  meta: string | undefined,
): { lang: string; title?: string } {
  const label = lang === "plaintext" ? "text" : lang;
  const title = meta?.match(/title="([^"]+)"/)?.[1];
  return title ? { lang: label, title } : { lang: label };
}

/** Syntax theme in ink tints only. Colours are the --code-* tokens from
 *  global.css, so both modes come for free; weight and style, not hue, tell
 *  tokens apart: bold keywords, italic comments, softer strings and
 *  punctuation. */
export const inkTheme = {
  name: "ink",
  type: "light",
  colors: {
    "editor.foreground": "var(--code-fg)",
    "editor.background": "#00000000",
  },
  tokenColors: [
    { settings: { foreground: "var(--code-fg)" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--code-cmt)", fontStyle: "italic" },
    },
    {
      scope: ["keyword", "storage", "keyword.operator.new"],
      settings: { foreground: "var(--code-fg)", fontStyle: "bold" },
    },
    {
      scope: ["string", "string punctuation.definition.string"],
      settings: { foreground: "var(--code-str)", fontStyle: "" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator"],
      settings: { foreground: "var(--code-punct)", fontStyle: "" },
    },
  ],
} satisfies ShikiConfig["theme"];

const el = (
  tagName: string,
  className: string,
  children: unknown[],
  extra: Record<string, string> = {},
) => ({
  type: "element" as const,
  tagName,
  properties: { className: [className], ...extra },
  children,
});

/** Wraps each highlighted <pre> in a figure whose caption is the header:
 *  an ink label (//TS) dissolving into a dither edge, then the file name. */
export const codeFrame: Transformer = {
  name: "code-frame",
  root(root) {
    const pre = root.children[0];
    if (pre?.type !== "element" || pre.tagName !== "pre") return;
    const { lang, title } = codeFrameLabel(
      this.options.lang,
      this.options.meta?.__raw,
    );
    const head = el("figcaption", "code-head", [
      el("span", "code-lang dith-bar", [
        { type: "text", value: lang },
        el("span", "dith", [], { ariaHidden: "true" }),
      ]),
      ...(title
        ? [el("span", "code-title", [{ type: "text", value: title }])]
        : []),
    ]);
    root.children = [el("figure", "code", [head, pre]) as typeof pre];
  },
};
