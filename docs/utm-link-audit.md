# クチコミスターズ UTMリンク監査

更新日: 2026-09-23

この文書は、`docs/utm-tracking.md` の正式UTMマスターに対して、現在実際に存在する導線を洗い出した監査記録です。

## 1. 結論

現時点で、UTM実装が必要になる既存導線は主に次の2系統です。

1. 営業メール内のクチコミスターズ公式サイトURL
2. Webアンケートシステム下部の「Powered by クチコミスターズ」

問い合わせフォーム営業は、現行4シートの本文仕様では公式サイトURL・LINEリンクを入れていないため、現時点ではUTM付与対象がありません。

LP内部リンク、canonical、メールリンク、LINE、Googleフォーム等にはUTMを付与しません。

なお、この監査ではリンクの洗い出しだけを行い、既存の営業文、contacts.xlsx、GUI、フォーム入力ロジック、LP HTML、アンケートシステムのコードは変更していません。

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

現在の営業メールテンプレートでは、公式サイトURLは `https://kuchikomi-stars.com/` に移行済みで、UTMはまだ付いていません。

### 将来の実装方針

営業メール内の公式サイトURLだけを、テンプレートの対象業種に応じて次の形式へ変更します。

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

**UTM実装対象 / 現時点では未実装**

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

Webアンケートシステムの現行リンクは次のUTMを使用しています。

```text
utm_source=review.kuchikomi-stars.com
utm_medium=referral
utm_campaign=powered_by
```

正式UTMマスターでは次を採用しています。

```text
utm_source=review_app
utm_medium=referral
utm_campaign=reviews_general
utm_content=footer_powered_by
```

### 判定

**既存UTMと正式マスターに差分あり**

将来の実装対象です。ただし、ブランド移行の今回作業では `aik38/kuchikomi-stars` のコード変更は禁止されているため、この監査段階では変更しません。

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

### 判定

**今後の新規生成物から適用する候補**

既に印刷済み・配布済みのQRコードをUTMのためだけに差し替える必要はありません。

## 7. 未登録・将来チャネル

現時点ではリンク自体が存在しないため、実装対象外です。

- ランサーズ
- ココナラ
- ジモティー
- FAX
- 紹介・代理店
- 新規業種の専用営業導線

登録・運用開始時に `docs/utm-tracking.md` のマスター値を使います。

## 8. 実装優先順位

実装が許可された段階では、次の順序で行います。

1. 営業メールテンプレート内の公式サイトURL
2. Powered by クチコミスターズ
3. 新規生成する店舗納品QRカード・POP
4. ランサーズ、ココナラ、ジモティー等の新規チャネル

問い合わせフォーム営業は、LP URLを本文に入れない現行仕様のままなら対応不要です。

## 9. 監査ステータス

| 対象 | 監査 | UTM対応 |
|---|---|---|
| LP内部リンク | 完了 | 不要 |
| LP canonical | 完了 | 不要 |
| LPメール/LINE/Googleフォーム | 完了 | UTM不要 |
| 営業メール公式サイトURL | 完了 | 将来実装 |
| 問い合わせフォーム営業 | 完了 | 現状不要 |
| Powered by クチコミスターズ | 完了 | 将来修正 |
| 店舗納品QR/POP | 方針確定 | 新規生成時に適用 |
| ランサーズ等 | 未登録 | 登録時に適用 |

