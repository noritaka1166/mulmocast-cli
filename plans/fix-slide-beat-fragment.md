# slide beat をフル HTML 文書ではなく fragment にする

`#1527`。

## 再現（報告や過去の出力ではなく、今のコードで）

`image_plugins/slide.ts` の `html()` を4回呼んで連結した結果:

| | before | after |
|---|---:|---:|
| `<!DOCTYPE html>` | 4 | **0** |
| `cdn.tailwindcss.com` | 4 | **0** |
| `tailwind.config = ` | 4 | **0** |
| `html, body { ... }` | 4 | **0** |

`actions/html.ts` はこれを `<body>` にそのまま連結するので、4スライドの export は
**Tailwind CDN を5回**読み、`tailwind.config` を**4回上書き**し、
`html, body { overflow: hidden }` が**ページ全体に漏れて**縦に並ぶ出力がスクロール不能になっていた。

## 構図 — ブラウザ経路は既に解決済みだった

`src/utils/beat_html/slide.ts`（**ブラウザ経路**）は既に `generateSlideFragment` を使っている。
`src/utils/image_plugins/slide.ts` の **dump 経路だけ**が `generateSlideHTML` のままだった。
つまり新しい設計を発明するのではなく、**同じ変更を dump 経路にも入れる**話。

PNG 経路（`processSlide`）は `generateSlideHTML` のままでよい — **そこではスライドがページそのもの**だから。

## 設計

- `dumpHtml` は fragment を返す。**fragment 自身の css は隣に出す** — `scopeClass` に閉じており、
  deck が呼び出しごとに一意な class を振るため（`mulmo-slide-0`, `mulmo-slide-1`, … を実測）
- **共有物はページのもの**: Tailwind / chart / mermaid ランタイムは `actions/html.ts` が既に head に1回だけ置いている。
  足りなかった `slideUtilityCss` を head に追加する
- **箱は plugin 側で付ける**。fragment は `w-full h-full` なので箱が無いと**黙って潰れる**
  （`#1567` の swipe root と同じクラスの失敗）。`actions/html.ts` は beat の種別を見ずに連結するので、
  ホスト側に任せられない

## 確認すること

- 4サイトの計測（上の表）が実際に 0 になること
- **実機**: export を作ってブラウザで開き、**スクロールできること**、4スライドが描画されること、
  console error が無いこと。build が通ることではなく、これが症状の反対側
