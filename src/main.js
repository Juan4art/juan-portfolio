import { inject } from '@vercel/analytics'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

inject()
const HomeView     = () => import('./components/pages/HomeView.vue')
const AboutView    = () => import('./components/pages/AboutView.vue')
const CategoryView = () => import('./components/pages/CategoryView.vue')
const PlaylistView = () => import('./components/pages/PlaylistView.vue')

import Particles from "@tsparticles/vue3"
import { loadSlim } from "@tsparticles/slim"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                name: 'home',     component: HomeView     },
    { path: '/about',           name: 'about',    component: AboutView    },
    { path: '/playlist',        name: 'playlist', component: PlaylistView },
    { path: '/category/:slug',  name: 'category', component: CategoryView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

let isFirstLoad = true

router.beforeEach((to, from, next) => {
  if (isFirstLoad) {
    next()
    return
  }
  
  if (to.path !== from.path) {
    document.body.classList.remove('is-loaded')
    setTimeout(() => {
      next()
    }, 400)
  } else {
    next()
  }
})

router.afterEach(() => {
  if (isFirstLoad) {
    isFirstLoad = false
    return
  }
  setTimeout(() => {
    document.body.classList.add('is-loaded')
  }, 100)
})

const app = createApp(App)
app.use(router)
app.use(Particles, {
  init: async engine => {
    await loadSlim(engine)
  }
})
app.mount('#app')
