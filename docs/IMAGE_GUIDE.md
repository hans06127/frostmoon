# 圖片指南

正式章節插圖放在：

```text
public/images/chapters/arc-01/ch001/scene-01.webp
```

在 Markdown 對應段落間引用：

```md
![不暴雷且能描述畫面的替代文字](/images/chapters/arc-01/ch001/scene-01.webp)
```

優先使用 WebP 或 AVIF，並控制檔案尺寸。插圖應服務場景、情緒或資訊揭露，不應提前暴雷；角色重複出現時需維持外觀與服裝設定一致。

萬象集圖片放在 `public/images/archive/<category>/`，資料登錄方式見 `docs/ARCHIVE_GUIDE.md`。

角色圖鑑圖片固定放在 `public/images/characters/`，由 `content/characters/*.md` 的 `portrait` 與 `gallery` 引用。
