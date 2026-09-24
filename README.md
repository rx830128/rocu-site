# site-rocu — 株式会社禄 公式サイト（実在の自社サイト）

`C:\hp-mock-factory\site-rocu\`

## ★これは営業モックではない

同じ `hp-mock-factory` の中にあるが、`demo-*` フォルダ群とは**別物**。
実在する自社（株式会社禄）の公式サイトなので、`hp-mock-factory\CLAUDE.md` の鉄則のうち
**次の2つは適用しない**。取り違えると事故になるので、編集前に必ずここを読むこと。

| hp-mock の鉄則 | このフォルダでの扱い |
|---|---|
| DEMO MOCK表記必須（`mock-flag`） | **入れない**（実在企業の本番サイトのため） |
| 連絡先はダミーのみ（`03-0000-0000` 等） | **実連絡先を載せる**（`info@rocu.co.jp`）。ただし電話番号は載せない |
| 公開はユーザーGO後 | **そのまま適用**（勝手にデプロイしない） |
| 実在企業名・実写真の無断使用禁止 | **そのまま適用**（自社名は当然可。他社名・他社事例は一切出さない） |

一方、作り方（テーマトークン11変数・GSAP標準構成・§7インタラクション規約・検証手順）は
hp-mock の作法をそのまま踏襲している。

## 内容についての制約（2026-09-24 利用者指示）

- **事実を創作しない。** 実績数値・取引社数・導入事例・受賞歴・社員数・沿革は**書かない**
- **クライアント名を一切出さない**（広告運用の受託先はすべて守秘）
- 「業界No.1」「実績多数」等の裏付けのない表現を使わない
- 2026-09-02 設立直後の会社であることと矛盾する内容にしない

### 載せてよい事実（この5件のみ・すべて確認済み）

| 項目 | 値 |
|---|---|
| 商号 | 株式会社禄 |
| 設立 | 2026年9月2日（さいたま地方法務局で登記完了） |
| 代表者 | 田中利弘 |
| 所在地 | 埼玉県さいたま市南区文蔵一丁目１２番地１２－１０１号室 |
| 連絡先 | info@rocu.co.jp |

★**住所の表記を変えない。** 丁目は「一丁目」、区切りは「－」（全角ハイフンマイナス。
長音符「ー」ではない）。数字は全角。履歴事項全部証明書の表記に合わせてあり、
Stripe・SUBLINE の申請でこの文字列と一致させる運用。
正本は `C:\ad-tools\LPanalyzer\ai_ugc\catalog_tool\app\legal\tokushoho-content.mjs` の `BUSINESS.address`。

★**電話番号は載せない。** 番号そのものをリポジトリに書かない運用。
特商法上は法人でも省略できる（法第11条ただし書・消費者庁の省略可否一覧表）。
サイト上は「掲載していない／請求があれば遅滞なく開示する」と書いてある。
経緯は `C:\ad-tools\LPanalyzer\ai_ugc\CLAUDE.md` の該当節。

★**受付時間（平日9時〜17時）は対外的な約束になる。** 変えるときは
`contact.html` / `company.html` / `index.html` の3箇所を揃える。
`tokushoho-content.mjs` の `BUSINESS.contactNote` とも整合させること。

## ファイル構成

```
site-rocu/
  index.html       トップ（hero / 事業内容 / 進め方 / 会社概要抜粋 / CTA）
  company.html     会社概要
  contact.html     お問い合わせ
  assets/
    style.css      共通スタイル（corporate プリセット）
    app.js         共通スクリプト（GSAP標準構成 canonical + intro + drawer）
    favicon.svg
