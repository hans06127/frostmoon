<script setup lang="ts">
import { ArrowLeft, ArrowRight, Minus, Plus } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { getChapter, getChapterNeighbors } from '@/content/chapters'

const route = useRoute()
const readerScale = ref(1)
const progress = ref(0)

const chapter = computed(() => getChapter(String(route.params.slug)))
const neighbors = computed(() => getChapterNeighbors(String(route.params.slug)))

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0
}

function changeTextSize(delta: number) {
  readerScale.value = Math.min(1.18, Math.max(0.88, readerScale.value + delta))
}

watch(
  chapter,
  (current) => {
    document.title = current ? `${current.title} | Frostmoon` : '找不到章節 | Frostmoon'
    progress.value = 0
  },
  { immediate: true },
)

onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  document.title = 'Frostmoon'
})
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <span :style="{ width: `${progress}%` }"></span>
  </div>

  <article
    v-if="chapter"
    class="reader"
    :style="{ '--reader-scale': readerScale }"
  >
    <header class="reader-header page-width">
      <RouterLink class="reader-back" to="/chapters">
        <ArrowLeft :size="17" aria-hidden="true" />
        章節列表
      </RouterLink>
      <p>{{ chapter.arc }} · {{ chapter.chapterLabel }}</p>
      <h1>{{ chapter.title }}</h1>
      <div class="reader-meta">
        <span>約 {{ chapter.readingMinutes }} 分鐘</span>
        <span aria-hidden="true">·</span>
        <span>第 {{ chapter.season }} 季</span>
      </div>
    </header>

    <div class="reader-toolbar" aria-label="閱讀設定">
      <button
        type="button"
        title="縮小正文"
        aria-label="縮小正文"
        :disabled="readerScale <= 0.88"
        @click="changeTextSize(-0.06)"
      >
        <Minus :size="17" aria-hidden="true" />
      </button>
      <span>字級</span>
      <button
        type="button"
        title="放大正文"
        aria-label="放大正文"
        :disabled="readerScale >= 1.18"
        @click="changeTextSize(0.06)"
      >
        <Plus :size="17" aria-hidden="true" />
      </button>
    </div>

    <div class="reader-body prose" v-html="chapter.html"></div>

    <nav class="chapter-nav page-width" aria-label="章節切換">
      <RouterLink
        v-if="neighbors.previous"
        :to="{ name: 'reader', params: { slug: neighbors.previous.slug } }"
      >
        <ArrowLeft :size="19" aria-hidden="true" />
        <span><small>上一章</small>{{ neighbors.previous.title }}</span>
      </RouterLink>
      <span v-else class="chapter-nav__disabled">
        <ArrowLeft :size="19" aria-hidden="true" />
        <span><small>上一章</small>已是第一章</span>
      </span>

      <RouterLink
        v-if="neighbors.next"
        class="chapter-nav__next"
        :to="{ name: 'reader', params: { slug: neighbors.next.slug } }"
      >
        <span><small>下一章</small>{{ neighbors.next.title }}</span>
        <ArrowRight :size="19" aria-hidden="true" />
      </RouterLink>
      <span v-else class="chapter-nav__disabled chapter-nav__next">
        <span><small>下一章</small>已是最後一章</span>
        <ArrowRight :size="19" aria-hidden="true" />
      </span>
    </nav>
  </article>

  <section v-else class="not-found page-width">
    <p class="eyebrow">404</p>
    <h1>找不到這個章節</h1>
    <RouterLink class="button button--primary" to="/chapters">回到章節列表</RouterLink>
  </section>
</template>
