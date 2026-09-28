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
