# クチコミスターズ UTMリンク監査

更新日: 2026-09-23

この文書は、`docs/utm-tracking.md` の正式UTMマスターに対して、現在実際に存在する導線を洗い出した監査記録です。

## 1. 結論

現時点で、UTM実装が必要になる既存導線は主に次の2系統です。

1. 営業メール内のクチコミスターズ公式サイトURL
2. Webアンケートシステム下部の「Powered by クチコミスターズ」

問い合わせフォーム営業は、現行4シートの本文仕様では公式サイトURL・LINEリンクを入れていないため、現時点ではUTM付与対象がありません。

LP内部リンク、canonical、メールリンク、LINE、Googleフォーム等にはUTMを付与しません。

監査後、2026-09-23に必要箇所だけ実装しました。営業文章、contacts.xlsx構造、GUI、フォーム入力ロジック、LP内部リンクは変更していません。

## 2. LP（killerword-lp）監査

対象:
- `/`
- `/contact/`
- `/demo/`
- `/report-sample/`
- `/privacy/`
- `/terms/`
- `/legal/`
- `404.html`

### 監査結果

- canonicalは `https://kuchikomi-stars.com/` 系で統一
- 公開メールは `info@kuchikomi-stars.com`
- LP内のページ遷移は相対リンク
- LINEリンクは外部CTA
- Googleフォームは外部CTA
- LP内部リンクにUTMは付いていない
- 旧 `killerword.info` を直接参照する公開HTMLリンクは、今回確認した現行LPファイルでは対象外

### 判定

**変更不要**

理由:
LPは流入先であり、内部リンクにUTMを付けると本来の流入元判定を壊すためです。LINE・Googleフォーム等はLPから外へ出るCTAであり、クチコミスターズLPへの流入計測用UTMとは別です。

## 3. 営業メール監査

営業メール本文に含まれる bare `https://kuchikomi-stars.com/` は、送信・プレビュー時にテンプレート名から業種を判定し、正式マスターのUTMを自動付与する実装へ更新済みです。

### 実装内容

営業メール内の公式サイトURLだけを、テンプレートの対象業種に応じて次の形式へ変換します。

例: リフォーム

```text
https://kuchikomi-stars.com/?utm_source=direct_email&utm_medium=outbound&utm_campaign=reviews_reform&utm_content=initial_v1
```

例: 歯科

```text
https://kuchikomi-stars.com/?utm_source=direct_email&utm_medium=outbound&utm_campaign=reviews_dental&utm_content=initial_v1
```

営業文章そのものは変更せず、公式サイトURLだけを対象とします。

### 判定

**実装完了・実テンプレート確認済み**（`aik38/auto-sales` PR #17）

## 4. 問い合わせフォーム営業監査

現行の4シート:

- 汎用クチコミ
- 賃貸仲介クチコミ
- リフォームクチコミ
- 医療機関クチコミ

現在の確定仕様では、問い合わせフォーム本文に公式サイトURL・LINEリンクを入れていません。

### 判定

**現時点ではUTM実装不要**

将来、問い合わせフォーム本文にLPリンクを入れる方針へ変更した場合だけ、

```text
utm_source=contact_form
utm_medium=outbound
utm_campaign=業種別
utm_content=initial_v1
```

を使用します。

## 5. Powered by クチコミスターズ監査

Webアンケートシステム下部のPowered byリンクは、正式UTMマスターへ統一済みです。

```text
utm_source=review_app
utm_medium=referral
utm_campaign=reviews_general
utm_content=footer_powered_by
```

### 判定

**実装・本番確認済み**（`aik38/kuchikomi-stars` PR #17）

## 6. 店舗納品QRカード・卓上POP等

これは営業獲得用とは別の「導入後の店舗利用計測」です。

正式値:

```text
utm_source=store_qr
utm_medium=offline
utm_campaign=survey_usage
utm_content=card_v1
```

卓上POP:

```text
utm_source=store_qr
utm_medium=offline
utm_campaign=survey_usage
utm_content=table_pop_v1
```

ポスター・チラシ用は `utm_content=poster_v1` を使用します。

### 判定

**実装・本番確認済み**（`aik38/kuchikomi-stars` PR #17）

管理画面から新規生成するQRについて、QRカード・卓上POP・ポスター/チラシを選び分けられるようにしています。既に印刷済み・配布済みのQRコードは差し替えません。

## 7. 未登録・将来チャネル

現時点ではリンク自体が存在しないため、実装対象外です。

- ランサーズ
- ココナラ
- ジモティー
- FAX
- 紹介・代理店
- 新規業種の専用営業導線

登録・運用開始時に `docs/utm-tracking.md` のマスター値を使います。

## 8. 実装結果

2026-09-23に次をGitHubへ実装済みです。

1. 営業メールの公式サイトURLへの業種別UTM自動付与
2. Powered by クチコミスターズの正式マスターへの統一
3. 新規生成する店舗納品QRカード・卓上POP・ポスター/チラシのUTM分離

問い合わせフォーム営業は、LP URLを本文に入れない現行仕様のため対応不要です。ランサーズ、ココナラ、ジモティー等は実際に登録・運用開始した時点で追加します。

## 9. 監査ステータス

| 対象 | 監査 | UTM対応 |
|---|---|---|
| LP内部リンク | 完了 | 不要 |
| LP canonical | 完了 | 不要 |
| LPメール/LINE/Googleフォーム | 完了 | UTM不要 |
| 営業メール公式サイトURL | 完了 | 実装済み・実テンプレート確認済み |
| 問い合わせフォーム営業 | 完了 | 現状LP URLなしのため不要 |
| Powered by クチコミスターズ | 完了 | 実装・本番確認済み |
| 店舗納品QR/POP | 完了 | 実装・本番確認済み・新規生成時に適用 |
| ランサーズ等 | 次工程 | 登録時に適用 |

