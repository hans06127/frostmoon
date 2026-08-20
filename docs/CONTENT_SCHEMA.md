# 內容格式

網站只會讀取 `content/chapters/**/*.md`。每個 Markdown 檔案代表一個大章，排序由 frontmatter 決定，不依賴檔名。

## 章節範例

```md
---
id: "arc01-ch001"
slug: "arc01-chapter-001"
title: "第一章標題"
season: 1
arc: "雙月苑"
arcOrder: 1
chapter: 1
chapterLabel: "第一章"
summary: "不暴雷的章節摘要。"
status: "published"
publishedAt: "2026-08-17"
---

正文第一段。

## 1-1 小節標題

正文內容。

![插圖替代文字](/images/chapters/arc-01/ch001/scene-01.webp)

插圖後的正文。
```

## 正式必填欄位

- `id`
- `slug`
- `title`
- `season`
- `arc`
- `arcOrder`
- `chapter`
- `chapterLabel`
- `summary`
- `status`

`season` 必須是 number。`status` 只接受 `draft` 或 `published`；網站目前只顯示 `published`。`slug` 必須唯一，並會成為閱讀網址。`publishedAt` 是既有的可選欄位，不是正式必填欄位。

## 新增章節

1. 在 `content/chapters/arc-XX-name/` 新增 `.md` 檔。
2. 複製上方 frontmatter，填寫唯一 `id`、`slug` 與排序欄位。
3. 把網站要顯示的修訂版正文寫在第二個 `---` 之後。
4. 圖片放入 `public/images/chapters/`，再以 Markdown 圖片語法插入。
5. 執行 `pnpm build`；欄位缺漏或格式錯誤時，建置會指出檔案。
