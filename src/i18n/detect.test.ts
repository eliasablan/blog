import assert from "node:assert/strict";
import { test } from "node:test";
import { detectLang } from "./detect.ts";

const supported = ["es", "en"] as const;

test("unsupported browser language falls back to English", () => {
  assert.equal(detectLang(undefined, "fr-FR", supported), "en");
});
test("es-VE goes to Spanish", () => {
  assert.equal(detectLang(undefined, "es-VE", supported), "es");
});
test("en-US goes to English", () => {
  assert.equal(detectLang(undefined, "en-US", supported), "en");
});
test("no Accept-Language header falls back to English", () => {
  assert.equal(detectLang(undefined, null, supported), "en");
});
test("existing cookie wins over the header", () => {
  assert.equal(detectLang("es", "en-US", supported), "es");
  assert.equal(detectLang("en", "es-VE", supported), "en");
});
test("invalid cookie is ignored", () => {
  assert.equal(detectLang("fr", "es-VE", supported), "es");
});
