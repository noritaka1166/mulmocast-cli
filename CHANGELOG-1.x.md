# Changelog (1.x)

For the current changelog, see [CHANGELOG.md](./CHANGELOG.md).

All notable changes to this project will be documented in this file.

## [1.3.0](https://github.com/receptron/mulmocast-cli/releases/tag/1.3.0) (2025-11-07)

- **Breaking API change**: `generateBeatImage` and `initializeContextFromFiles` now have updated function signatures (affects library consumers only)
- **Nijivoice support**: Added nijivoice TTS provider
- **Voice samples**: Added voice sample files

📦 **npm**: [`mulmocast@1.3.0`](https://www.npmjs.com/package/mulmocast/v/1.3.0)


## [1.2.69](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.69) (2025-10-29)

- **Movie agent fix**: Fixed issue where movie agent would work even with unsupported image types

📦 **npm**: [`mulmocast@1.2.69`](https://www.npmjs.com/package/mulmocast/v/1.2.69)


## [1.2.68](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.68) (2025-10-23)

- **BundleData type export**: Exported BundleData type for library consumers

📦 **npm**: [`mulmocast@1.2.68`](https://www.npmjs.com/package/mulmocast/v/1.2.68)


## [1.2.67](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.67) (2025-10-20)

- **Bundle improvements**: Silent audio generation for bundles, improved Gemini content handling, blank path by aspect ratio

📦 **npm**: [`mulmocast@1.2.67`](https://www.npmjs.com/package/mulmocast/v/1.2.67)


## [1.2.66](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.66) (2025-10-19)

- Add test cases
- add warn. soundEffectPrompt is set, but there is no video.
- more reference


## [1.2.65](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.65) (2025-10-18)

- update
- Bundle update
- update packages
- update image.md
- add more ci tests
- fix pdf credit image
- fix Issue of not being able to convert html image to pdf
- improve pdf error log
- movie plugin support image


## [1.2.64](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.64) (2025-10-15)

- remove old api
- bundle
- Update image html preprocess agent response
- fix type of test file
- update type
- update
- Zip archive
- Open ai agent generation error


## [1.2.63](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.63) (2025-10-12)

- **Speaker schema update**: Restructured speaker schema types for better type safety and flexibility

📦 **npm**: [`mulmocast@1.2.63`](https://www.npmjs.com/package/mulmocast/v/1.2.63)


## [1.2.62](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.62) (2025-10-12)

- fix typo
- refactor getModelDuration


## [1.2.61](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.61) (2025-10-10)

- **Template image data set**: Added `templateImageDataSet` for embedded template image data, improving template portability

📦 **npm**: [`mulmocast@1.2.61`](https://www.npmjs.com/package/mulmocast/v/1.2.61)


## [1.2.60](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.60) (2025-10-10)

- **Beat image generation error handling**: Improved error handling in `generateBeatImage` with better error propagation

📦 **npm**: [`mulmocast@1.2.60`](https://www.npmjs.com/package/mulmocast/v/1.2.60)


## [1.2.59](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.59) (2025-10-10)

- catch openai error
- reference image prompt require prompt


## [1.2.58](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.58) (2025-10-09)

- **Vision style schema update**: Made vision style field required in schema for consistent rendering

📦 **npm**: [`mulmocast@1.2.58`](https://www.npmjs.com/package/mulmocast/v/1.2.58)


## [1.2.57](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.57) (2025-10-09)

- add mulmoImageParamsImagesValueSchema
- html prompt min 1


## [1.2.56](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.56) (2025-10-09)

- **Lip sync audio path fix**: Fixed audio file path resolution for lip sync processing, with updated test infrastructure

📦 **npm**: [`mulmocast@1.2.56`](https://www.npmjs.com/package/mulmocast/v/1.2.56)


## [1.2.55](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.55) (2025-10-08)

- **Asset import utility**: Added new `asset_import.ts` utility for resolving asset paths, with improved file path handling

📦 **npm**: [`mulmocast@1.2.55`](https://www.npmjs.com/package/mulmocast/v/1.2.55)


## [1.2.54](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.54) (2025-10-07)

- **Translate error handling**: Improved error handling for translation action with dedicated error cause type

📦 **npm**: [`mulmocast@1.2.54`](https://www.npmjs.com/package/mulmocast/v/1.2.54)


## [1.2.53](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.53) (2025-10-06)

- **Beat-specific context**: Added ability to get context for a specific beat, enabling targeted processing

📦 **npm**: [`mulmocast@1.2.53`](https://www.npmjs.com/package/mulmocast/v/1.2.53)


## [1.2.52](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.52) (2025-10-06)

- **Image reference agent fix**: Fixed error in image reference agent processing

📦 **npm**: [`mulmocast@1.2.52`](https://www.npmjs.com/package/mulmocast/v/1.2.52)


## [1.2.51](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.51) (2025-10-06)

- **Action error improvements**: Improved error handling across all actions (audio, captions, images, translate, etc.) with consistent error reporting

📦 **npm**: [`mulmocast@1.2.51`](https://www.npmjs.com/package/mulmocast/v/1.2.51)


## [1.2.50](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.50) (2025-10-06)

- fix typo
- downGrade clipboardy


## [1.2.49](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.49) (2025-10-06)

- Update package
- openai api key error handler


## [1.2.47](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.47) (2025-10-05)

- **Image reference notification**: Added image references key to state change notifications for UI sync

📦 **npm**: [`mulmocast@1.2.47`](https://www.npmjs.com/package/mulmocast/v/1.2.47)


## [1.2.46](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.46) (2025-10-05)

- comments
- More error2


## [1.2.45](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.45) (2025-10-04)

- **Error type refactor**: Restructured error cause types for better i18n support and consistent error reporting

📦 **npm**: [`mulmocast@1.2.45`](https://www.npmjs.com/package/mulmocast/v/1.2.45)


## [1.2.44](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.44) (2025-10-04)

- update graphai graphai@2.0.16
- Update package20251004
- Update error
- add MulmoMediaMermaidSource
- Refector image source
- isFile


## [1.2.43](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.43) (2025-10-04)

- **Audio file existence check**: Added error handling when audio file does not exist in combine audio agent

📦 **npm**: [`mulmocast@1.2.43`](https://www.npmjs.com/package/mulmocast/v/1.2.43)


## [1.2.42](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.42) (2025-10-03)

- Hidden beat
- File not exist error
- feat(schema): enforce non-empty strings for media sources


## [1.2.41](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.41) (2025-10-03)

- add mulmoBeatImageParamsSchema
- fix getAvailablePromptTemplates json file only
- movie raise error


## [1.2.40](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.40) (2025-09-27)

- add zod test
- For app


## [1.2.39](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.39) (2025-09-26)

- **Session state result**: Added result return value to `setSessionState` for action completion tracking, plus custom error types

📦 **npm**: [`mulmocast@1.2.39`](https://www.npmjs.com/package/mulmocast/v/1.2.39)


## [1.2.38](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.38) (2025-09-26)

- **FFmpeg duration error handling**: Added comprehensive error handling for `ffmpegGetMediaDuration` with dedicated test suite

📦 **npm**: [`mulmocast@1.2.38`](https://www.npmjs.com/package/mulmocast/v/1.2.38)


## [1.2.37](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.37) (2025-09-26)

- set default speaker provider
- update packages


## [1.2.36](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.36) (2025-09-20)

- **`mulmo-mcl` binary alias**: Added `mulmo-mcl` as an additional CLI binary entry point

📦 **npm**: [`mulmocast@1.2.36`](https://www.npmjs.com/package/mulmocast/v/1.2.36)


## [1.2.35](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.35) (2025-09-20)

- update google api document
- mulmocast-vision@1.0.4
- Set agent key name


## [1.2.34](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.34) (2025-09-17)

- **Vision template path fix**: Fixed vision template file path resolution

📦 **npm**: [`mulmocast@1.2.34`](https://www.npmjs.com/package/mulmocast/v/1.2.34)


## [1.2.33](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.33) (2025-09-17)

- Test coverage
- add image plugin tests
- add combine_audio_files test
- Deleting unnecessary conditions
- handle movie with relative path
- add spilled over and voice over test
- more combine_audio tests
- add image plugin test
- html support chart, mermaid, movie
- add tests


## [1.2.32](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.32) (2025-09-16)

- dotenv quiet
- debug log off
- graphai@2.0.15


## [1.2.31](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.31) (2025-09-15)

- separate plugin test
- add tests
- Html2
- update readme


## [1.2.30](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.30) (2025-09-15)

- update mulmocast-vision to 1.0.2
- update
- html output
- chore: minor changes markdown
- movie plugin movie path


## [1.2.29](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.29) (2025-09-12)

- input images for replicate image agent, and improved aspect ratio.
- update mulmo vision
- Markdown output
- Subliminal test: political images by various models
- update
- Plugin markdown
- add markdown test
- Update generate action docs
- More markdown: mermaid and textStyle also support markdown


## [1.2.28](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.28) (2025-09-10)

- fix: Image.source to movie
- documentary template
- Replicate image
- update mulmocast-vision


## [1.2.27](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.27) (2025-09-09)

- plain image promp
- Remove default value from Movie params


## [1.2.26](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.26) (2025-09-07)

- **HTML scale to fit**: Scale HTML content to fit canvas size, matching the same approach used in vision rendering

📦 **npm**: [`mulmocast@1.2.26`](https://www.npmjs.com/package/mulmocast/v/1.2.26)


## [1.2.25](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.25) (2025-09-07)

- update prompt for translation 
- update


## [1.2.24](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.24) (2025-09-05)

- Vision template
- Nano Banana Aspect Ratio Control
- Implement system for automatic Mermaid diagram docs
- Improve document generation process
- got rid of old google image agent
- Veo3 support
- update image.md
- Use mulmocast-vision functions


## [1.2.23](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.23) (2025-09-03)

- add vision sample
- name to style


## [1.2.22](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.22) (2025-09-03)

- **Dependency updates**: Package version updates and yarn.lock refresh

📦 **npm**: [`mulmocast@1.2.22`](https://www.npmjs.com/package/mulmocast/v/1.2.22)


## [1.2.21](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.21) (2025-09-03)

- **nodeModuleRootPath in context**: Added `nodeModuleRootPath` to CLI context, simplified vision plugin path resolution

📦 **npm**: [`mulmocast@1.2.21`](https://www.npmjs.com/package/mulmocast/v/1.2.21)


## [1.2.20](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.20) (2025-09-03)

- add vision test
- update mulmo vision


## [1.2.19](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.19) (2025-09-03)

- add image_plugin document
- export puppeteerCrawlerAgent
- mulmocast-vision


## [1.2.18](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.18) (2025-09-02)

- fixed movie with audio case
- fix translate cache


## [1.2.17](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.17) (2025-09-01)

- add puppeteer_crawler_agent
- Ghibli comic strips
- forceLipSync & forceSoundEffect in generateBeatImage


## [1.2.16](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.16) (2025-08-29)

- line breaks in captions
- fixed startAt


## [1.2.15](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.15) (2025-08-28)

- **startAt calculation fix**: Calculate `startAt` in `imagePreprocessAgent` and properly wait for image generator completion

📦 **npm**: [`mulmocast@1.2.15`](https://www.npmjs.com/package/mulmocast/v/1.2.15)


## [1.2.14](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.14) (2025-08-28)

- Trim music
- listLocalizedAudioPaths
- fix: When specifying lang in audio generation, speaker information is…
- bgm lipSync for Music Video


## [1.2.13](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.13) (2025-08-27)

- **Target language option**: Added `targetLang` option to the translate command for specifying output language

📦 **npm**: [`mulmocast@1.2.13`](https://www.npmjs.com/package/mulmocast/v/1.2.13)


## [1.2.12](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.12) (2025-08-27)

- more Browser-friendly
- KPOP: finetuining
- Remove faker js
- Model: gemini-2.5-flash-image-preview
- fix translate data write
- generateBeatAudio accepts multiple languages


## [1.2.11](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.11) (2025-08-26)

- **Utils cleanup**: Reorganized utility exports, separated Node.js-specific utils into `utils_node.ts`, and exported Methods from `index.common.ts`

📦 **npm**: [`mulmocast@1.2.11`](https://www.npmjs.com/package/mulmocast/v/1.2.11)


## [1.2.10](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.10) (2025-08-26)

- export beatId function
- fix pdf generation


## [1.2.9](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.9) (2025-08-25)

- update packages
- Multilingual data to object
- update


## [1.2.8](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.8) (2025-08-24)

- **FFmpeg size error handling**: Improved error handling for media size detection in FFmpeg utilities

📦 **npm**: [`mulmocast@1.2.8`](https://www.npmjs.com/package/mulmocast/v/1.2.8)


## [1.2.7](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.7) (2025-08-22)

- add id to mulmoCredit
- fix background param


## [1.2.6](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.6) (2025-08-22)

- Multi-character Story Template
- lipsync add file error
- cli tool whisper
- update packages
- htmlImageFile


## [1.2.5](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.5) (2025-08-19)

- udpate packages
- Public api args
- update


## [1.2.4](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.4) (2025-08-18)

- update graphai packages
- Missing apiKey error
- LLM models
- update


## [1.2.3](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.3) (2025-08-16)

- add GitHub issues template for bug report
- add GitHub issues template for feature request
- add release note v1.2.0 to v1.2.2
- template clean up
- update
- minor update on ani template (xijivoice for lang=ja)
- bgmAssets in src/data
- Notify id


## [1.2.2](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.2) (2025-08-12)

- update template


## [1.2.1](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.1) (2025-08-12)

- delete google-auth-library package
- remove local sleep
- add defaultProvider.text2image
- Adjust IntroPadding when the first beat has the lip-sync enabled.
- emphasize ツンデレ
- Add background="opaque" setting for OpenAI image generation
- Custom Prompt


## [1.2.0](https://github.com/receptron/mulmocast-cli/releases/tag/1.2.0) (2025-08-09)

- Use google's gene API for image generation
- update packages
- separate inquirer
- Genai movie generation
- add release note v1.1.6 to 1.1.11
- default model = gpt-5


## [1.1.11](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.11) (2025-08-05)

- PER
- Mock test
- bug fix: Handle no bgm
- Veo3 update
- always call add bgm
- cleanup import


## [1.1.10](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.10) (2025-08-04)

- For app
- bundle asset images
- update packages


## [1.1.9](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.9) (2025-08-04)

- Add language
- fix caption multilingual
- Localized text
- move splitText to utils


## [1.1.8](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.8) (2025-08-03)

- docs: document multi-language speaker configuration
- export context


## [1.1.7](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.7) (2025-08-03)

- removed one enableLipSync
- update ts
- refactor: use optional chain
- chore: fix typos
- IPO to アイピーオー
- Refactor translate
- Multilang
- add release note v1.1.1 to v1.1.5
- Translate beat


## [1.1.6](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.6) (2025-08-01)

- Replicate models: wan-2.2-i2v-480p-fast and wan-2.2-t2v-480p-fast
- skip soundEffect and lipSync if no movie output
- update
- clean runTranslateIfNeeded
- caption to videoCaption
- required lang
- Refactor lang
- More lang test
- Merge context
- Nijivoice filter
- Studio file
- fix translation cache
- figma ipo sample with image-only lip-sync
- bytedance/omni-human lip sync


## [1.1.5](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.5) (2025-07-30)

- Image Quality
- lang suffix for audio file
- use getAudioArtifactFilePath from both audio and movie
- Language specific speakers
- export test script


## [1.1.4](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.4) (2025-07-28)

- template2tsobject


## [1.1.3](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.3) (2025-07-28)

- Revert "Separate template func"
- Revert "Script template from data"


## [1.1.2](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.2) (2025-07-28)

- add build
- update test script to 1.1
- Fix script template schema
- More lip sync
- math mystery sample
- Add error message
- delete mulmo_script_template methods
- skip PromptTemplates validate
- Script template from data
- Separate template func


## [1.1.1](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.1) (2025-07-26)

- flipped title and description
- Lip sync
- audit fix
- export validateSchemaAgent
- add release note v1.1.0
- add getScriptFromTemplate
- Template2tsobject
- update packages


## [1.1.0](https://github.com/receptron/mulmocast-cli/releases/tag/1.1.0) (2025-07-23)

- Default speaker
- add release note v0.1.7
- Speech params cleanup
- Fix hailuo 02 with image
- BGM assets for the Electron app
- Added a few beats to snakajima/olympics.json
- replicate: model params
- Sound effect

