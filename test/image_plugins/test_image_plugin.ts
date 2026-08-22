import { requireImagePlugin } from "./utils.js";
import { imageProcessorParams, contextWithDir } from "../fixtures.js";
import { resolve } from "node:path";

import test from "node:test";
import assert from "node:assert";

test("test imagePlugin mermaid", async () => {
  const plugin = requireImagePlugin("mermaid");
  assert.equal(plugin.imageType, "mermaid");

  const path = plugin.path(imageProcessorParams({ beat: { text: "" }, imagePath: "expectImagePath" }));
  assert.equal(path, "expectImagePath");
});

test("test imagePlugin image url", async () => {
  const plugin = requireImagePlugin("image");
  assert.equal(plugin.imageType, "image");

  const path = plugin.path(
    imageProcessorParams({
      imagePath: "expectImagePath",
      beat: {
        text: "",
        image: {
          type: "image",
          source: { kind: "url", url: "https://raw.githubusercontent.com/receptron/mulmocast-media/refs/heads/main/characters/min_anime.pn" },
        },
      },
    }),
  );
  assert.equal(path, "expectImagePath");
});

test("test imagePlugin image path", async () => {
  const plugin = requireImagePlugin("image");
  assert.equal(plugin.imageType, "image");

  const path = plugin.path(
    imageProcessorParams({
      imagePath: "unexpectImagePath",
      beat: {
        text: "",
        image: {
          type: "image",
          source: { kind: "path", path: "expectImagePath" },
        },
      },
      context: contextWithDir("/bin"),
    }),
  );
  assert.equal(path, resolve("/bin", "expectImagePath"));
});

test("test imagePlugin beat", async () => {
  const plugin = requireImagePlugin("beat");
  assert.equal(plugin.imageType, "beat");

  const path = plugin.path(imageProcessorParams({ beat: { text: "", image: { type: "beat" } }, imagePath: "expectImagePath" }));
  assert.strictEqual(path, undefined);
});
