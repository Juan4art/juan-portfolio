import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

import HomeView     from './components/pages/HomeView.vue'
import AboutView    from './components/pages/AboutView.vue'
import CategoryView from './components/pages/CategoryView.vue'
import PlaylistView from './components/pages/PlaylistView.vue'

import Particles from "@tsparticles/vue3"
import { loadFull } from "tsparticles"

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
    await loadFull(engine)
  }
})
app.mount('#app')
