<script setup lang="ts">
import { ArrowRight, Clock3 } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import { chapters } from '@/content/chapters'
</script>

<template>
  <section class="page-intro page-width page-intro--compact">
    <p class="eyebrow">CHAPTERS</p>
    <h1>章節列表</h1>
    <p class="page-intro__lead">依篇章與章次排序，從序章開始進入 Frostmoon 的故事。</p>
  </section>

  <section class="chapter-list page-width section-space">
    <RouterLink
      v-for="chapter in chapters"
      :key="chapter.id"
      class="chapter-row"
      :to="{ name: 'reader', params: { slug: chapter.slug } }"
    >
      <div class="chapter-row__number">{{ String(chapter.chapter).padStart(2, '0') }}</div>
      <div class="chapter-row__body">
        <span>{{ chapter.arc }} · {{ chapter.chapterLabel }}</span>
        <h2>{{ chapter.title }}</h2>
        <p>{{ chapter.summary }}</p>
      </div>
      <div class="chapter-row__meta">
        <span><Clock3 :size="15" aria-hidden="true" /> {{ chapter.readingMinutes }} 分鐘</span>
        <ArrowRight :size="20" aria-hidden="true" />
      </div>
    </RouterLink>
  </section>
</template>
