import { type MulmoStudioContext, type MulmoBeat } from "../../src/types/index.js";
import { mulmoScriptSchema, mulmoPresentationStyleSchema } from "../../src/types/schema.js";
import { currentMulmoScriptVersion } from "../../src/types/const.js";

/**
 * A context shaped like the one the app builds.
 *
 * The script and the presentation style go through their schemas rather than being written
 * out by hand: the defaults they fill are part of what every caller sees, and a literal that
 * omits them is a state production cannot reach. This used to be a partial object that only
 * satisfied `MulmoStudioContext` because nothing checked it.
 */
export const createMockContext = (): MulmoStudioContext => ({
  fileDirs: {
    mulmoFilePath: "/test/path/test.yaml",
    mulmoFileDirPath: "/test/path",
    baseDirPath: "/test",
    outDirPath: "/test/output",
    imageDirPath: "/test/images",
    audioDirPath: "/test/audio",
    isHttpPath: false,
    fileOrUrl: "/test/path/test.yaml",
    outputStudioFilePath: "/test/output/test_studio.json",
    outputMultilingualFilePath: "/test/output/test_lang.json",
    presentationStylePath: undefined,
    fileName: "test",
    grouped: false,
  },
  studio: {
    filename: "test_studio",
    // The schema requires at least one beat, and the tests want to start from none and push
    // their own — so it is parsed with a throwaway beat and emptied. Everything else the
    // schema defaults is kept, which is what a real script carries.
    script: {
      ...mulmoScriptSchema.parse({
        $mulmocast: { version: currentMulmoScriptVersion },
        title: "Test Script",
        beats: [{ text: "" }],
        lang: "en",
        canvasSize: { width: 1920, height: 1080 },
      }),
      beats: [],
    },
    beats: [],
  },
  force: false,
  lang: "en",
  multiLingual: [],
  presentationStyle: mulmoPresentationStyleSchema.parse({
    $mulmocast: { version: currentMulmoScriptVersion },
    imageParams: { provider: "openai", model: "gpt-image-1", style: "natural", moderation: "auto" },
  }),
  sessionState: {
    inSession: { audio: false, image: false, video: false, multiLingual: false, caption: false, pdf: false, markdown: false, html: false, viewer: false },
    inBeatSession: { audio: {}, image: {}, movie: {}, multiLingual: {}, caption: {}, html: {}, imageReference: {}, soundEffect: {}, lipSync: {} },
  },
});

// Helper function to create mock beat
export const createMockBeat = (overrides: Partial<MulmoBeat> = {}): MulmoBeat => ({
  text: "Test beat text",
  ...overrides,
});
