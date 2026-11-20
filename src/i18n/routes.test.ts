import assert from "node:assert/strict";
import { test } from "node:test";
import { sectionPath } from "./routes.ts";

test("Services lives at /en/services and /es/servicios", () => {
  assert.equal(sectionPath("en", "services"), "/en/services");
  assert.equal(sectionPath("es", "services"), "/es/servicios");
});
test("About lives at /en/about and /es/sobre-mi", () => {
  assert.equal(sectionPath("en", "about"), "/en/about");
  assert.equal(sectionPath("es", "about"), "/es/sobre-mi");
});
