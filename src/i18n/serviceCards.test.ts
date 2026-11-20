import assert from "node:assert/strict";
import { test } from "node:test";
import { serviceCardBlurbs } from "./serviceCards.ts";
import { serviceSlugs } from "./services.ts";

test("Home has a blurb for each of the five Services, in both languages", () => {
  assert.equal(serviceSlugs.length, 5);
  assert.deepEqual(
    Object.keys(serviceCardBlurbs).sort(),
    [...serviceSlugs].sort(),
  );
  for (const slug of serviceSlugs) {
    for (const lang of ["es", "en"] as const) {
      assert.ok(serviceCardBlurbs[slug][lang].trim(), `${slug} ${lang}`);
    }
  }
});

test("card copy never shows a price and keeps the site voice", () => {
  for (const slug of serviceSlugs) {
    for (const lang of ["es", "en"] as const) {
      const text = serviceCardBlurbs[slug][lang];
      assert.doesNotMatch(text, /[$€]|\busd\b|\bprecio|\bprice/i, slug);
      assert.doesNotMatch(text, /[!—]|10x/i, slug);
    }
  }
});
