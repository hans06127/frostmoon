import MarkdownIt from 'markdown-it'
import { parse as parseYaml } from 'yaml'

import type { Chapter, ChapterFrontmatter, ChapterStatus } from '@/types/content'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

const defaultImageRenderer = markdown.renderer.rules.image
markdown.renderer.rules.image = (tokens, index, options, env, self) => {
  const token = tokens[index]
  const source = token.attrGet('src')
  if (source?.startsWith('/')) {
    token.attrSet('src', `${import.meta.env.BASE_URL}${source.slice(1)}`)
  }
  token.attrSet('loading', 'lazy')
  token.attrSet('decoding', 'async')
  return defaultImageRenderer
    ? defaultImageRenderer(tokens, index, options, env, self)
    : self.renderToken(tokens, index, options)
}

const rawChapterModules = import.meta.glob('../../content/chapters/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function requireString(
  data: Record<string, unknown>,
  field: keyof ChapterFrontmatter,
  sourcePath: string,
): string {
  const value = data[field]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field} 必須是非空字串`)
  }
  return value.trim()
}

function requireNumber(
  data: Record<string, unknown>,
  field: keyof ChapterFrontmatter,
  sourcePath: string,
): number {
  const value = data[field]
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${sourcePath}: frontmatter 欄位 ${field} 必須是數字`)
  }
  return value
}

function parseChapter(sourcePath: string, raw: string): Chapter {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) throw new Error(`${sourcePath}: 缺少有效的 YAML frontmatter`)

  const data = parseYaml(match[1]) as Record<string, unknown>
  const status = requireString(data, 'status', sourcePath) as ChapterStatus
  if (!['draft', 'published'].includes(status)) {
    throw new Error(`${sourcePath}: status 只接受 draft 或 published`)
  }

  const body = match[2].trim()
  const plainText = body.replace(/[#>*_`\[\]()!-]/g, ' ')
  const textLength = plainText.replace(/\s/g, '').length

  return {
    id: requireString(data, 'id', sourcePath),
    slug: requireString(data, 'slug', sourcePath),
    title: requireString(data, 'title', sourcePath),
    season: requireNumber(data, 'season', sourcePath),
    arc: requireString(data, 'arc', sourcePath),
    arcOrder: requireNumber(data, 'arcOrder', sourcePath),
    chapter: requireNumber(data, 'chapter', sourcePath),
    chapterLabel: requireString(data, 'chapterLabel', sourcePath),
    summary: requireString(data, 'summary', sourcePath),
    status,
    publishedAt:
      typeof data.publishedAt === 'string' ? data.publishedAt.trim() : undefined,
    sourcePath,
    body,
    html: markdown.render(body),
    readingMinutes: Math.max(1, Math.ceil(textLength / 500)),
  }
}

export const chapters = Object.entries(rawChapterModules)
  .map(([sourcePath, raw]) => parseChapter(sourcePath, raw))
  .filter((chapter) => chapter.status === 'published')
  .sort((a, b) => a.arcOrder - b.arcOrder || a.chapter - b.chapter)

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug)
}

export function getChapterNeighbors(slug: string) {
  const index = chapters.findIndex((chapter) => chapter.slug === slug)
  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined,
  }
}
