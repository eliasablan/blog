import assert from "node:assert/strict";
import { test } from "node:test";
import { serviceCardOrder, serviceCards } from "./serviceCards.ts";

test("Home shows the five Services from the spec, in order", () => {
  assert.deepEqual(serviceCardOrder, [
    "websites",
    "web-apps",
    "hosting",
    "it-servers",
    "business-systems",
  ]);
});

test("card copy never shows a price and keeps the site voice", () => {
  for (const slug of serviceCardOrder) {
    for (const lang of ["es", "en"] as const) {
      const text = `${serviceCards[slug].title[lang]} ${serviceCards[slug].body[lang]}`;
      assert.doesNotMatch(text, /[$€]|\busd\b|\bprecio|\bprice/i, slug);
      assert.doesNotMatch(text, /[!—]|10x/i, slug);
    }
  }
});

test("every card has a title and a one-liner in both languages", () => {
  for (const slug of serviceCardOrder) {
    for (const lang of ["es", "en"] as const) {
      assert.ok(serviceCards[slug].title[lang].trim(), `${slug} title ${lang}`);
      assert.ok(serviceCards[slug].body[lang].trim(), `${slug} body ${lang}`);
    }
  }
});
