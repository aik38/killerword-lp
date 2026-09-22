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

2026-09-22時点ではブランドメール移行は未完了です。

現在LP内には旧送信先 `m-asakura@killerword.info` が残っています。新 `m-asakura@kuchikomi-stars.com` の送受信、MX、SPF、DKIM、DMARC確認が完了するまでは、一斉変更しません。

移行完了後に以下を対象として更新します。

- contact
- privacy
- terms
- legal
- footer
- その他 `mailto:` リンク

## GA4 / Search Console

2026-09-22時点では次工程です。

### GA4

各HTMLの `body` に `data-ga4-id=""` を用意しています。測定IDが空の間はGA4を読み込みません。

今後、最低限次を計測する予定です。

- page_view
- 投稿までのデモ閲覧
- 導入相談クリック
- contact到達
- 問い合わせ完了
- LINEクリック
- メールクリック

### Search Console

正規ドメインは `kuchikomi-stars.com` です。Search Consoleはドメインプロパティとして登録し、DNS TXTで所有権確認する方針です。

- sitemap: https://kuchikomi-stars.com/sitemap.xml
- robots: https://kuchikomi-stars.com/robots.txt
- canonical: 各ページを `kuchikomi-stars.com` へ統一

HTMLの `meta[name="google-site-verification"]` は補助用として残していますが、ドメインプロパティの正規確認はDNSを使用する予定です。

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
- メール移行完了前に旧メールを不用意に停止しない
- GA4 / Search Console設定前後で既存CTA・フォームを壊さない
