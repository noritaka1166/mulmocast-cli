/**
 * Escaping for JSON embedded in an inline script. Pure — no Node, no filesystem — because the
 * Node render path and the browser fragment path embed the same values and must neutralize
 * them the same way.
 *
 * HTML text and attributes are handled by escapeHtml from @mulmocast/deck; this module exists
 * only for the inline-script context, which that helper does not cover.
 *
 * The lookup goes through a Map rather than an object literal so a value naming an
 * Object.prototype member cannot resolve through the prototype chain.
 */

// JSON.stringify emits these only from inside string literals, so replacing them with their
// \u escapes leaves the parsed value identical while stopping `</script>` from terminating the
// block the JSON is embedded in. U+2028 / U+2029 are valid JSON output but were line
// terminators in JavaScript source before ES2019.
const SCRIPT_JSON_ESCAPES = new Map([
  ["<", "\\u003c"],
  [">", "\\u003e"],
  ["&", "\\u0026"],
  ["\u2028", "\\u2028"],
  ["\u2029", "\\u2029"],
]);

/** Neutralize the output of JSON.stringify for embedding inside an inline `<script>`. */
export const escapeJsonForScript = (json: string): string => json.replace(/[<>&\u2028\u2029]/g, (character) => SCRIPT_JSON_ESCAPES.get(character) ?? character);

// A CSS string ends at the first unescaped quote of the kind that opened it, and a raw
// newline ends the declaration outright, so a value carrying either escapes the string it
// was placed in. Backslash is what CSS defines for both; a line break becomes its hex escape
// with the terminating space CSS requires. Both quote characters are escaped so a caller may
// use either, and every other character — including the base64 body of a data URL — is left
// exactly as it was.
const CSS_STRING_ESCAPES = new Map([
  ["\\", "\\\\"],
  ["'", "\\'"],
  ['"', '\\"'],
  ["\n", "\\a "],
  ["\r", "\\d "],
  ["\f", "\\c "],
]);

/** Neutralize a value placed inside a quoted CSS string, such as the argument of `url()`. */
export const escapeCssString = (value: string): string => value.replace(/[\\'"\n\r\f]/g, (character) => CSS_STRING_ESCAPES.get(character) ?? character);

// A <style> element holds raw text: nothing inside it is parsed as markup except the closing
// tag, so `</style` is the only sequence that can end it. Neutralizing just that keeps
// author-supplied CSS working, which escaping the whole string would not. `\3c ` is the CSS
// escape for `<`, and the matched text is carried through unchanged so a `</STYLE>` written
// inside a CSS string keeps its casing as well as its value.
export const neutralizeStyleTerminator = (css: string): string => css.replace(/<\/style/gi, (terminator) => `\\3c ${terminator.slice(1)}`);
