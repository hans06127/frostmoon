<script setup lang="ts">
import {
  BookImage,
  Eye,
  EyeOff,
  GalleryHorizontal,
  Images,
  KeyRound,
  LockKeyhole,
  Map,
  UsersRound,
  X,
} from '@lucide/vue'
import { computed, nextTick, onMounted, ref, type Component } from 'vue'
import { RouterLink } from 'vue-router'

import { archiveAccessCodeHash } from '@/config/archive'
import { publicArchiveItems } from '@/content/archive-public'
import { characters } from '@/content/characters'
import { getChapter } from '@/content/chapters'
import type { ArchiveCategory, ArchiveItem } from '@/types/archive'
import type { Character, CharacterCategory } from '@/types/character'

type ArchiveFilter = 'all' | 'character' | 'restricted' | ArchiveCategory
type CharacterFilter = 'all' | CharacterCategory

interface CategoryOption<T> {
  id: T
  label: string
  icon?: Component
}

type DisplayCard =
  | { kind: 'archive'; item: ArchiveItem }
  | { kind: 'character'; item: Character }

const categories: CategoryOption<ArchiveFilter>[] = [
  { id: 'all', label: '全部', icon: GalleryHorizontal },
  { id: 'chapter-illustration', label: '章節插圖', icon: BookImage },
  { id: 'character', label: '角色圖鑑', icon: UsersRound },
  { id: 'setting', label: '設定圖', icon: Map },
  { id: 'restricted', label: '限制', icon: LockKeyhole },
]

const characterCategories: CategoryOption<CharacterFilter>[] = [
  { id: 'all', label: '全部' },
  { id: 'main', label: '主要角色' },
  { id: 'frostmoon-manor', label: '雙月苑' },
  { id: 'klein', label: '克萊因' },
  { id: 'staff', label: '工作人員' },
]

const activeCategory = ref<ArchiveFilter>('all')
const activeCharacterCategory = ref<CharacterFilter>('all')
const restrictedItems = ref<ArchiveItem[]>([])
const restrictedUnlocked = ref(false)
const accessCode = ref('')
const accessError = ref('')
const isUnlocking = ref(false)
const showAccessCode = ref(false)
const selectedArchiveItem = ref<ArchiveItem>()
const selectedCharacter = ref<Character>()
const activeCharacterImage = ref('')
const detailDialog = ref<HTMLDialogElement>()

const filteredCharacters = computed(() => {
  const category = activeCharacterCategory.value
  if (category === 'all') return characters
  return characters.filter((character) => character.categories.includes(category))
})

const visibleCards = computed<DisplayCard[]>(() => {
  if (activeCategory.value === 'restricted') {
    return restrictedUnlocked.value
      ? restrictedItems.value.map((item) => ({ kind: 'archive' as const, item }))
      : []
  }
  if (activeCategory.value === 'character') {
    return filteredCharacters.value.map((item) => ({ kind: 'character' as const, item }))
  }
  if (activeCategory.value === 'all') {
    return [
      ...characters.map((item) => ({ kind: 'character' as const, item })),
      ...publicArchiveItems.map((item) => ({ kind: 'archive' as const, item })),
    ]
  }
  return publicArchiveItems
    .filter((item) => item.category === activeCategory.value)
    .map((item) => ({ kind: 'archive' as const, item }))
})

function imageUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

function archiveCategoryLabel(category: ArchiveCategory) {
  return categories.find((option) => option.id === category)?.label
}

function characterCategoryLabel(category: CharacterCategory) {
  return characterCategories.find((option) => option.id === category)?.label
}

function itemCount(category: ArchiveFilter) {
  if (category === 'restricted') {
    return restrictedUnlocked.value ? restrictedItems.value.length : undefined
  }
  if (category === 'all') return publicArchiveItems.length + characters.length
  if (category === 'character') return characters.length
  return publicArchiveItems.filter((item) => item.category === category).length
}

function characterCount(category: CharacterFilter) {
  if (category === 'all') return characters.length
  return characters.filter((character) => character.categories.includes(category)).length
}

function appearanceIsPublished(slug?: string) {
  return slug ? Boolean(getChapter(slug)) : false
}

async function loadRestrictedItems() {
  const module = await import('@/content/archive-restricted')
  restrictedItems.value = module.restrictedArchiveItems
}

async function hashAccessCode(value: string) {
  const input = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', input)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function unlockRestricted() {
  accessError.value = ''
  if (!accessCode.value) {
    accessError.value = '請輸入通行密語。'
    return
  }

  isUnlocking.value = true
  const inputHash = await hashAccessCode(accessCode.value)

  if (inputHash !== archiveAccessCodeHash) {
    accessError.value = '通行密語不正確。'
    accessCode.value = ''
    isUnlocking.value = false
    return
  }

  await loadRestrictedItems()
  restrictedUnlocked.value = true
  sessionStorage.setItem('frostmoon-archive-unlocked', 'true')
  accessCode.value = ''
  isUnlocking.value = false
}

