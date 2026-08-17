# Frostmoon 專案工作規則

## 內容邊界

- `content/source/` 是原始小說參考資料。除非作者明確要求，不得改寫、覆蓋、移動或刪除。
- 網站不得 import、掃描或直接顯示 `content/source/`。
- `content/chapters/` 是網站唯一會載入的修訂版章節來源。
- 沒有明確的正文修訂要求時，只能調整網站、內容格式與文件，不得自行修改小說情節或文字。

## 網站原則

- 維持 Vue 3、Vite、TypeScript 與 Vue Router 的既有架構。
- 正文使用 Markdown，章節資訊使用 YAML frontmatter。
- 保持首頁、作品資訊、章節列表、閱讀頁及上一章／下一章可用。
- 插圖放在 `public/images/chapters/`，並以 Markdown 圖片語法插入正文。
- 任何介面調整都應優先保護手機與桌面的長時間閱讀體驗。

## 小說方向

作品修訂原則詳見 `docs/NOVEL_GUIDE.md`。網站工作不得順便改寫正式小說內容。

