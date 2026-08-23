import test from "node:test";
import assert from "node:assert";
import fs from "fs";
import os from "os";
import path from "path";

import { html, htmlFilePath } from "../../src/actions/html.js";
import { markdown, markdownFilePath } from "../../src/actions/markdown.js";
import { createMockContext } from "./utils.js";
import type { MulmoStudioContext } from "../../src/types/index.js";

/**
 * `mulmo html` writes a complete document and every value in it comes from the script. Two
 * of them reach a context where a quote or an angle bracket changes the markup: the script's
 * `title`, and a beat image's path — which for `source: { kind: "path" }` is whatever the
 * author wrote, resolved but not filtered.
 *
 * Driven through the exported `html()` rather than the generator behind it. That generator is
 * deliberately not exported — `actions/index.ts` re-exports this module with `export *`, so
 * exporting it to reach it from here would put it in the published package's public API — and
 * going through `html()` covers the path that actually ships, file write included.
 */
const run = async (title: string, imageFile?: string, imageWidth?: string): Promise<string> => {
  const outDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "mulmo-html-escape-"));
  try {
    const context: MulmoStudioContext = createMockContext();
    context.fileDirs = { ...context.fileDirs, outDirPath };
    context.studio.script.title = title;
    context.studio.script.beats = [{ text: "a beat" }];
    context.studio.beats = [imageFile ? { imageFile: path.join(outDirPath, imageFile) } : {}];
    await html(context, imageWidth);
    return fs.readFileSync(htmlFilePath(context), "utf8");
  } finally {
    fs.rmSync(outDirPath, { recursive: true, force: true });
  }
};

test("a title cannot close the element it is placed in", async () => {
  const written = await run("</title><script>alert(1)</script>");
  assert.ok(!/<title>[^<]*<\/title>\s*<script>alert/.test(written), "the injected script must not survive as markup");
  assert.ok(written.includes("&lt;/title&gt;&lt;script&gt;"), "it survives as text");
});

test("an author's image path cannot escape the src attribute", async () => {
  const written = await run("T", 'a" onerror="alert(1)');
  assert.ok(!/onerror="alert\(1\)"/.test(written), "no attribute may be forged");
  assert.ok(written.includes("&quot; onerror=&quot;"), "the path survives as an attribute value");
});

test("an ordinary title and path are emitted unchanged", async () => {
  const written = await run("Quarterly Review", "0p.png");
  assert.ok(written.includes("<title>Quarterly Review</title>"), "title");
  assert.ok(written.includes('src="0p.png"'), "path, relative to the out dir");
});

test("the width option is an attribute too", async () => {
  const written = await run("T", "a.png", '600" onload="alert(1)');
  assert.ok(!/onload="alert\(1\)"/.test(written));
  assert.ok(written.includes("&quot; onload=&quot;"));
});

/**
 * `mulmo markdown` emits the same `<img>` tag from the same author-controlled path when a
 * width is given, and an HTML tag is HTML wherever the markdown is rendered. Same class, same
 * input, same shape — found by sweeping for the pattern rather than by a review comment.
 *
 * The other branch writes `![alt](path)`, which is markdown syntax rather than HTML and needs
 * a different escape; that is not this PR and is reported on #1535.
 */
const runMarkdown = async (imageFile: string, imageWidth: string): Promise<string> => {
  const outDirPath = fs.mkdtempSync(path.join(os.tmpdir(), "mulmo-md-escape-"));
  try {
    const context: MulmoStudioContext = createMockContext();
    context.fileDirs = { ...context.fileDirs, outDirPath };
    context.studio.script.beats = [{ text: "a beat" }];
    context.studio.beats = [{ imageFile: path.join(outDirPath, imageFile) }];
    await markdown(context, imageWidth);
    return fs.readFileSync(markdownFilePath(context), "utf8");
  } finally {
    fs.rmSync(outDirPath, { recursive: true, force: true });
  }
};

test("the markdown export escapes the same img attributes the html export does", async () => {
  const written = await runMarkdown('a" onerror="alert(1)', "600");
  assert.ok(!/onerror="alert\(1\)"/.test(written), "no attribute may be forged");
  assert.ok(written.includes("&quot; onerror=&quot;"), "the path survives as an attribute value");
});

test("the markdown width option is an attribute too", async () => {
  // Not covered by the test above: that one puts the payload in the PATH, and a width of
  // "600" is unchanged by escaping — so mutating the width escape alone stayed green.
  const written = await runMarkdown("a.png", '600" onload="alert(1)');
  assert.ok(!/onload="alert\(1\)"/.test(written));
  assert.ok(written.includes("&quot; onload=&quot;"));
});

test("an ordinary markdown img is emitted unchanged", async () => {
  const written = await runMarkdown("0p.png", "600");
  assert.ok(written.includes('<img src="0p.png" alt="Beat 1" width="600" />'), "ordinary output untouched");
});
