# types サブパッケージを root と同じ TypeScript でビルドする

`#1547`。

## 現状

`types/src/*.ts` は `src/types/*.ts` への **symlink** なので、**同じソースを2つの別のコンパイラでビルドしている**:

| | root | types |
|---|---|---|
| `typescript` | `6.0.3` | `^5.7.2`（解決 5.9.3） |
| `@types/node` | 宣言なし（transitive で 18.19.130） | 無し |

`~/ss/llm/CLAUDE.md` の「TypeScript は `^6.0.3` で全レポ統一」にも反する。

## 上げると出るもの（実測）

`types/` を 6.0.3 にすると:

```
src/agent.ts(19,44): error TS2591: Cannot find name 'Buffer'.
```

**`@types/node` を入れただけでは消えない。** 原因は root の `tsconfig.json` に既に書いてあった:

```jsonc
"types": ["archiver", "jsdom", "yargs"],  /* Explicit for TS 6.0 compatibility (new default: []) */
```

**TS 6.0 で `types` の既定が `[]` になった**ので、`@types/*` は自動で入らない。root は対応済みで、`types/` だけが TS 5.9 に留まっていたため露見していなかった。

## やること

1. `types/` に `@types/node` を追加し、`typescript` を `6.0.3` に
2. `types/tsconfig.json` に `"types": ["node"]`（コンパイラ自身が要求する形）
3. **生成物が変わらないことを diff で確認**
4. root も `@types/node` を宣言し、`types` に `node` を足す

### 4 の理由

root は `engines: ">=22.0.0"`、CI は 22.x / 24.x で走るのに、**`@types/node` は 18.19.130 が transitive で入っているだけ**だった。
つまり **Node 22 以上を要求しながら Node 18 の型で型検査していた**。

なお「root の `Buffer` は `@types/archiver` / `@types/jsdom` 経由で偶然入っている」という仮説は
**実測して否定された** — `types` を `["yargs"]` だけにしてもエラー0。`types` 配列は `@types` の
自動取り込みしか制御せず、他パッケージの `.d.ts` にある `/// <reference types="node" />` は
無関係に辿られるため。どの経路であれ「宣言せずに効いている」ことは変わらないので、宣言する。

### バージョンは最新（`^26.0.0`）

`@types/node` は **TypeScript バージョン別の dist-tag** を持ち、**`ts6.0` → `26.2.0`**（`ts5.0` は 22.13.14）。
このリポジトリの TypeScript は 6.0.3 なので、対応するのは 26 系。

`engines: ">=22"` に合わせて 22 系に留める案も検討したが、**その利点を実証できなかった**:
Node 23.11 で入った `process.execve` を型検査させても `@types/node@22` はエラーを出さず、
「古い型に固定すれば新しい API の誤用を捕まえられる」という想定は少なくともこの例では成立しなかった。
根拠のない制約を入れるより、TS のバージョンに対応した最新を使う。

22 と 26 のどちらでも root の build / typecheck / lint と `types/lib` の出力は同一であることは確認済み。

## 確認すること

- `types/lib` が **TS 5.9 版とバイト単位で同一**であること（同一なら `@mulmocast/types` の再 publish は不要）
- **クリーン install**（`rm -rf node_modules && yarn install --frozen-lockfile`）から
  lint / build / typecheck / 全テストが緑であること。lockfile が変わる PR なので必須
