import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { after, before, test } from "node:test";
import { chromium } from "playwright";

const baseURL = process.env.BROWSER_TEST_URL ?? "http://127.0.0.1:4518";
const axePath = createRequire(import.meta.url).resolve("axe-core/axe.min.js");
let browser;

before(async () => {
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
});

test("mobile About pages fit the viewport and name the language switcher", async () => {
  const page = await browser.newPage({
    baseURL,
    viewport: { width: 375, height: 900 },
  });
  try {
    for (const [path, target] of [
      ["/es/sobre-mi/", "EN"],
      ["/en/about/", "ES"],
    ]) {
      assert.equal((await page.goto(path)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      assert(overflow <= 1, `${path} overflows by ${overflow}px`);
      const switcher = page.getByRole("link", {
        name: new RegExp(`^${target}\\b`),
      });
      assert.equal(
        await switcher.getAttribute("hreflang"),
        target.toLowerCase(),
      );
      await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run({
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
          },
        });
        return result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        }));
      });
      assert.deepEqual(violations, [], path);
    }
  } finally {
    await page.close();
  }
});

test("a keyboard-focused Topic keeps a visible outline under the pointer", async () => {
  const page = await browser.newPage({
    baseURL,
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  try {
    assert.equal((await page.goto("/es/blog/")).status(), 200);
    const topic = page.locator('#topics a[href*="/tags/"]').first();
    for (let i = 0; i < 24; i++) {
      await page.keyboard.press("Tab");
      if (await topic.evaluate((element) => element === document.activeElement))
        break;
    }
    assert(
      await topic.evaluate((element) => element.matches(":focus-visible")),
    );
    await topic.hover();
    const outline = await topic.evaluate(async (element) => {
      await Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      );
      const style = getComputedStyle(element);
      return {
        focusedAndHovered: element.matches(":hover:focus-visible"),
        width: parseFloat(style.outlineWidth),
        style: style.outlineStyle,
        color: style.outlineColor,
        background: style.backgroundColor,
      };
    });
    assert(outline.focusedAndHovered);
    assert(outline.width >= 2);
    assert.notEqual(outline.style, "none");
    assert.notEqual(outline.color, outline.background);
  } finally {
    await page.close();
  }
});

test("missing pages return a localized HTTP 404", async () => {
  const page = await browser.newPage({ baseURL });
  try {
    for (const [lang, heading] of [
      ["es", /esta página no está disponible/i],
      ["en", /this page is not available/i],
    ]) {
      assert.equal(
        (await page.goto(`/${lang}/missing-browser-test-page`)).status(),
        404,
      );
      assert.equal(await page.locator("html").getAttribute("lang"), lang);
      assert(
        await page
          .getByRole("heading", { name: heading, level: 1 })
          .isVisible(),
      );
    }
  } finally {
    await page.close();
  }
});
