# 網站架構

Frostmoon 已採用 Vue 3、Vite、TypeScript 與 Vue Router。網站於建置時掃描 `content/chapters/**/*.md`，解析 YAML frontmatter，再用 Markdown-it 產生章節正文。

`content/source/` 永遠不在載入範圍內。章節排序、前後章導覽與網址皆由 `src/content/chapters.ts` 統一處理。

詳細目錄與執行方式見 `docs/PROJECT.md`，內容欄位見 `docs/CONTENT_SCHEMA.md`。

