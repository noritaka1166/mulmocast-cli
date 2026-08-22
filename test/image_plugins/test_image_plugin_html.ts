import { requireHtmlPlugin } from "./utils.js";
import type { MulmoBeat } from "../../src/types/index.js";
import { imageProcessorParams } from "../fixtures.js";

import test from "node:test";
import assert from "node:assert";

test("test imagePlugin html_tailwind - basic functionality", async () => {
  const plugin = requireHtmlPlugin("html_tailwind");
  assert.equal(plugin.imageType, "html_tailwind");
});

test("test imagePlugin html_tailwind - html method with string", async () => {
  const plugin = requireHtmlPlugin("html_tailwind");
  const beat: MulmoBeat = {
    text: "",
    image: {
      type: "html_tailwind",
      html: "<div class='text-blue-500'>Hello World</div>",
    },
  };

  const result = await plugin.html(imageProcessorParams({ beat }));

  assert.ok(result !== undefined, "the renderer must produce output");
  assert.equal(result, "<div class='text-blue-500'>Hello World</div>");
});

test("test imagePlugin html_tailwind - html method with array", async () => {
  const plugin = requireHtmlPlugin("html_tailwind");
  const beat: MulmoBeat = {
    text: "",
    image: {
      type: "html_tailwind",
      html: ["<h1 class='text-xl font-bold'>Title</h1>", "<p>Paragraph</p>"],
    },
  };

  const result = await plugin.html(imageProcessorParams({ beat }));

  assert.ok(result !== undefined, "the renderer must produce output");
  assert.equal(result, "<h1 class='text-xl font-bold'>Title</h1>\n<p>Paragraph</p>");
});

test("test imagePlugin html_tailwind - html method with wrong type", async () => {
  const plugin = requireHtmlPlugin("html_tailwind");
  const beat: MulmoBeat = {
    text: "",
    image: {
      type: "markdown",
      markdown: "# Test",
    },
  };

  const result = await plugin.html(imageProcessorParams({ beat }));

  assert.equal(result, undefined);
});

test("test imagePlugin html_tailwind - html method with no image", async () => {
  const plugin = requireHtmlPlugin("html_tailwind");
  const beat: MulmoBeat = { text: "" };

  const result = await plugin.html(imageProcessorParams({ beat }));

  assert.equal(result, undefined);
});
