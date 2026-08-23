import type { GraphAI } from "graphai";
import type { ImageProcessorParams, MulmoBeat, MulmoPresentationStyle, MulmoStudioContext } from "../src/types/index.js";
import { mulmoPresentationStyleSchema } from "../src/types/schema.js";
import type { SlideTheme } from "@mulmocast/deck";
import { createMockContext } from "./actions/utils.js";

/**
 * A complete `ImageProcessorParams` around a beat.
 *
 * The renderers read only `beat` — `movie` and `vision` also read `context`, and nothing
 * reads the rest — which is why the tests pass `{ beat }`. The parameter type does not say
 * so: it requires `context`, `imagePath`, `textSlideStyle` and `canvasSize` too. Narrowing
 * the type is the change that would make it tell the truth, and it is a production change,
 * so this supplies the unread fields instead.
 *
 * They are unread, so adding them cannot change what a renderer does — verified by reading
 * each one's destructuring, not by assuming.
 */
export const imageProcessorParams = (params: Partial<ImageProcessorParams> & { beat: MulmoBeat }): ImageProcessorParams => ({
  context: createMockContext(),
  imagePath: "/test/path/image.png",
  textSlideStyle: "",
  canvasSize: { width: 1280, height: 720 },
  ...params,
});

/**
 * The mock context with a specific `mulmoFileDirPath`.
 *
 * Source-backed plugins resolve a relative path against that one field, so the tests used to
 * build `{ fileDirs: { mulmoFileDirPath } }` and nothing else — which is not a
 * `MulmoStudioContext`. The rest of the mock is inert for these plugins.
 */
export const contextWithDir = (mulmoFileDirPath: string): MulmoStudioContext => {
  const context = createMockContext();
  return { ...context, fileDirs: { ...context.fileDirs, mulmoFileDirPath } };
};

/**
 * The mock context with a slide theme, or without one.
 *
 * The mock's `presentationStyle` carries only `imageParams`, so it is already the
 * "no slide theme configured" case the fallback tests want; passing a theme adds the one
 * field those tests vary. The literals these replaced were not `MulmoStudioContext` at all
 * and only compiled behind an `as`.
 */
export const contextWithSlideTheme = (theme?: SlideTheme): MulmoStudioContext => {
  const context = createMockContext();
  return theme ? { ...context, presentationStyle: { ...context.presentationStyle, slideParams: { theme } } } : context;
};

/**
 * A `MulmoPresentationStyle` from a partial one.
 *
 * `$mulmocast` is the only field the schema cannot default; everything else it fills exactly
 * as it would for a real script. The fixtures this replaces were partial literals that only
 * compiled where the parameter was cast, and they left the defaulted fields undefined —
 * which is not a state production can produce.
 */
export const presentationStyleFixture = (partial: Record<string, unknown> = {}): MulmoPresentationStyle =>
  mulmoPresentationStyleSchema.parse({ $mulmocast: { version: "1.1" }, ...partial });

/**
 * The GraphAI plumbing an `AgentFunctionContext` carries and no mulmo agent reads.
 *
 * The graph fills it in at runtime, so a test that calls an agent function directly has to
 * supply it. Each caller adds its own `config` / `params`, which are the parts a test varies.
 */
export const agentCallContext = {
  filterParams: {},
  debugInfo: {
    verbose: false,
    nodeId: "",
    state: "",
    retry: 0,
    subGraphs: new Map<string, GraphAI>(),
  },
};
