<template>
  <div class="relative min-h-screen w-full flex flex-col" :class="isControlsReady ? 'controls-ready' : ''">
    <!-- ── Preloader Overlay ────────────────────────────────────── -->
    <GridPreloader />

    <!-- Top shadow gradient on mobile for better header legibility -->
    <div class="md:hidden fixed top-0 left-0 right-0 h-[130px] bg-gradient-to-b from-black/75 to-transparent z-40 pointer-events-none"></div>

    <!-- ── Header ────────────────────────────────────────── -->
    <header class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-12 pt-8 transition-all duration-500 ease-out"
            :class="(isHeaderHidden || forceHideHeader) ? '!-translate-y-[150%] !opacity-0' : '!translate-y-0 !opacity-100'">
      <a 
        href="#" 
        @click.prevent="goTo('/')" 
        class="pointer-events-auto transition-transform duration-300 hover:scale-105 z-[100]"
      >
        <img src="/logo.webp" alt="blu stoodio" class="h-10 md:h-12 w-auto select-none drop-shadow-md brightness-0 invert" loading="lazy" />
      </a>
      <div class="hidden md:block pointer-events-none">
        <span class="text-xs tracking-[0.25em] uppercase font-semibold text-white" style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 3px 12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6);">
          {{ t.headerSubtitle }}
        </span>
      </div>
    </header>

    <!-- ── Page content ──────────────────────────────────── -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- ── Bottom Nav ────────────────────────────────────── -->
    <GlassNav />

    <!-- ── Language toggle — responsive placement ──────────── -->
    <button
      class="lang-toggle fixed bottom-8 md:bottom-10 right-8 md:right-12 z-[9999] flex items-center gap-3 cursor-pointer select-none hover:scale-105 h-[40px] px-6 rounded-full border border-white/10 bg-black/95 hover:bg-black/100 hover:border-white/20 shadow-2xl"
      :class="(isHeaderHidden || forceHideHeader) ? 'lang-toggle-hidden' : ''"
      @click="toggleLang"
      style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 3px 12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6);"
    >
      <span class="text-[11px] tracking-[0.25em] uppercase font-semibold text-white transition-all duration-300"
            :class="lang === 'it' ? 'underline underline-offset-[4px]' : ''">
        IT
      </span>
      <span class="text-[11px] tracking-[0.25em] uppercase font-semibold text-white">
        /
      </span>
      <span class="text-[11px] tracking-[0.25em] uppercase font-semibold text-white transition-all duration-300"
            :class="lang === 'en' ? 'underline underline-offset-[4px]' : ''">
        EN
      </span>
    </button>

    <div id="youtube-player-container" class="absolute w-[1px] h-[1px] opacity-0 pointer-events-none -z-50 overflow-hidden"></div>
    <PhysicsCursor />
    <MediaPlayer :isHidden="isHeaderHidden || forceHideHeader" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GridPreloader from './components/GridPreloader.vue'
import GlassNav from './components/GlassNav.vue'
import PhysicsCursor from './components/PhysicsCursor.vue'
import MediaPlayer from './components/MediaPlayer.vue'
import { useLang } from './composables/useLang.js'
import { useRouter } from 'vue-router'

const { lang, t, toggleLang } = useLang()
const router = useRouter()

const goTo = (path) => {
  if (router.currentRoute.value.path === path) return
  router.push(path)
}

const isHeaderHidden = ref(false)
const forceHideHeader = ref(false)
const isControlsReady = ref(false)

onMounted(() => {
  setTimeout(() => {
    isControlsReady.value = true
  }, 1800)

  window.addEventListener('modal-open', () => forceHideHeader.value = true)
  window.addEventListener('modal-close', () => forceHideHeader.value = false)
})

onBeforeUnmount(() => {
  window.removeEventListener('modal-open', () => forceHideHeader.value = true)
  window.removeEventListener('modal-close', () => forceHideHeader.value = false)
})
</script>

<style>
/* ── Global Entrance Animations triggered by Preloader ── */

body:not(.is-loaded) header {
  opacity: 0;
  transform: translateY(-20px);
}
body.is-loaded header {
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, 
              transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
  opacity: 1;
  transform: translateY(0);
}

body:not(.is-loaded) nav {
  opacity: 0;
  transform: translate(-50%, 20px) !important;
}
body.is-loaded nav {
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s, 
              transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
  opacity: 1;
  transform: translate(-50%, 0) !important;
}

body:not(.is-loaded) .lang-toggle {
  opacity: 0;
  transform: translateY(20px);
}
body.is-loaded .lang-toggle {
  transition: opacity 1s ease 0.8s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
  opacity: 1;
  transform: translateY(0);
}
.controls-ready .lang-toggle {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              border-color 0.3s ease;
}
.controls-ready .lang-toggle.lang-toggle-hidden {
  opacity: 0;
  transform: translateY(100px) !important;
  pointer-events: none;
}
</style>
