import MarkdownIt from 'markdown-it'
import { parse as parseYaml } from 'yaml'

import type {
  Character,
  CharacterAppearance,
  CharacterCategory,
  CharacterGalleryImage,
  CharacterSpoilerInfo,
} from '@/types/character'

const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })
const allowedCategories: CharacterCategory[] = ['main', 'frostmoon-manor', 'klein', 'staff']

const rawCharacterModules = import.meta.glob('../../content/characters/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function requireString(data: Record<string, unknown>, field: string, sourcePath: string) {
  const value = data[field]
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field} 必須是非空字串`)
  }
  return value.trim()
}

function stringArray(value: unknown, field: string, sourcePath: string): string[] {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field} 必須是字串陣列`)
  }
  return value.map((item) => item.trim()).filter(Boolean)
}

function appearance(value: unknown, field: string, sourcePath: string): CharacterAppearance | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field} 必須包含 label，可選填 slug`)
  }
  const item = value as Record<string, unknown>
  if (typeof item.label !== 'string' || !item.label.trim()) {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field}.label 必須是非空字串`)
  }
  if (item.slug !== undefined && typeof item.slug !== 'string') {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field}.slug 必須是字串`)
  }
  return { label: item.label.trim(), slug: item.slug?.trim() || undefined }
}

function parseCharacter(sourcePath: string, raw: string): Character {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error(`${sourcePath}: 缺少有效的 YAML frontmatter`)

  const data = parseYaml(match[1]) as Record<string, unknown>
  const categories = stringArray(data.categories, 'categories', sourcePath) as CharacterCategory[]
  if (!categories.length || categories.some((category) => !allowedCategories.includes(category))) {
    throw new Error(`${sourcePath}: categories 至少要有一項有效角色分類`)
  }

  const rawProfile = data.profile
  const profile: Record<string, string> = {}
  if (rawProfile !== undefined) {
    if (typeof rawProfile !== 'object' || rawProfile === null || Array.isArray(rawProfile)) {
      throw new Error(`${sourcePath}: profile 必須是鍵值物件`)
    }
    for (const [key, value] of Object.entries(rawProfile)) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`${sourcePath}: profile.${key} 必須是字串或數字`)
      }
      profile[key] = String(value)
    }
  }

  const rawGallery = data.gallery ?? []
  if (!Array.isArray(rawGallery)) throw new Error(`${sourcePath}: gallery 必須是陣列`)
  const gallery = rawGallery.map((value, index): CharacterGalleryImage => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error(`${sourcePath}: gallery[${index}] 必須是物件`)
    }
    const item = value as Record<string, unknown>
    if (typeof item.image !== 'string' || typeof item.alt !== 'string') {
      throw new Error(`${sourcePath}: gallery[${index}] 必須包含 image 與 alt`)
    }
    return {
      image: item.image.trim(),
      alt: item.alt.trim(),
      caption: typeof item.caption === 'string' ? item.caption.trim() : undefined,
    }
  })

  const rawAppearances = data.appearances ?? []
  if (!Array.isArray(rawAppearances)) throw new Error(`${sourcePath}: appearances 必須是陣列`)
  const appearances = rawAppearances.map((item, index) => {
    const parsed = appearance(item, `appearances[${index}]`, sourcePath)
    if (!parsed) throw new Error(`${sourcePath}: appearances[${index}] 不可為空`)
    return parsed
  })

  const publicInfo = match[2].trim()
  const portrait = requireString(data, 'portrait', sourcePath)
  if (!gallery.some((image) => image.image === portrait)) {
    gallery.unshift({ image: portrait, alt: `${requireString(data, 'name', sourcePath)}人物主圖` })
  }

  return {
    id: requireString(data, 'id', sourcePath),
    name: requireString(data, 'name', sourcePath),
    aliases: stringArray(data.aliases, 'aliases', sourcePath),
    categories,
    firstAppearance: appearance(data.firstAppearance, 'firstAppearance', sourcePath),
    portrait,
    role: requireString(data, 'role', sourcePath),
    profile,
    publicInfo,
    publicInfoHtml: markdown.render(publicInfo),
    spoilerInfo: data.spoilerInfo as CharacterSpoilerInfo | undefined,
    gallery,
    appearances,
    sourcePath,
  }
}

export const characters = Object.entries(rawCharacterModules)
  .map(([sourcePath, raw]) => parseCharacter(sourcePath, raw))
  .sort((a, b) => {
    const mainDifference = Number(b.categories.includes('main')) - Number(a.categories.includes('main'))
    return mainDifference || a.name.localeCompare(b.name, 'zh-Hant')
  })

export function getCharacter(id: string) {
  return characters.find((character) => character.id === id)
}