```

★hp-mock の「単一HTML・CSS/JS全インライン」規約からは**意図的に外している**。
3ページに同じCSSを複製すると、実運用で編集がずれるため。ビルドツールは無し（そのまま置けば動く）。

## 画像について

**写真素材は使っていない。** 背景はCSSグラデーション＋グリッド、アイコン類はテキストのみ。
hp-mock の STEP 3（Higgsfield で6枚生成）は**意図的に実施していない**。
実在企業のサイトに、実在しないオフィス・実在しない人物のAI生成写真を載せると、
「事実を創作しない」という今回の前提に反するため。
実際に撮った写真が用意できたら差し替えればよい。

## ローカル確認

`C:\.claude\launch.json` に `site-rocu`（port 8642）を登録済み。
手動なら:

```
C:/Users/rx830/AppData/Local/Programs/Python/Python310/python.exe -m http.server 8642 --directory C:/hp-mock-factory/site-rocu
```

## 検証結果（2026-09-24）

| 項目 | 結果 |
|---|---|
| reveal取りこぼし（最下部まで一気にスクロール後のDOM実測） | index 21/21・company 9/9・contact 5/5 発火。未発火 0 |
| fail-closed（GSAP・Google Fonts のCDNを到達不能にして確認） | 全要素表示・intro も開く・本文1366文字すべて残る |
| 横スクロール（375px幅） | scrollWidth 375 = clientWidth 375（はみ出し 0 要素） |
| モバイルドロワー | 開閉・aria-expanded の反転を確認 |
| 内部リンク・アセット | 3ページ全リンク HEAD 200 |
| 住所表記 | 正本 `BUSINESS.address` とバイト一致（JSON-LDは region+locality+street の連結が正本と一致） |
| **`prefers-reduced-motion: reduce`** | **未検証**（Browser paneでエミュレートできないため）。ブラウザのDevToolsで要確認 |
| **実機（スマホ）** | **未検証**（LAN配信は利用者側ターミナルで実施推奨） |

## 公開（未実施・GitHub Pages で行うと決定：2026-09-24 利用者選択）

★**まだ何も公開していない。** `git init` すら実行していない（hp-mock の鉄則3に従い、
`git init` 〜 `gh repo create` 〜 Pages 公開は利用者の明示GO後にのみ実行する）。

ドメイン `rocu.co.jp` は Xserver 管理（ns1-3.xdomain.ne.jp）、2026-09-24 時点で A レコード無し。
メール（Google Workspace）は稼働中なので、**MX・SPF・DKIM・DMARC には触らない**。
GitHub アカウントは `rx830128`（`gh auth status` で確認済み・scopes に `repo` あり）。

### ★順序を間違えないこと（GitHub 公式の指示）

> Make sure you add your custom domain to your GitHub Pages site **before** configuring your
> custom domain with your DNS provider. Configuring your custom domain with your DNS provider
> without adding your custom domain to GitHub could result in someone else being able to host
> a site on one of your subdomains.
> — <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>（2026-09-24 に本文で確認）

つまり **GitHub側の独自ドメイン登録 → DNS** の順。逆にすると乗っ取りリスクがある。

### STEP 1 — リポジトリ作成と push（GO後にこちらで実行可）

```
git -C C:/hp-mock-factory/site-rocu init -b main
git -C C:/hp-mock-factory/site-rocu add -A
git -C C:/hp-mock-factory/site-rocu commit -m "株式会社禄 コーポレートサイト 初版"
gh repo create rocu-site --public --source C:/hp-mock-factory/site-rocu --push
gh api -X POST repos/rx830128/rocu-site/pages -f "source[branch]=main" -f "source[path]=/"
```

→ `https://rx830128.github.io/rocu-site/` で表示を確認する（ここまでは DNS 不要）。

### STEP 2 — GitHub 側に独自ドメインを登録（DNSより先）

```
gh api -X PUT repos/rx830128/rocu-site/pages -f cname=rocu.co.jp
```

リポジトリ直下に `CNAME`（内容 `rocu.co.jp`）が作られる。
★この時点から github.io URL は rocu.co.jp へリダイレクトするので、
**STEP 3 が終わるまでサイトは見えない**。これは想定どおりで異常ではない。

推奨: 併せてドメイン所有権の検証（`_github-pages-challenge-rx830128` TXT レコード）も行うと、
他人が同じドメインを自分のリポジトリに設定できなくなる。
手順は GitHub の「Verifying your custom domain for GitHub Pages」。

### STEP 3 — Xserver の DNS にレコードを追加（利用者がパネルで実施）

| ホスト | 種別 | 値 |
|---|---|---|
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | rx830128.github.io |

IPv6 も入れるなら AAAA を4本（`2606:50c0:8000::153` / `8001::153` / `8002::153` / `8003::153`）。
GitHub は「AAAA を入れるなら A も併記すること」と書いている。
上記の値は 2026-09-24 に GitHub 公式ドキュメント本文で確認したもの。

★**既存の MX・SPF・DKIM・DMARC は一切触らない**（触ると info@rocu.co.jp が死ぬ）。
★**Xserver が自動で作る @ / www の既定 A レコードがあれば削除する**
（GitHub docs: "If your DNS provider automatically sets a default record, remove it before continuing."）。
★ワイルドカード（`*.rocu.co.jp`）は作らない（GitHub が乗っ取りリスクとして明示的に非推奨）。

### STEP 4 — 反映確認と HTTPS

```
nslookup rocu.co.jp
```

上記4IPが返ることを確認する（DNS 反映は最大24時間）。
そのあと GitHub の Pages 設定で **Enforce HTTPS** を有効化する
（証明書発行まで最大24時間かかることがある）。

### STEP 5 — Stripe に提出

`https://rocu.co.jp/` を提出。**HTTPS が有効になってから**出すこと。

実際に設定したレコードと日付は、完了後にここへ追記する。
