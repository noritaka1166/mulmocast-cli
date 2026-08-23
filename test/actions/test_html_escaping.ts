import test from "node:test";
import assert from "node:assert";

import { generateHtmlContent } from "../../src/actions/html.js";
import { createMockContext } from "./utils.js";
import type { MulmoStudioContext } from "../../src/types/index.js";

/**
 * `mulmo html` writes a complete document and every value in it comes from the script. Two
 * of them reach a context where a quote or an angle bracket changes the markup: the script's
 * `title`, and a beat image's path — which for `source: { kind: "path" }` is whatever the
 * author wrote, resolved but not filtered.
 *
 * The output is opened in a browser, so this is not only a rendering question.
 */
const contextWith = (title: string, imageFile?: string): MulmoStudioContext => {
  const context = createMockContext();
  context.studio.script.title = title;
  context.studio.script.beats = [{ text: "a beat" }];
  context.studio.beats = [imageFile ? { imageFile } : {}];
  return context;
};

test("a title cannot close the element it is placed in", () => {
  const html = generateHtmlContent(contextWith("</title><script>alert(1)</script>"));
  assert.ok(!/<title>[^<]*<\/title>\s*<script>alert/.test(html), "the injected script must not survive as markup");
  assert.ok(html.includes("&lt;/title&gt;&lt;script&gt;"), "it survives as text");
});

test("an author's image path cannot escape the src attribute", () => {
  const html = generateHtmlContent(contextWith("T", '/test/output/a" onerror="alert(1)'));
  assert.ok(!/onerror="alert\(1\)"/.test(html), "no attribute may be forged");
  assert.ok(html.includes("&quot; onerror=&quot;"), "the path survives as an attribute value");
});

test("an ordinary title and path are emitted unchanged", () => {
  const html = generateHtmlContent(contextWith("Quarterly Review", "/test/output/images/0p.png"));
  assert.ok(html.includes("<title>Quarterly Review</title>"), "title");
  assert.ok(html.includes('src="images/0p.png"'), "path, relative to the out dir");
});

test("the width option is an attribute too", () => {
  const html = generateHtmlContent(contextWith("T", "/test/output/a.png"), '600" onload="alert(1)');
  assert.ok(!/onload="alert\(1\)"/.test(html));
});
