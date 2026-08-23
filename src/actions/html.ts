import fs from "fs";
import path from "path";
import { isNull } from "graphai";
import { escapeHtml, slideUtilityCss } from "@mulmocast/deck";
import { MulmoStudioContext } from "../types/index.js";
import { localizedText } from "../utils/utils.js";
import { writingMessage } from "../utils/file.js";
import { MulmoStudioContextMethods } from "../methods/mulmo_studio_context.js";

/**
 * The HTML document for a studio.
 *
 * Every value that reaches an attribute or `<title>` comes from the script, and a beat with a
 * `source: { kind: "path" }` image puts the author's own path into `src`, so each one is
 * escaped for the context it lands in.
 *
 * Not exported: `actions/index.ts` re-exports this module with `export *` and `index.node.ts`
 * re-exports that, so anything exported here becomes public API of the published package. The
 * tests drive it through `html()` instead.
 */
const generateHtmlContent = (context: MulmoStudioContext, imageWidth?: string): string => {
  const { studio, multiLingual, lang = "en" } = context;

  const title = studio.script.title || "MulmoCast Content";
  const description = studio.script.description || "";

  let html = "";

  if (description) {
    html += `${description}\n\n`;
  }

  studio.script.beats.forEach((beat, index) => {
    const text = localizedText(beat, multiLingual?.[index], lang);
    const studioBeat = studio.beats[index];

    if (text.trim() || studioBeat?.html || studioBeat?.imageFile) {
      if (studioBeat?.html) {
        html += `${studioBeat.html}\n\n`;
      } else if (studioBeat?.imageFile && isNull(studioBeat.html)) {
        // A `source: { kind: "path" }` beat puts the author's own path here, so it reaches an
        // HTML attribute unfiltered unless it is escaped. Every value in these attributes goes
        // through the same rule rather than each being argued safe on its own.
        const imagePath = escapeHtml(path.relative(context.fileDirs.outDirPath, studioBeat.imageFile));
        const altText = escapeHtml(`Beat ${index + 1}`);
        if (imageWidth) {
          // Use HTML img tag for width control
          html += `<img src="${imagePath}" alt="${altText}" width="${escapeHtml(imageWidth)}" />\n\n`;
        } else {
          // Use standard html image syntax
          html += `<img src="${imagePath}" alt="${altText}" />\n\n`;
        }
      }

      if (text.trim()) {
        html += `${text}\n\n`;
      }
    }
  });

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Mermaid CDN -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <!-- The utilities every slide fragment is written against. Shared, so it belongs to the
         page: a slide beat emits only its own scoped rules. -->
    <style>${slideUtilityCss}</style>
  </head>
  <body class="min-h-screen flex flex-col">
${html}
    <!-- Initialize Mermaid -->
    <script>
      mermaid.initialize({ startOnLoad: true });
    </script>
  </body>
</html>
`;
};

export const htmlFilePath = (context: MulmoStudioContext) => {
  const { studio, fileDirs, lang = "en" } = context;
  // Add language suffix only when target language is different from script's original language
  const langSuffix = studio.script.lang !== lang ? `_${lang}` : "";
  const filename = `${studio.filename}${langSuffix}.html`;
  return path.join(fileDirs.outDirPath, filename);
};

const generateHtml = async (context: MulmoStudioContext, imageWidth?: string): Promise<void> => {
  const outputHtmlPath = htmlFilePath(context);
  const htmlContent = generateHtmlContent(context, imageWidth);

  fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
  writingMessage(outputHtmlPath);
};

export const html = async (context: MulmoStudioContext, imageWidth?: string): Promise<void> => {
  try {
    MulmoStudioContextMethods.setSessionState(context, "html", true);
    await generateHtml(context, imageWidth);
    MulmoStudioContextMethods.setSessionState(context, "html", false, true);
  } catch (error) {
    MulmoStudioContextMethods.setSessionState(context, "html", false, false);
    throw error;
  }
};
