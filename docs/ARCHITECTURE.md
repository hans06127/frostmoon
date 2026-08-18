# 網站架構

Frostmoon 已採用 Vue 3、Vite、TypeScript 與 Vue Router。網站於建置時掃描 `content/chapters/**/*.md`，解析 YAML frontmatter，再用 Markdown-it 產生章節正文。

`content/source/` 永遠不在載入範圍內。章節排序、前後章導覽與網址皆由 `src/content/chapters.ts` 統一處理。

萬象集位於 `/archive`。一般圖像資料由 `src/content/archive-public.ts` 提供；角色由 `src/content/characters.ts` 在建置時掃描 `content/characters/*.md`。公開資料與限制資料分開存放，限制模組只在通行密語驗證成功後動態載入；詳細格式見 `docs/ARCHIVE_GUIDE.md`。

詳細目錄與執行方式見 `docs/PROJECT.md`，內容欄位見 `docs/CONTENT_SCHEMA.md`。
