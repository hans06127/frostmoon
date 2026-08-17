<script setup lang="ts">
import { BookOpenText, List, Moon, ScrollText, Sun } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')

function applyTheme(nextTheme: Theme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('frostmoon-theme', nextTheme)
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  const saved = localStorage.getItem('frostmoon-theme') as Theme | null
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
  applyTheme(saved === 'light' || saved === 'dark' ? saved : preferred)
})
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="Frostmoon 首頁">
      <span class="brand__moon" aria-hidden="true"></span>
      <span>Frostmoon</span>
    </RouterLink>

    <nav class="primary-nav" aria-label="主要導覽">
      <RouterLink to="/novel">
        <ScrollText :size="17" aria-hidden="true" />
        <span>作品</span>
      </RouterLink>
      <RouterLink to="/chapters">
        <List :size="17" aria-hidden="true" />
        <span>章節</span>
      </RouterLink>
      <RouterLink v-if="$route.name !== 'reader'" :to="{ name: 'reader', params: { slug: 'moonlit-reading-room' } }">
        <BookOpenText :size="17" aria-hidden="true" />
        <span>閱讀</span>
      </RouterLink>
    </nav>

    <button
      class="icon-button"
      type="button"
      :title="theme === 'dark' ? '切換淺色模式' : '切換深色模式'"
      :aria-label="theme === 'dark' ? '切換淺色模式' : '切換深色模式'"
      @click="toggleTheme"
    >
      <Sun v-if="theme === 'dark'" :size="19" aria-hidden="true" />
      <Moon v-else :size="19" aria-hidden="true" />
    </button>
  </header>
</template>
