/**
 * What a CSS parser reads back out of a quoted string: an escaped character is that character.
 *
 * Tests use this instead of re-implementing `escapeCssString` to compute an expected value.
 * Re-implementing it makes the assertion only as good as the copy — it silently stops
 * describing the real rule the moment a fixture grows a character the copy does not handle,
 * which is what CodeQL's js/incomplete-sanitization flagged about the first version of these
 * tests. Asserting the ROUND TRIP instead states the property that actually matters: whatever
 * went in comes back out.
 */
export const cssUnescape = (value: string): string =>
  value
    .replace(/\\a /g, "\n")
    .replace(/\\d /g, "\r")
    .replace(/\\c /g, "\f")
    .replace(/\\([\\'"])/g, "$1");
