export type CharacterCategory = 'main' | 'frostmoon-manor' | 'klein' | 'staff'

export interface CharacterAppearance {
  slug?: string
  label: string
}

export interface CharacterGalleryImage {
  image: string
  alt: string
  caption?: string
}

export interface CharacterSpoilerInfo {
  identities?: string[]
  notes?: string[]
  [key: string]: unknown
}

export interface Character {
  id: string
  name: string
  aliases: string[]
  categories: CharacterCategory[]
  firstAppearance?: CharacterAppearance
  portrait: string
  role: string
  profile: Record<string, string>
  publicInfo: string
  publicInfoHtml: string
  spoilerInfo?: CharacterSpoilerInfo
  gallery: CharacterGalleryImage[]
  appearances: CharacterAppearance[]
  sourcePath: string
}
