import type { ImageProcessorParams, MulmoBeat, MulmoStudioContext } from "../src/types/index.js";
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
