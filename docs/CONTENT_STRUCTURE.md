# 內容結構

正文採「大章 → 小節」兩層結構。網站以一個 Markdown 檔代表一個大章；章內可用 `## 1-1`、`## 1-2` 等標題區分編輯小節。

- 原始小說：`content/source/`，只作參考，網站不讀取。
- 修訂版章節：`content/chapters/`，網站唯一內容來源。
- 章節插圖：`public/images/chapters/`。

完整 frontmatter 與新增章節方式見 `docs/CONTENT_SCHEMA.md`。

