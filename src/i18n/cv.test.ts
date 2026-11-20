import assert from "node:assert/strict";
import { test } from "node:test";
import { cvUrl } from "./cv.ts";

test("the Spanish CV points to the Spanish PDF", () => {
  assert.equal(
    cvUrl("es"),
    "https://661udz75j1.ufs.sh/f/FCpxdU1lxaGLcPmSXeRXsAEdoGpN9iBFwnl4Tghjy7VfQOaz",
  );
});
test("the English CV points to the English PDF", () => {
  assert.equal(
    cvUrl("en"),
    "https://661udz75j1.ufs.sh/f/FCpxdU1lxaGL4fcyVMrJZzS9UV6XO5eHj1msfWC7BFMwbtTk",
  );
});
