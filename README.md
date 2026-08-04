# クチコミスターズ LP

`killerword.info` で公開する、一般企業向け「Googleクチコミ獲得・運用支援」の静的LPです。

## 構成

- `/`：サービスLP
- `/contact/`：無料簡易診断・問い合わせ
- `/report-sample/`：月次レポートの表示例
- `/privacy/`：プライバシーポリシー
- `/terms/`：サービス利用条件
- `/legal/`：運営者情報・取引条件
- `404.html`、`robots.txt`、`sitemap.xml`

HTML、CSS、最小限のJavaScriptだけで構成し、GitHub Pagesでの公開を前提としています。

## ローカル確認

リポジトリのルートで、任意の静的ファイルサーバーを起動します。

```sh
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## Googleフォームの設定

詳細は [`docs/google-form-setup.md`](docs/google-form-setup.md) を参照してください。

1. Googleフォームを作成して公開します。
2. 回答用URL（`https://forms.gle/...`）を取得します。
3. `assets/site.js` の `GOOGLE_FORM_URL` にURLを設定します。

URLが空の間はGoogleフォーム用ボタンを非表示にし、メール問い合わせだけを表示します。

## GA4・Search Console

- GA4：各HTMLの `body` にある `data-ga4-id=""` へ測定IDを設定します。
- Search Console：トップページの `meta[name="google-site-verification"]` へ確認コードを設定します。

未設定時は外部スクリプトを読み込みません。

## 公開前の確認

- GoogleフォームURL
- GA4測定ID・Search Console確認コード
- GitHub Pagesの公開元ブランチ
- `killerword.info` のカスタムドメイン設定
- DNS変更時に既存のGoogle Workspace用MX・SPF・DKIM・DMARCを保持すること
