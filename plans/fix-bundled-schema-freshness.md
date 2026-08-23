# 同梱スキーマを再生成し、鮮度を CI で守る

`#1542`。

## 実測した現状

| | bytes |
|---|---:|
| live（`mulmo tool schema`） | **704,645** |
| 同梱 `assets/schemas/mulmo_script.json` | **8,326** |

issue 執筆時は 161KB vs 5KB。**live 側がさらに4倍以上に育っている**。

## 到達性 — issue が書いていなかったこと

`assets/schemas/mulmo_script.json` は v0.0.26 で **MCP サーバー用**に追加されたが、
**`src/mcp/server.ts` は 2025-06-25（`19599951` "html prompt"）に読むのをやめて** `html_prompt.json` に切り替えている。

変数名は今も `MULMO_SCRIPT_JSON_SCHEMA` のまま `html_prompt.json` を指しており、
**これが14か月気づかれなかった直接の原因**。

つまりこのファイルは **repo 内に読み手がいないまま npm パッケージに載り続けていた**。
読み手が居ない以上、正しさを保てるのは**チェックだけ**であり、それが無かったから静かにずれた。

## やること

1. `assets/schemas/mulmo_script.json` を再生成（+696KB）
2. `yarn schema:write` を追加（再生成の正式な手順を1つにする）
3. **鮮度チェックをテストとして**追加。新しい CI ジョブは足さない —
   生成は `z.toJSONSchema(mulmoScriptSchema)` の1呼び出しで、`mulmo tool schema` が
   しているのと同じものなので、spawn するものが無い。既存の `ci_test` に載る
4. `src/mcp/server.ts` の変数名を実態（`HTML_PROMPT_JSON_SCHEMA`）に合わせる

### チェックが CLI と同じものを比べていること

`GraphAILogger.info` は `console.log` 経由なので末尾に改行が付く。
テストは `JSON.stringify(...) + "\n"` と比較する。**実測で `yarn schema` のリダイレクト出力と完全一致**。

### `yarn format` との競合は無い

`format` の glob は `assets/templates` / `assets/styles` / `assets/html/js` のみで、
`assets/schemas` は対象外。

## 確認すること

- **チェックが実際に落ちること**を変異で確認する。特に「元の stale な 8KB ファイルに戻す」ケース
- 出力が決定的であること（2回生成して同一）
