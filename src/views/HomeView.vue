<script setup lang="ts">
import { ArrowRight, BookOpenText, Layers3 } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { chapters } from '@/content/chapters'

const firstChapter = computed(() => chapters[0])
const arcOneChapterCount = computed(
  () => chapters.filter((chapter) => chapter.arcOrder === 1).length,
)
const heroImage = `${import.meta.env.BASE_URL}images/chapters/demo/moonlit-library.webp`
</script>

<template>
  <section class="home-hero">
    <img
      class="home-hero__image"
      :src="heroImage"
      alt="月夜下的虛構圖書館與攤開的書"
    />
    <div class="home-hero__shade"></div>
    <div class="home-hero__content page-width">
      <p class="eyebrow">FROSTMOON · 長篇小說</p>
      <h1>我只是來打工的，<br />沒人說過工作內容會變成這樣吧？</h1>
      <p class="home-hero__lead">
        黑暗懸疑、身分置換與人物關係交織的沉浸式長篇故事。
      </p>
      <div class="hero-actions">
        <RouterLink
          v-if="firstChapter"
          class="button button--primary"
          :to="{ name: 'reader', params: { slug: firstChapter.slug } }"
        >
          <BookOpenText :size="18" aria-hidden="true" />
          開始閱讀
        </RouterLink>
        <RouterLink class="button button--quiet" to="/chapters">
          查看章節
          <ArrowRight :size="18" aria-hidden="true" />
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="home-catalog page-width section-space">
    <div class="section-heading">
      <div>
        <p class="eyebrow">READING SHELF</p>
        <h2>目前篇章</h2>
      </div>
      <RouterLink class="text-link" to="/novel">作品資訊 <ArrowRight :size="16" /></RouterLink>
    </div>

    <div class="arc-grid">
      <article>
        <Layers3 :size="22" aria-hidden="true" />
        <span>Arc 01</span>
        <h3>霜月莊園</h3>
        <p>{{ arcOneChapterCount }} 篇章節已公開。</p>
      </article>
      <article>
        <Layers3 :size="22" aria-hidden="true" />
        <span>Arc 02</span>
        <h3>克萊因學院</h3>
        <p>正式章節尚未匯入。</p>
      </article>
      <article>
        <Layers3 :size="22" aria-hidden="true" />
        <span>Arc 03</span>
        <h3>未定</h3>
        <p>篇章規劃中。</p>
      </article>
    </div>
  </section>
</template>
