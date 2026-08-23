import test from "node:test";
import assert from "node:assert";

import { html as slideHtml } from "../../src/utils/image_plugins/slide.js";
import { createMockContext } from "../actions/utils.js";

/**
 * `mulmo html` concatenates every beat's `html()` into one `<body>`. A slide beat used to
 * return what `generateSlideHTML` produces — a whole document — so an export with four slides
 * loaded the Tailwind CDN five times, assigned `tailwind.config` four times over each other,
 * and leaked `html, body { overflow: hidden }` into the page, which left a document of
 * stacked slides unscrollable.
 *
 * The PNG path still uses `generateSlideHTML`, and should: there the slide IS the page.
 */
const slideBeat = (title: string) => ({
  text: "",
  image: { type: "slide" as const, slide: { layout: "title" as const, title, subtitle: "S" } },
});

const render = async (titles: string[]): Promise<string> => {
  const context = createMockContext();
  const parts: string[] = [];
  for (const title of titles) {
    parts.push(String((await slideHtml!({ beat: slideBeat(title), context })) ?? ""));
  }
  return parts.join("\n\n");
};

const occurrences = (body: string, pattern: RegExp): number => (body.match(pattern) ?? []).length;

test("a slide beat contributes a fragment, not a document", async () => {
  const body = await render(["A"]);
  assert.strictEqual(occurrences(body, /<!DOCTYPE html>/gi), 0, "no doctype");
  assert.strictEqual(occurrences(body, /<html[\s>]/gi), 0, "no <html>");
  assert.strictEqual(occurrences(body, /<head[\s>]/gi), 0, "no <head>");
  assert.ok(body.includes("mulmo-slide-"), "the slide's own markup is there");
});

test("nothing shared is emitted per beat", async () => {
  // Each of these is what a whole document per slide brought with it, and each is the page's
  // job exactly once — the CDN loads, the config assignment, and the global reset that made
  // the export unscrollable.
  const body = await render(["A", "B", "C", "D"]);
  assert.strictEqual(occurrences(body, /cdn\.tailwindcss\.com/g), 0, "Tailwind belongs to the page");
  assert.strictEqual(occurrences(body, /tailwind\.config\s*=/g), 0, "no config assignments to race");
  assert.strictEqual(occurrences(body, /html,\s*body\s*\{/g), 0, "no global reset may escape");
});

test("each slide's rules are scoped to a class of its own", async () => {
  const body = await render(["A", "B", "C", "D"]);
  const classes = [...new Set(body.match(/mulmo-slide-\d+/g) ?? [])];
  assert.strictEqual(classes.length, 4, `four slides, four scopes — got ${JSON.stringify(classes)}`);
});

test("the fragment gets a box, because it is sized to fill one", async () => {
  // deck's fragment root is `w-full h-full`; in a host that gives it no height it renders
  // nothing at all, silently. The same failure the swipe root had (#1567).
  const body = await render(["A"]);
  assert.match(body, /aspect-ratio:\s*16\s*\/\s*9/, "a slide-shaped container");
});
