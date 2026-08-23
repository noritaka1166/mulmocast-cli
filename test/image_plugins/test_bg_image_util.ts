import test from "node:test";
import assert from "node:assert";
import { resolveCombinedStyle } from "../../src/utils/image_plugins/bg_image_util.js";
import { createMockContext } from "../actions/utils.js";

/**
 * resolveCombinedStyle is the only producer of the CSS that chart, mermaid, markdown and
 * text_slide interpolate into a <style> block, so the terminator is neutralized here rather
 * than at each of the four call sites.
 *
 * The script-controlled CSS arrives as textSlideStyle, built from textSlideParams.cssStyles.
 * A beat's own `style` is a style NAME looked up in the built-in table, not raw CSS, so it
 * cannot carry a terminator — pinned below so that stays true.
 */

const paramsWith = (textSlideStyle: string) => ({
  context: createMockContext(),
  textSlideStyle,
});

const ATTACK = 'h1{color:red}</style><img src=x onerror="pwn()">';

test("script-supplied css cannot terminate the style block it is placed in", async () => {
  const css = await resolveCombinedStyle(paramsWith(ATTACK), undefined, undefined);
  assert.ok(!/<\/style/i.test(css), "no terminator may survive");
  assert.ok(css.includes("h1{color:red}"), "the author's CSS is kept, not dropped");
});

test("a beat style is a name, so an unknown one falls back rather than being emitted", async () => {
  const css = await resolveCombinedStyle(paramsWith("h1 { color: rgb(1, 1, 1); }"), undefined, ATTACK);
  assert.strictEqual(css, "h1 { color: rgb(1, 1, 1); }", "the unknown name is replaced by the fallback style");
});

test("ordinary CSS passes through resolveCombinedStyle unchanged", async () => {
  const style = "h1 { color: rgb(9, 9, 9); }";
  assert.strictEqual(await resolveCombinedStyle(paramsWith(style), undefined, undefined), style);
});

/**
 * The wiring, not the helper.
 *
 * escapeCssString has its own tests, but those pass whether or not resolveCombinedStyle
 * calls it — removing the call at both sites left the whole suite green, which is how a
 * guard stops guarding without anything going red.
 *
 * `base64ToDataUrl` returns a value that already starts with `data:` verbatim, so this
 * reaches `url('...')` untouched and needs no network. It is also the reason the attack
 * surface is not only a remote server's content-type header: an author's own base64 source
 * can carry the whole data URL.
 */
const BREAKOUT = "data:image/png;');} body{display:none} .x{background:url('x";

/** Where the CSS string opened by `url('` actually ends: the first quote CSS does not read as escaped. */
const urlArgument = (css: string): string => {
  const start = css.indexOf("url('") + "url('".length;
  // The fixture carries no backslash of its own, so a preceding backslash here is always one
  // the escaper added.
  for (let index = start; index < css.length; index++) {
    if (css[index] === "'" && css[index - 1] !== "\\") return css.slice(start, index);
  }
  return css.slice(start);
};

test("a background image cannot break out of the url() it is placed in", async () => {
  const css = await resolveCombinedStyle(paramsWith(""), { source: { kind: "base64", data: BREAKOUT } }, undefined);
  assert.ok(css.includes("body{display:none}"), "the value is carried through, not stripped");
  assert.strictEqual(urlArgument(css), BREAKOUT.replace(/'/g, "\\'"), "the whole payload stays inside the string, quotes escaped");
});

/**
 * `backgroundImageToCSS` has TWO url() sinks — this one, and the default branch above.
 * Mutating them together says nothing about either: with only the default-branch test in
 * place, removing the escape from line 98 alone left the suite green (25 pass / 0 fail),
 * while removing it from line 114 alone went red. A sweep has to move one site at a time.
 */
test("the opacity branch cannot break out of its url() either", async () => {
  const css = await resolveCombinedStyle(paramsWith(""), { source: { kind: "base64", data: BREAKOUT }, opacity: 0.5 }, undefined);
  assert.ok(css.includes("body::before"), "this is the pseudo-element branch, not the default one");
  assert.strictEqual(urlArgument(css), BREAKOUT.replace(/'/g, "\\'"), "the whole payload stays inside the string, quotes escaped");
});

test("an ordinary background image is emitted unescaped", async () => {
  const ordinary = "data:image/png;base64,iVBORw0KGgo=";
  const css = await resolveCombinedStyle(paramsWith(""), { source: { kind: "base64", data: ordinary } }, undefined);
  assert.ok(css.includes(`url('${ordinary}')`), "byte for byte, so the escaping is not paid by ordinary input");
});
