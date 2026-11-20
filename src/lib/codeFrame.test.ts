import assert from "node:assert/strict";
import { test } from "node:test";
import { codeFrameLabel } from "./codeFrame.ts";

test("a fence with a title shows its language and file name", () => {
  assert.deepEqual(codeFrameLabel("ts", 'title="astro.config.mjs"'), {
    lang: "ts",
    title: "astro.config.mjs",
  });
});

test("a fence without a title shows only its language", () => {
  assert.deepEqual(codeFrameLabel("bash", "{1,3}"), { lang: "bash" });
  assert.deepEqual(codeFrameLabel("bash", undefined), { lang: "bash" });
});

test("a fence without a language is labelled as text", () => {
  assert.deepEqual(codeFrameLabel("plaintext", undefined), { lang: "text" });
});
