import type { ArchiveItem } from '@/types/archive'

export const publicArchiveItems: ArchiveItem[] = [
  {
    id: 'frostmoon-visual-001',
    title: '雙月意象',
    category: 'setting',
    image: '/images/chapters/demo/moonlit-library.webp',
    alt: '月夜下的虛構圖書館與攤開的書',
    description: '網站初期使用的氣氛形象，保留作為雙月苑世界觀的情緒參考。',
    arc: '全篇',
    tags: ['月夜', '圖書館', '概念形象'],
  },
  {
    id: 'frostmoon-manor-001',
    title: '雙月苑舊版建築圖（待重做）',
    category: 'setting',
    image: '/images/archive/plot/莊園.png',
    alt: '已停用的單棟莊園鳥瞰構圖',
    description: '保留供版本追溯的舊圖；其單棟莊園配置不符合雙月苑正式設定，後續須依總配置鳥瞰準則重做。',
    arc: '雙月苑',
    tags: ['待重做', '舊版', '建築'],
  },
]
