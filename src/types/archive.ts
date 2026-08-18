export type ArchiveCategory = 'chapter-illustration' | 'setting'

export interface ArchiveItem {
  id: string
  title: string
  category: ArchiveCategory
  image: string
  alt: string
  description: string
  arc?: string
  chapter?: string
  tags: string[]
}
