import { createRouter, createWebHistory } from 'vue-router'

import ChaptersView from '@/views/ChaptersView.vue'
import HomeView from '@/views/HomeView.vue'
import NovelView from '@/views/NovelView.vue'
import ReaderView from '@/views/ReaderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/novel', name: 'novel', component: NovelView },
    { path: '/chapters', name: 'chapters', component: ChaptersView },
    { path: '/read/:slug', name: 'reader', component: ReaderView },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router

