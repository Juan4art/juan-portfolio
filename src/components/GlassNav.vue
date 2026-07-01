<template>
  <div>
    <!-- Desktop Bottom Nav Bar (Hidden on Mobile) -->
    <nav v-if="!isMobile" 
         class="fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[999] select-none pointer-events-auto flex flex-col items-center gap-3" 
         @mouseleave="exploreOpen = false">
      
      <!-- Desktop Horizontal Scrolling Explore Menu -->
      <transition name="menu-slide">
        <div v-if="exploreOpen" class="w-fit max-w-[95vw] h-[48px] md:h-[40px] px-2 rounded-full border border-white/20 bg-black/95 shadow-2xl flex items-center overflow-x-auto hide-scrollbar pointer-events-auto">
          <div class="flex items-center gap-6 md:gap-10 min-w-max px-4 md:px-6 h-full">
            <a v-for="slug in categoryOrder" :key="slug" href="#" @click.prevent="goToCategory(slug)"
               class="text-[11px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold transition-all duration-300 block whitespace-nowrap h-full flex items-center text-white/60 hover:text-white hover:scale-105"
               :class="{ 'text-white': currentSlug === slug }">
              {{ t.categories[slug]?.title }}
            </a>
            <a href="#" @click.prevent="goTo('/playlist')"
               class="text-[11px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold transition-all duration-300 block whitespace-nowrap h-full flex items-center text-white/60 hover:text-white hover:scale-105"
               :class="{ 'text-white': isActive('/playlist') }">
              Playlist
            </a>
          </div>
        </div>
      </transition>
   
      <!-- Main Nav Pill -->
      <div class="h-[52px] md:h-[40px] w-[88vw] md:w-auto px-4 md:px-8 rounded-full border border-white/10 bg-black/95 hover:bg-black/100 hover:border-white/20 transition-all duration-300 flex items-center justify-around md:justify-start md:gap-8 shadow-2xl relative pointer-events-auto">
        <a href="#" @click.prevent="goTo('/')"
           class="relative h-full flex items-center text-[12px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] pl-[0.2em] md:pl-[0.25em] whitespace-nowrap uppercase font-semibold transition-all duration-300 cursor-pointer hover:scale-110"
           :class="isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'">
          {{ t.navHome }}
        </a>
        
        <a href="#" @click.prevent="exploreOpen = !exploreOpen"
           @mouseenter="exploreOpen = true"
           class="relative h-full flex items-center text-[12px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] pl-[0.2em] md:pl-[0.25em] whitespace-nowrap uppercase font-semibold transition-all duration-300 cursor-pointer hover:scale-110"
           :class="exploreOpen || isActive('/category') ? 'text-white' : 'text-white/70 hover:text-white'">
          {{ t.navExplore }}
        </a>
   
        <a href="#" @click.prevent="goTo('/about')"
           class="relative h-full flex items-center text-[12px] md:text-[11px] tracking-[0.2em] md:tracking-[0.25em] pl-[0.2em] md:pl-[0.25em] whitespace-nowrap uppercase font-semibold transition-all duration-300 cursor-pointer hover:scale-110"
           :class="isActive('/about') ? 'text-white' : 'text-white/70 hover:text-white'">
          {{ t.navAbout }}
        </a>
      </div>
    </nav>

    <!-- Mobile Floating Menu Button (Top Right, placed next to the lang-toggle) -->
    <button v-if="isMobile && !isHiddenByModal"
            @click="menuOpen = !menuOpen"
            aria-label="Toggle Menu"
            class="fixed top-8 right-8 z-[9999] flex flex-col justify-center items-center gap-[5px] w-[40px] h-[40px] rounded-full border border-white/10 bg-black/95 text-white shadow-2xl active:scale-90 transition-all pointer-events-auto">
      <span class="w-[18px] h-[2px] bg-white rounded-full"></span>
      <span class="w-[18px] h-[2px] bg-white rounded-full"></span>
    </button>

    <!-- Mobile Fullscreen Menu Overlay -->
    <transition name="fade">
      <div v-if="menuOpen && isMobile" 
           class="fixed inset-0 z-[9998] bg-black/80 flex flex-col justify-center px-10 pointer-events-auto select-none"
           style="backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
        
        <!-- Close Button inside overlay -->
        <button @click="menuOpen = false" 
                aria-label="Close Menu"
                class="absolute top-8 right-8 w-[40px] h-[40px] rounded-full border border-white/10 bg-white/5 text-white active:scale-90 flex items-center justify-center">
          <span class="text-[18px] font-light leading-none">✕</span>
        </button>

        <div class="flex flex-col gap-8 text-left">
          <!-- Main Links -->
          <div class="flex flex-col gap-5">
            <a href="#" @click.prevent="goToMobile('/')"
               class="text-[28px] tracking-[0.2em] uppercase font-black"
               :class="isActive('/') ? 'text-white' : 'text-white/50'">
              {{ t.navHome }}
            </a>
            
            <a href="#" @click.prevent="goToMobile('/about')"
               class="text-[28px] tracking-[0.2em] uppercase font-black"
               :class="isActive('/about') ? 'text-white' : 'text-white/50'">
              {{ t.navAbout }}
            </a>
            
            <a href="#" @click.prevent="goToMobile('/playlist')"
               class="text-[28px] tracking-[0.2em] uppercase font-black"
               :class="isActive('/playlist') ? 'text-white' : 'text-white/50'">
              Playlist
            </a>
          </div>

          <!-- Divider -->
          <div class="w-12 h-[2px] bg-white/20 my-2"></div>

          <!-- Categories Sublinks -->
          <div class="flex flex-col gap-4">
            <span class="text-white/30 text-[9px] tracking-[0.3em] uppercase font-mono mb-1">Portfolio</span>
            <a v-for="slug in categoryOrder" :key="slug" href="#" @click.prevent="goToCategoryMobile(slug)"
               class="text-[16px] tracking-[0.25em] uppercase font-bold transition-all"
               :class="currentSlug === slug ? 'text-white' : 'text-white/50'">
              {{ t.categories[slug]?.title }}
            </a>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLang } from '../composables/useLang.js'

const route = useRoute()
const router = useRouter()
const { t, lang } = useLang()

const exploreOpen = ref(false)
const menuOpen = ref(false)
const isMobile = ref(false)
const isHiddenByModal = ref(false)
const currentSlug = computed(() => route.params.slug)

// Ordered to match the keychain objects in HomeView (bottlecap → camera → lighter → magazine)
const categoryOrder = ['branding', 'photography', 'creative-direction', 'publishings']

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('modal-open', () => isHiddenByModal.value = true)
  window.addEventListener('modal-close', () => isHiddenByModal.value = false)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('modal-open', () => isHiddenByModal.value = true)
  window.removeEventListener('modal-close', () => isHiddenByModal.value = false)
})

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const goTo = (path) => {
  exploreOpen.value = false
  if (isActive(path)) return
  router.push(path)
}

const goToMobile = (path) => {
  menuOpen.value = false
  goTo(path)
}

const goToCategory = (slug) => {
  exploreOpen.value = false
  if (currentSlug.value === slug) return
  router.push(`/category/${slug}`)
}

const goToCategoryMobile = (slug) => {
  menuOpen.value = false
  goToCategory(slug)
}
</script>

<style scoped>
.menu-slide-enter-active, .menu-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-slide-enter-from, .menu-slide-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
