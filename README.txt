出張現場記録 PWA v0.6.2

Dropbox同期修正:
- ブラウザ/PWA向けDropbox公式CORS形式に変更
- authorization/arg をURLパラメータ化
- Content-Type: text/plain; charset=dropbox-cors-hack
- reject_cors_preflight=true
- 同期失敗時のエラー表示を詳細化

出張現場記録 PWA v0.6

主な変更:
- v0.5の写真即時記録・作業/メモ一元化を維持
- Dropbox App Folderへ軽量な trip_records.json を自動同期
- 写真本体はDropboxへ送信しない
- PKCE認証（App secret不要）
- オフライン時は端末へ保存し、オンライン復帰後に再同期
- App keyはアプリ画面から保存
- PC版は同じDropboxアプリから最新記録を取得

注意:
- DropboxのRedirect URIに
  https://ryoyasato-web.github.io/trip-recorder/
  を登録する
- App secretをHTML/GitHubへ入れない

Dropbox同期は公式JavaScript SDKを使用。エラー時は詳細を表示します。
