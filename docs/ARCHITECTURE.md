# ARCHITECTURE

本文件依目前實際工作區記錄 Frostmoon 專案狀態。尚未實作的功能會明確標記為「尚未實作」。

## 專案狀態

- 專案名稱：Frostmoon
- 小說暫定名：《我只是來打工的，沒人說過工作內容會變成這樣吧？》
- GitHub repo：`hans06127/frostmoon`
- 目前本機工作區：ChatGPT project mirror
- 目前狀態：尚未建立前端網站程式、正文目錄與圖片目錄

## 前端框架與版本

尚未實作。

目前工作區沒有 `package.json`、框架設定檔或前端原始碼，因此尚未能判定使用 React、Vue、Astro、Next.js、Nuxt 或其他框架。

## Package Manager

尚未實作。

目前工作區沒有可判定 package manager 的檔案，例如：

- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `bun.lockb`

## Dev / Build 指令

尚未實作。

需等前端專案建立後，再於本文件補上實際指令。

## 部署方式

尚未實作。

目前尚未看到 Sites、Vercel、GitHub Pages 或其他部署設定。

## 章節來源目錄

尚未實作。

建議後續建立：

```text
content/chapters/
```

或依所選前端框架使用慣例內容目錄。

## Markdown / MDX 載入方式

尚未實作。

建立網站後需記錄：

- 使用 Markdown 或 MDX
- frontmatter 解析工具
- 章節排序方式
- 編輯用小節編號是否在閱讀模式顯示

## Frontmatter Schema

目前建議先使用最小 schema：

```yaml
---
title: "蛻皮"
chapter: 1
arc: "霜月莊園"
status: "draft"
---
```

尚未實作實際驗證或載入邏輯。

## 路由生成方式

尚未實作。

後續需依前端框架補上：

- 章節列表路由
- 單章閱讀路由
- Arc 分組路由
- 上一章 / 下一章連結來源

## 圖片處理方式

尚未實作。

建議後續建立：

```text
public/images/
├─ chapters/
├─ characters/
└─ locations/
```

Web 優先使用 WebP 或 AVIF。實際最佳化與載入方式需等前端框架確定後補上。

## Theme / CSS 位置

尚未實作。

建立網站後需記錄：

- 全站樣式位置
- 閱讀頁排版樣式
- 字體設定
- 行距、段距、最大閱讀寬度
- 插圖與文字間距

## 深色模式

尚未實作。

本作品適合支援深色閱讀模式，但需避免低對比與過度裝飾影響長文閱讀。

## 上一章 / 下一章邏輯

尚未實作。

建議由章節 metadata 與檔案排序生成，不要在每章手動維護相鄰連結。

## 如何新增章節

尚未實作正式流程。建議流程如下：

1. 在章節內容目錄新增 Markdown 或 MDX 檔案。
2. 填寫最小 frontmatter。
3. 依大章與小節結構撰寫正文。
4. 若有插圖，放入圖片目錄並在對應場景引用。
5. 檢查章節排序與上一章 / 下一章連結。

## 如何新增插圖

尚未實作正式流程。建議流程如下：

1. 依用途放入 `chapters/`、`characters/` 或 `locations/`。
2. 使用可維護名稱，不使用 `image1.png` 或 `final-final.png`。
3. 優先使用 WebP 或 AVIF。
4. 在正文中靠近對應場景引用。
5. 確認圖片不提前揭露尚未公開的資訊。


