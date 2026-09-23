# クチコミスターズ UTM計測・命名ルール

更新日: 2026-09-23

この文書は、クチコミスターズのLP・営業導線・導入後の店舗利用導線で使用するUTM命名規則の正本です。

## 1. 基本方針

UTMは次の2系統を分けて管理します。

1. **営業獲得用**: クチコミスターズが見込み客をLPへ送客する導線
2. **導入後の店舗利用計測用**: 契約店舗から来店客・利用客をアンケートへ送る導線

LP自体は流入元ではないため `utm_source=lp` は使用しません。Google検索・Direct等の自然流入にはUTMを付けません。LP内部リンクにも原則UTMを付けません。

## 2. パラメータの役割

| パラメータ | 固定する意味 |
|---|---|
| `utm_source` | 具体的な流入元・入口 |
| `utm_medium` | 経路の大分類 |
| `utm_campaign` | 営業獲得では対象業種、店舗利用では利用計測目的 |
| `utm_content` | 文面・掲載位置・印刷物種別・バージョン |

表記は小文字の英数字とアンダースコアで統一します。会社名、担当者名、メールアドレス、送信日、送信番号など個別情報はUTMに入れません。

## 3. 営業獲得用マスター

| 導線 | 状態 | utm_source | utm_medium | utm_campaign | utm_content |
|---|---|---|---|---|---|
| 直接メール営業 | 使用中 | `direct_email` | `outbound` | 業種別 | `initial_v1` |
| 問い合わせフォーム営業 | 使用中 | `contact_form` | `outbound` | 業種別 | `initial_v1` |
| LINE営業 | 今後 | `line` | `messaging` | 業種別または汎用 | `initial_v1` |
| ランサーズ | 今後登録 | `lancers` | `marketplace` | 原則汎用 | `service_listing_v1` |
| ココナラ | 今後登録 | `coconala` | `marketplace` | 原則汎用 | `service_listing_v1` |
| ジモティー | 今後登録 | `jimoty` | `marketplace` | 原則汎用 | `service_listing_v1` |
| Powered by クチコミスターズ | 使用中 | `review_app` | `referral` | `reviews_general` | `footer_powered_by` |
| FAX営業 | 将来候補 | `fax` | `offline` | 業種別 | `qr_v1` |
| 紹介・代理店 | 将来 | `partner` | `referral` | `reviews_general` | `referral_v1` |

### 営業獲得用 campaign

| 対象業種 | utm_campaign |
|---|---|
| 汎用 | `reviews_general` |
| 歯科医院 | `reviews_dental` |
| リフォーム | `reviews_reform` |
| 賃貸仲介 | `reviews_rental_brokerage` |
| 不動産会社全般 | `reviews_real_estate` |
| 美容室 | `reviews_hair_salon` |
| メンズエステ | `reviews_mens_esthe` |
| 風俗系 | `reviews_adult_services` |
| 今後追加する業種 | `reviews_[industry]` |

賃貸仲介と不動産会社全般は別コードで管理します。新業種は営業開始時にだけ追加し、先回りして大量の未使用コードを作りません。

## 4. 導入後の店舗利用計測用マスター

| 導線 | utm_source | utm_medium | utm_campaign | utm_content |
|---|---|---|---|---|
| 店舗納品QRカード | `store_qr` | `offline` | `survey_usage` | `card_v1` |
| 卓上POP | `store_qr` | `offline` | `survey_usage` | `table_pop_v1` |
| ポスター・チラシ | `store_qr` | `offline` | `survey_usage` | `poster_v1` |
| 店舗からLINE配信 | `store_line` | `messaging` | `survey_usage` | `message_v1` |
| 店舗からメール配信 | `store_email` | `email` | `survey_usage` | `message_v1` |

導入後の店舗利用計測では業種をUTMへ重ねません。どの契約店舗かはテナントURL・slug等で識別し、営業獲得用の業種campaignと混在させません。

## 5. Powered by の扱い

Webアンケートシステム下部の「Powered by クチコミスターズ」は、店舗納品QRカードとは別系統です。

- Powered by: Webアンケートシステム → クチコミスターズLP
- 店舗納品QRカード・POP: 店舗の印刷物等 → 店舗専用アンケート

Powered by の正式値は次とします。

```text
utm_source=review_app
utm_medium=referral
utm_campaign=reviews_general
utm_content=footer_powered_by
```

2026-09-23に `aik38/kuchikomi-stars` へ実装済みです。

## 6. バージョン管理

`utm_content` は意味のある変更時だけ増やします。

- 初回営業文: `initial_v1`
- 初回営業文を大幅改訂: `initial_v2`
- 追客: `followup_v1`
- マーケットプレイス出品: `service_listing_v1`

年月は原則 `utm_campaign` に入れません。期間比較はGA4側の日付範囲で行います。

## 7. 実装・運用ルール

2026-09-23に、現在必要な次の3系統をGitHubへ実装済みです。

1. 営業メールの公式サイトURL
2. Powered by クチコミスターズ
3. 新規生成する店舗納品QRカード・卓上POP・ポスター/チラシ

LP内部リンク、問い合わせフォーム営業、未登録のランサーズ・ココナラ・ジモティーには不要なUTMを追加しません。新チャネル・新業種は実際に運用開始する時点で本マスターへ追加します。

本番反映後はGA4で必要な流入を確認し、既存CTA・フォーム・301転送・公開URLを壊していないことを確認します。

## 8. 費用

UTMパラメータをURLへ付けること自体に料金は発生しません。既存のGA4標準計測でUTM別流入を確認するための追加従量料金もありません。

別途費用が発生し得るのは、有料広告、有料短縮URL、有料QR管理サービス、外部分析SaaS等を新たに導入した場合です。これらはUTM運用の必須要件ではありません。
