出張現場記録 PWA v0.3

【内容】
index.html             スマホ用アプリ本体
manifest.webmanifest   PWA設定
sw.js                  オフライン用Service Worker
icon-192.png / 512.png ホーム画面アイコン

【重要】
PWA・GPS・Service Workerを正しく使うには、index.htmlをファイルとして直接開くのではなく、
HTTPS または localhost で配信してください。

PCで簡易確認する場合:
1. このフォルダでターミナルを開く
2. python -m http.server 8000
3. PCなら http://localhost:8000 を開く

スマホ実運用:
HTTPSでアクセスできる場所へこのフォルダの中身を置くのが推奨です。
初回アクセス後、ブラウザの「ホーム画面に追加」からアプリ化できます。

【現場運用】
1. アプリを開き、位置情報を許可
2. GPS表示が「GPS OK」になれば待機完了
3. 作業ボタンをタップ
4. 必要ならメモ・写真を追加
5. 「現在の記録を追加」
6. 出張終了後、「データ」→「PC用パッケージを書き出す」
7. ZIPをPC版の出張報告アプリへ読み込む

【保存】
記録本文はlocalStorage、写真本体はIndexedDBに保存します。
ブラウザのサイトデータを削除すると消えるため、出張終了後はZIPを書き出してください。

【オフライン】
アプリ本体はオフライン対応です。
ZIP生成ライブラリ等の外部ライブラリは、初回オンライン起動時にキャッシュされます。


【v0.3追加：診断】
画面右上の「診断」から以下を確認できます。
- 現在URL / HTTPS・Secure Context
- Geolocation API
- 位置情報権限
- GPS実測テスト（成功時は座標・精度、失敗時はエラーコード）
- Web App Manifest
- Service Worker
- localStorage / IndexedDB
- PWA表示モード
- Chromeの beforeinstallprompt 判定

HTMLをダウンロードして file:// で直接開く方法では、PWAインストールやService Workerが正常に使えません。
HTTPSまたはlocalhostで配信してChromeからアクセスしてください。
