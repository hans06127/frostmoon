# Frostmoon 專案

Frostmoon 是《我只是來打工的，沒人說過工作內容會變成這樣吧？》的沉浸式小說閱讀網站。

## 技術

- Vue 3 + Vite + TypeScript
- Vue Router
- Markdown-it + YAML frontmatter
- 內容於建置時從 `content/chapters/**/*.md` 載入

## 主要目錄

```text
content/source/     原始小說，只作參考
content/chapters/   網站實際顯示的修訂版章節
content/characters/ 網站顯示的角色圖鑑 Markdown
public/images/      網站圖片
src/                Vue 網站程式
docs/               專案與內容規範
```

## 本機執行

```text
pnpm install
pnpm dev
pnpm build
pnpm preview
```

主要路由為 `/`、`/novel`、`/chapters` 與 `/read/:slug`。
