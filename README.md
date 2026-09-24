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

## 公開状況（2026-09-25 完了）

**本番URL: <https://rocu.co.jp/>** — HTTPS 有効・Enforce HTTPS 済み。

| 確認項目 | 結果 |
|---|---|
| `https://rocu.co.jp/` | 表示される |
| `http://rocu.co.jp/` | https へリダイレクト |
| `https://www.rocu.co.jp/` | `https://rocu.co.jp/` へリダイレクト |
| 配信ファイル（HTML3枚＋CSS/JS） | ローカル検証時と SHA-256 一致 |
| リポジトリ | <https://github.com/rx830128/rocu-site>（public） |

### ★証明書が発行されない詰まり方と直し方（2026-09-24〜25 実害）

**DNS が正しく向いていても、GitHub が証明書の発行処理を始めないことがある。**

- 症状: A×4 も www CNAME も正常、`http://` では見えるのに `https://` が通らない。
  `gh api repos/<owner>/<repo>/pages` の応答に **`https_certificate` フィールドが存在しない**（`state` が `none` 以前）。
  `pages/health` が `{}` を返す
- 24時間待っても変化なし。待っても直らない
- **直し方: 独自ドメインを一度外して付け直す**

```
echo '{"cname":null,"source":{"branch":"main","path":"/"}}' > payload.json
gh api -X PUT repos/rx830128/rocu-site/pages --input payload.json
# ビルド完了を待って2分置く
gh api -X PUT repos/rx830128/rocu-site/pages -f cname=rocu.co.jp
```

付け直した直後に `https_certificate.state` が `authorization_created` で出現し、**1分以内に `approved`** になった。
そのあと `gh api -X PUT repos/rx830128/rocu-site/pages -F https_enforced=true` で Enforce HTTPS を有効化。

★**待ちと詰まりの見分け方は `https_certificate` フィールドの有無**。
フィールドが出ていれば進行中（待てばよい）、出ていなければキックされていない（付け直す）。

★付け直すと GitHub が `CNAME` ファイルを作り直すので、ローカルは `git pull` すること。

## DNS レコード（rocu.co.jp・14件）

| ホスト名 | 種別 | 内容 | 用途 |
|---|---|---|---|
| rocu.co.jp | NS ×3 | ns1–3.xdomain.ne.jp | Xserver |
| rocu.co.jp | SOA | ns1.xdomain.ne.jp root.xdomain.ne.jp 0 | Xserver |
| rocu.co.jp | A ×4 | 185.199.108–111.153 | GitHub Pages |
| www.rocu.co.jp | CNAME | rx830128.github.io | GitHub Pages |
| **rocu.co.jp** | **MX** | **smtp.google.com（優先度1）** | **Google Workspace・触るな** |
| rocu.co.jp | TXT | google-site-verification=… | Google 所有権確認・触るな |
| rocu.co.jp | TXT | v=spf1 include:_spf.google.com ~all | SPF（2026-09-24 追加） |
| google._domainkey | TXT | v=DKIM1; k=rsa; p=…（2048bit・410文字） | DKIM（2026-09-24 追加） |
| _dmarc | TXT | v=DMARC1; p=none; rua=mailto:info@rocu.co.jp; pct=100; adkim=r; aspf=r | DMARC（2026-09-24 追加） |

DKIM は Google 管理コンソール（アプリ → Google Workspace → Gmail → メールの認証）で
ドメイン `rocu.co.jp` を選んで鍵を生成し、DNS 登録後に**「認証を開始」まで押してある**。
ステータスは「DKIM でメールを認証しています」。

★**管理コンソールの初期選択は `fanzs.net`。** `rocu.co.jp` に切り替えてから操作すること。
切り替えないと既存ドメインの設定を触ることになる。

★**DKIM の公開鍵は Claude in Chrome の出力フィルタにマスクされる**（base64 の誤検知）。
管理コンソール側でクリップボードへコピー → Xserver 側で Ctrl+V で渡す。
`document.execCommand('copy')` は**タブがフォーカスされていないと false を返す**ので、
先に画面をクリックしてから実行する。

★Xserver の DNS 追加フォームは**ホスト名を空欄にすると apex**（確認画面では `.rocu.co.jp` と紛らわしく表示される）。
255文字を超える TXT は Xserver が自動で分割して格納する（DNS 仕様どおりで正常）。

### 残っていること

- SPF/DKIM/DMARC の認証が効き始めるまで最大48時間。実際に効いているかは送信メールのヘッダで
  `SPF: PASS` / `DKIM: PASS` / `DMARC: PASS` を確認する
- DMARC は `p=none`（監視のみ）。`rua` 宛に集計レポートが届く。数週間安定して PASS を確認してから
  `p=quarantine` → `p=reject` と上げる。**いきなり上げると自社メールが落ちる**
- Stripe への提出: `https://rocu.co.jp/`

### 更新のしかた

```
git -C C:/hp-mock-factory/site-rocu add -A
git -C C:/hp-mock-factory/site-rocu commit -m "..."
git -C C:/hp-mock-factory/site-rocu push
```

push すると GitHub Pages が自動で再ビルドする（1分程度）。
