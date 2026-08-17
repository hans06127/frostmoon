<script setup lang="ts">
import { RouterView } from 'vue-router'

import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <span>Frostmoon</span>
      <span>小說內容由 Markdown 章節建立</span>
    </footer>
  </div>
</template>

