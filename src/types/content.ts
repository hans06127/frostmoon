export type ChapterStatus = 'draft' | 'published'

export interface ChapterFrontmatter {
  id: string
  slug: string
  title: string
  season: number
  arc: string
  arcOrder: number
  chapter: number
  chapterLabel: string
  summary: string
  status: ChapterStatus
  publishedAt?: string
}

export interface Chapter extends ChapterFrontmatter {
  sourcePath: string
  body: string
  html: string
  readingMinutes: number
}