function lockRestricted() {
  restrictedUnlocked.value = false
  restrictedItems.value = []
  sessionStorage.removeItem('frostmoon-archive-unlocked')
}

async function openCard(card: DisplayCard) {
  if (card.kind === 'character') {
    selectedCharacter.value = card.item
    activeCharacterImage.value = card.item.portrait
  } else {
    selectedArchiveItem.value = card.item
  }
  await nextTick()
  detailDialog.value?.showModal()
}

function closeItem() {
  detailDialog.value?.close()
}

function clearSelection() {
  selectedArchiveItem.value = undefined
  selectedCharacter.value = undefined
  activeCharacterImage.value = ''
}

onMounted(async () => {
  if (sessionStorage.getItem('frostmoon-archive-unlocked') === 'true') {
    await loadRestrictedItems()
    restrictedUnlocked.value = true
  }
})
</script>

<template>
  <section class="page-intro page-width page-intro--compact archive-intro">
    <p class="eyebrow">ARCHIVE</p>
    <h1>萬象集</h1>
    <p class="page-intro__lead">雙月苑與克萊因世界的面孔、場所與遺留物。</p>
  </section>

  <section class="archive page-width section-space">
    <div class="archive-tabs" role="tablist" aria-label="萬象集分類">
      <button
        v-for="category in categories"
        :key="category.id"
        class="archive-tab"
        :class="{ 'archive-tab--active': activeCategory === category.id }"
        type="button"
        role="tab"
        :aria-selected="activeCategory === category.id"
        @click="activeCategory = category.id"
      >
        <component :is="category.icon" :size="17" aria-hidden="true" />
        <span>{{ category.label }}</span>
        <small v-if="itemCount(category.id) !== undefined">{{ itemCount(category.id) }}</small>
      </button>
    </div>

    <div
      v-if="activeCategory === 'character'"
      class="archive-subtabs"
      role="tablist"
      aria-label="角色圖鑑分類"
    >
      <button
        v-for="category in characterCategories"
        :key="category.id"
        class="archive-subtab"
        :class="{ 'archive-subtab--active': activeCharacterCategory === category.id }"
        type="button"
        role="tab"
        :aria-selected="activeCharacterCategory === category.id"
        @click="activeCharacterCategory = category.id"
      >
        <span>{{ category.label }}</span>
        <small>{{ characterCount(category.id) }}</small>
      </button>
    </div>

    <div v-if="activeCategory === 'restricted' && !restrictedUnlocked" class="archive-lock">
      <LockKeyhole :size="30" aria-hidden="true" />
      <p class="eyebrow">RESTRICTED</p>
      <h2>限制檔案</h2>
      <form class="archive-lock__form" @submit.prevent="unlockRestricted">
        <label for="archive-access-code">通行密語</label>
        <div class="archive-lock__input">
          <KeyRound :size="18" aria-hidden="true" />
          <input
            id="archive-access-code"
            v-model="accessCode"
            :type="showAccessCode ? 'text' : 'password'"
            autocomplete="current-password"
            :aria-describedby="accessError ? 'archive-access-error' : undefined"
          />
          <button
            type="button"
            :title="showAccessCode ? '隱藏密語' : '顯示密語'"
            :aria-label="showAccessCode ? '隱藏密語' : '顯示密語'"
            @click="showAccessCode = !showAccessCode"
          >
            <EyeOff v-if="showAccessCode" :size="18" aria-hidden="true" />
            <Eye v-else :size="18" aria-hidden="true" />
          </button>
        </div>
        <p v-if="accessError" id="archive-access-error" class="archive-lock__error" role="alert">
          {{ accessError }}
        </p>
        <button class="button button--primary" type="submit" :disabled="isUnlocking">
          <KeyRound :size="17" aria-hidden="true" />
          {{ isUnlocking ? '驗證中' : '解鎖' }}
        </button>
      </form>
    </div>

    <template v-else>
      <div v-if="activeCategory === 'restricted'" class="archive-access-bar">
        <span><LockKeyhole :size="16" aria-hidden="true" />限制檔案已解鎖</span>
        <button type="button" @click="lockRestricted">重新上鎖</button>
      </div>

      <div v-if="visibleCards.length" class="archive-grid">
        <button
          v-for="card in visibleCards"
          :key="`${card.kind}-${card.item.id}`"
          class="archive-card"
          :class="{ 'archive-card--character': card.kind === 'character' }"
          type="button"
          @click="openCard(card)"
        >
          <span class="archive-card__image">
            <img
              :src="imageUrl(card.kind === 'character' ? card.item.portrait : card.item.image)"
              :alt="card.kind === 'character' ? `${card.item.name}人物圖` : card.item.alt"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span class="archive-card__body">
            <template v-if="card.kind === 'character'">
              <small>角色圖鑑</small>
              <strong>{{ card.item.name }}</strong>
              <span>{{ card.item.role }}</span>
              <span class="archive-card__appearance">
                首次登場：{{ card.item.firstAppearance?.label || '尚待補充' }}
              </span>
            </template>
            <template v-else>
              <small>{{ archiveCategoryLabel(card.item.category) }}</small>
              <strong>{{ card.item.title }}</strong>
              <span>{{ card.item.arc || 'Frostmoon' }}</span>
            </template>
          </span>
        </button>
      </div>

      <div v-else class="archive-empty">
        <Images :size="26" aria-hidden="true" />
        <p>此分類尚未收錄內容。</p>
      </div>
    </template>
  </section>

  <dialog ref="detailDialog" class="archive-dialog" @close="clearSelection">
    <template v-if="selectedCharacter">
      <button class="archive-dialog__close" type="button" title="關閉" aria-label="關閉" @click="closeItem">
        <X :size="20" aria-hidden="true" />
      </button>
      <div class="character-dialog__visual">
        <img
          :src="imageUrl(activeCharacterImage)"
          :alt="`${selectedCharacter.name}人物圖`"
          decoding="async"
        />
      </div>
      <div class="archive-dialog__content character-dialog__content">
        <p class="eyebrow">CHARACTER FILE</p>
        <h2>{{ selectedCharacter.name }}</h2>
        <p v-if="selectedCharacter.aliases.length" class="character-dialog__aliases">
          別名：{{ selectedCharacter.aliases.join('、') }}
        </p>

        <section class="character-dialog__section">
          <h3>基本資料</h3>
          <dl>
            <div><dt>身分</dt><dd>{{ selectedCharacter.role }}</dd></div>
            <div v-if="selectedCharacter.firstAppearance">
              <dt>初登場</dt><dd>{{ selectedCharacter.firstAppearance.label }}</dd>
            </div>
            <div><dt>所屬</dt><dd>{{ selectedCharacter.categories.map(characterCategoryLabel).join('、') }}</dd></div>
            <div v-for="(value, label) in selectedCharacter.profile" :key="label">
              <dt>{{ label }}</dt><dd>{{ value }}</dd>
            </div>
          </dl>
        </section>

        <section class="character-dialog__section">
          <h3>人物介紹</h3>
          <div class="character-dialog__prose" v-html="selectedCharacter.publicInfoHtml"></div>
        </section>

        <section class="character-dialog__section">
          <h3>人物圖集</h3>
          <div class="character-gallery">
            <button
              v-for="image in selectedCharacter.gallery"
              :key="image.image"
              type="button"
              :class="{ 'character-gallery__item--active': activeCharacterImage === image.image }"
              :title="image.caption"
              @click="activeCharacterImage = image.image"
            >
              <img :src="imageUrl(image.image)" :alt="image.alt" loading="lazy" decoding="async" />
              <span v-if="image.caption">{{ image.caption }}</span>
            </button>
          </div>
        </section>

        <section class="character-dialog__section">
          <h3>登場章節</h3>
          <ul class="character-appearances">
            <li v-for="appearance in selectedCharacter.appearances" :key="appearance.slug || appearance.label">
              <RouterLink
                v-if="appearanceIsPublished(appearance.slug)"
                :to="{ name: 'reader', params: { slug: appearance.slug } }"
                @click="closeItem"
              >
                {{ appearance.label }}
              </RouterLink>
              <span v-else>{{ appearance.label }}</span>
            </li>
          </ul>
        </section>
      </div>
    </template>

    <template v-else-if="selectedArchiveItem">
      <button class="archive-dialog__close" type="button" title="關閉" aria-label="關閉" @click="closeItem">
        <X :size="20" aria-hidden="true" />
      </button>
      <img :src="imageUrl(selectedArchiveItem.image)" :alt="selectedArchiveItem.alt" />
      <div class="archive-dialog__content">
        <p class="eyebrow">{{ archiveCategoryLabel(selectedArchiveItem.category) }}</p>
        <h2>{{ selectedArchiveItem.title }}</h2>
        <p>{{ selectedArchiveItem.description }}</p>
        <dl v-if="selectedArchiveItem.arc || selectedArchiveItem.chapter">
          <div v-if="selectedArchiveItem.arc"><dt>篇章</dt><dd>{{ selectedArchiveItem.arc }}</dd></div>
          <div v-if="selectedArchiveItem.chapter"><dt>章節</dt><dd>{{ selectedArchiveItem.chapter }}</dd></div>
        </dl>
        <ul class="archive-dialog__tags" aria-label="標籤">
          <li v-for="tag in selectedArchiveItem.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </template>
  </dialog>
</template>
