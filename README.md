# クチコミスターズ LP

`https://kuchikomi-stars.com/` で公開する、クチコミスターズのサービスLPです。

- 本番: https://kuchikomi-stars.com/
- GitHub Pages確認用: https://aik38.github.io/killerword-lp/
- クチコミシステム: https://review.kuchikomi-stars.com/
- システムrepo: `aik38/kuchikomi-stars`

HTML、CSS、最小限のJavaScriptで構成し、GitHub Pagesで公開しています。

## 現在のページ構成

- `/`：サービスLP
- `/demo/`：投稿までのデモ
- `/contact/`：導入相談・問い合わせ
- `/report-sample/`：月次レポートの表示例
- `/privacy/`：プライバシーポリシー
- `/terms/`：サービス利用条件
- `/legal/`：運営者情報・取引条件
- `404.html`
- `robots.txt`
- `sitemap.xml`

## 投稿までのデモ

`/demo/` は、実際のクチコミスターズ画面を静的HTML/CSSで再現した公開デモです。

流れ:

1. 満足度を選ぶ
2. 質問に回答する
3. クチコミ文章候補を確認する
4. 文章を確認・編集してGoogle投稿へ進む

この公開デモはOpenRouter等のAI APIを呼びません。閲覧だけでAPI費用が発生しない構成です。

実際に操作できるAPIデモは一般公開せず、問い合わせ・営業返信があった見込み客へ個別に案内します。個別営業デモの実装・運用は `aik38/kuchikomi-stars` 側で管理します。

## 商品・LPの現在方針

LPの主な商品構成は次です。

- 初回30日間・Googleクチコミ10件到達保証: 55,000円（税込）
- クチコミ集客プラン: 月額33,000円（税込）
- 年間一括: 330,000円（税込・12か月）
- MEO・AIO運用プラン: 月額66,000円（税込）〜
- 多店舗・個別カスタマイズ: 個別見積

商品条件の詳細はLP、`/terms/`、`/legal/` の記載を揃えて管理します。

## 問い合わせ

`/contact/` では次の導線を提供します。

- 投稿までのデモ
- メール
- LINE
- Googleフォーム

Googleフォームは `contact/index.html` 内のiframeで直接埋め込んでいます。フォーム差し替え・質問更新手順は [Googleフォーム設定手順](docs/google-form-setup.md) を参照してください。

## メールドメイン移行

2026-09-23時点で、LPの公開問い合わせ先は `info@kuchikomi-stars.com` へ移行済みです。

営業送信元・問い合わせフォーム営業の入力メールは `m-asakura@kuchikomi-stars.com` で運用し、実送信・実フォーム入力のスモークテストを確認済みです。

旧 `m-asakura@killerword.info` は停止せず、移行期間中の受信用として維持します。既存MX・SPF・DKIM等を不用意に変更しません。DMARCはブランドドメイン移行の最終確認項目として別途確認します。

## GA4 / Search Console

2026-09-23時点で新ドメイン側の基本設定は完了しています。

### GA4

- プロパティ: クチコミスターズ
- 測定ID: `G-1ZKN01T0YL`
- Webストリーム: `https://kuchikomi-stars.com/`
- リアルタイム計測: 確認済み

GA4では通常の流入計測に加え、営業チャネル別の流入をUTMで判別する方針です。UTM命名規則は [UTM計測・命名ルール](docs/utm-tracking.md) を正本とします。現在存在するリンクの監査結果は [UTMリンク監査](docs/utm-link-audit.md) に記録します。

### Search Console

正規ドメインは `kuchikomi-stars.com` です。

- ドメインプロパティ: 所有権確認済み
- sitemap: `https://kuchikomi-stars.com/sitemap.xml` 送信済み
- GA4とのリンク: 作成済み
- robots: `https://kuchikomi-stars.com/robots.txt`
- canonical: 各ページを `kuchikomi-stars.com` へ統一

旧 `killerword.info` はSEO資産の引継ぎを主目的とせず、過去URL救済の301転送を維持します。旧Search Consoleプロパティの追加・アドレス変更は現時点では行いません。

## カスタムドメイン

GitHub Pagesの `CNAME` は次です。

```text
kuchikomi-stars.com
```

旧 `killerword.info` は新ドメインへの移行・過去URL救済のため当面維持します。

## ローカル確認

リポジトリのルートで任意の静的ファイルサーバーを起動します。

```sh
python3 -m http.server 8000
```

ブラウザで以下を確認します。

```text
http://localhost:8000/
http://localhost:8000/demo/
http://localhost:8000/contact/
```

## 変更時の確認

- PC / Tablet / Mobileで表示崩れがない
- `/demo/` がAPI通信を行わない
- 商品名・料金・保証条件がLP / terms / legalで一致
- contactのGoogleフォームが表示できる
- canonical / robots / sitemapが新ドメイン
- 旧公開APIデモURLをLPへ直接掲載していない
- 旧メール `m-asakura@killerword.info` を不用意に停止しない
- GA4 / Search Console / UTM設定変更時に既存CTA・フォームを壊さない
- UTMは `docs/utm-tracking.md` の固定ルールに従い、内部リンクへ不用意に付与しない
