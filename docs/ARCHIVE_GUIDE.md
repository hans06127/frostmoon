# 萬象集指南

萬象集路徑為 `/archive`，第一層分為「全部」、「章節插圖」、「角色圖鑑」與「設定圖」；限制檔案維持獨立入口。資料分為：

- `src/content/archive-public.ts`：章節插圖與設定圖。
- `content/characters/*.md`：角色公開資料、圖集、分類與登場章節。
- `src/content/archive-restricted.ts`：通過密碼後才動態載入的限制項目。

圖片建議放在：

```text
public/images/archive/<category>/<filename>.webp
```

每筆資料使用 `ArchiveItem` 格式，需填寫 `id`、`title`、`category`、`image`、`alt`、`description` 與 `tags`。可選填 `arc`、`chapter`。

## 角色圖鑑

角色圖片統一放在 `public/images/characters/`。每名角色建立一個 `content/characters/*.md`，frontmatter 支援：

- `id`、`name`、`aliases`、`categories`
- `firstAppearance`、`portrait`、`role`、`profile`
- `gallery`、`appearances`
- `spoilerInfo`（資料會解析保留，目前不顯示）

frontmatter 後的 Markdown 正文會作為公開人物介紹。角色第二層分類值為 `main`、`frostmoon-manor`、`klein` 與 `staff`。

## 限制分類

預設通行密語為 `frostmoon`。網站只保存 SHA-256 雜湊，可用 `VITE_ARCHIVE_ACCESS_CODE_HASH` 覆寫；解鎖狀態只保留在目前瀏覽器分頁。

GitHub Pages 是靜態網站，這項機制只能作為閱讀門檻，無法防止熟悉開發工具的人取得已部署檔案。真正私密的圖片不應上傳至公開 repo 或 Pages。
