import assert from "node:assert/strict";
import { test } from "node:test";
import { processSteps, services, serviceSlugs } from "./services.ts";
import { ui } from "./ui.ts";

const langs = ["en", "es"] as const;
type L = (typeof langs)[number];

const uiKeys = (lang: L) =>
  Object.keys(ui[lang]).filter((k) => k.startsWith("services."));

/** Every visible string of the page in one language. */
function allCopy(lang: L): string[] {
  const cards = serviceSlugs.flatMap((slug) => {
    const s = services[slug];
    return [
      s.title[lang],
      s.summary[lang],
      ...s.items[lang],
      s.proof?.[lang] ?? "",
      s.link?.label[lang] ?? "",
    ];
  });
  const steps = processSteps.flatMap((p) => [p.title[lang], p.body[lang]]);
  const page = uiKeys(lang).map((k) => (ui[lang] as Record<string, string>)[k]);
  return [...cards, ...steps, ...page].filter(Boolean);
}

test("the five Services appear in spec order", () => {
  assert.deepEqual(serviceSlugs, [
    "websites",
    "web-apps",
    "hosting",
    "it-servers",
    "business-systems",
  ]);
});

test("every Service has a title, summary and items in both languages", () => {
  for (const slug of serviceSlugs) {
    for (const lang of langs) {
      const s = services[slug];
      assert.ok(s.title[lang].trim(), `${slug} title ${lang}`);
      assert.ok(s.summary[lang].trim(), `${slug} summary ${lang}`);
      assert.ok(s.items[lang].length >= 3, `${slug} items ${lang}`);
    }
    assert.equal(
      services[slug].items.en.length,
      services[slug].items.es.length,
      `${slug} item counts match across languages`,
    );
  }
});

test("page copy exists with the same keys in both languages", () => {
  assert.ok(uiKeys("en").length > 0);
  assert.deepEqual(uiKeys("es").sort(), uiKeys("en").sort());
});

test("no prices are published", () => {
  const price =
    /[$€]|\b(usd|eur|bs\.?|bolívares|dólares|dollars)\b|\d+\s?(usd|\$|bs)/i;
  for (const lang of langs) {
    for (const text of allCopy(lang)) {
      assert.ok(!price.test(text), `price-like text in ${lang}: ${text}`);
    }
  }
});

test("copy follows the brand voice", () => {
  const banned = /!|—|10x|rockstar|ninja|synergy|\bsolutions\b|\bsoluciones\b/i;
  for (const lang of langs) {
    for (const text of allCopy(lang)) {
      assert.ok(!banned.test(text), `off-voice text in ${lang}: ${text}`);
    }
  }
});

test("Tanques Australianos is linked from the website service", () => {
  assert.equal(services.websites.link?.to, "tanques");
  assert.equal(
    serviceSlugs.filter((slug) => services[slug].link?.to === "tanques").length,
    1,
  );
});
