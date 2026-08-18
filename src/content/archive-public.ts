import type { ArchiveItem } from '@/types/archive'

export const publicArchiveItems: ArchiveItem[] = [
  {
    id: 'frostmoon-visual-001',
    title: '霜月意象',
    category: 'setting',
    image: '/images/chapters/demo/moonlit-library.webp',
    alt: '月夜下的虛構圖書館與攤開的書',
    description: '網站初期使用的氣氛形象，作為霜月世界觀的視覺基準之一。',
    arc: '全篇',
    tags: ['月夜', '圖書館', '概念形象'],
  },
  {
    id: 'frostmoon-manor-001',
    title: '霜月莊園',
    category: 'setting',
    image: '/images/archive/plot/莊園.png',
    alt: '群山與森林環繞的霜月莊園鳥瞰圖',
    description: '霜月莊園的整體環境設定圖。',
    arc: '霜月莊園',
    tags: ['莊園', '建築', '環境設定'],
  },
]
