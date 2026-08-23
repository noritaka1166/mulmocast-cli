import test from "node:test";
import assert from "node:assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

import { mulmoScriptSchema } from "../../src/types/schema.js";

/**
 * `assets/schemas/mulmo_script.json` ships in the npm package, and nothing in this repository
 * reads it — `src/mcp/server.ts` stopped doing so in June 2025 and still calls the value it
 * loads MULMO_SCRIPT_JSON_SCHEMA while pointing at html_prompt.json, which is why nobody
 * noticed. With no reader, the only thing that can keep it true is a check.
 *
 * It had drifted for fourteen months: 8,326 bytes against a live schema of 704,645, missing
 * html_tailwind, elements and vision entirely.
 *
 * This runs in the ordinary suite rather than as its own CI job because the generation is one
 * call — the same one `mulmo tool schema` makes — so there is nothing to spawn.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUNDLED = path.resolve(__dirname, "../../assets/schemas/mulmo_script.json");

/**
 * The bytes `yarn schema:write` produces. `GraphAILogger.info` goes through console.log, which
 * appends the newline — so the file is the JSON plus one, and this has to say so or every run
 * would report a one-byte drift.
 */
const generated = (): string => JSON.stringify(z.toJSONSchema(mulmoScriptSchema), null, 2) + "\n";

test("the bundled schema is what the current mulmoScriptSchema produces", () => {
  const bundled = fs.readFileSync(BUNDLED, "utf8");
  assert.strictEqual(bundled, generated(), "assets/schemas/mulmo_script.json is stale — regenerate it with `yarn schema:write` and commit the result");
});

test("the bundled schema carries the beat types the schema declares", () => {
  // A whole-file comparison fails on a one-character change and says nothing about what moved.
  // These are the three that had gone missing while the file sat unread, so they are the ones
  // worth naming: a future drift that drops a beat type reads as this test, not as a diff.
  const bundled = fs.readFileSync(BUNDLED, "utf8");
  ["html_tailwind", "elements", "vision"].forEach((declared) => {
    assert.ok(bundled.includes(`"${declared}"`), `${declared} is missing from the bundled schema`);
  });
});
