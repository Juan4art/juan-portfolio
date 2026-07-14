<template>
  <div class="w-full bg-transparent font-archivo text-white flex flex-col items-center pb-40 relative">
    
    <!-- Intro: The Poem Concept -->
    <div class="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center mt-20 mb-32">
      <h3 class="text-[#e4ef39] font-mono text-sm tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
        <span class="w-12 h-px bg-[#e4ef39]"></span>
        {{ t.poemTitle }}
        <span class="w-12 h-px bg-[#e4ef39]"></span>
      </h3>
      <blockquote class="font-varela text-xl md:text-2xl leading-relaxed text-white/80 italic max-w-2xl border-l-2 border-white/20 pl-6 py-2 text-left">
        {{ t.poemQuote }}
      </blockquote>
      
      <!-- Vertical connecting line -->
      <div class="w-px h-24 bg-gradient-to-b from-white/40 to-transparent mt-16"></div>
    </div>

    <!-- The 3 Derivations (Subprojects) -->
    <div class="relative w-full max-w-7xl px-6 md:px-12 flex flex-col gap-32 md:gap-48 z-10">
      <div 
        v-for="(item, idx) in macroProject.subProjects" 
        :key="idx"
        class="flex flex-col md:flex-row items-center gap-12 md:gap-24"
        :class="idx % 2 !== 0 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Image Side -->
        <div class="w-full md:w-1/2 group relative cursor-pointer" @click="openGallery(item)">
          <div 
            class="w-full aspect-[4/5] border border-white/10 overflow-hidden relative shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            :class="item.previewBg || 'bg-[#111]'"
          >
            <template v-if="item.cover.endsWith('.mp4') || item.cover.endsWith('.webm') || item.cover.endsWith('.wbm')">
              <video :src="item.cover" class="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-1000" autoplay loop muted playsinline disablePictureInPicture></video>
            </template>
            <template v-else>
              <img :src="item.cover" :alt="item.title" class="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-1000" />
            </template>
            
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
              <span class="text-[#e4ef39] border border-[#e4ef39] px-6 py-3 uppercase tracking-widest font-mono text-sm">
                {{ t.viewGallery }}
              </span>
            </div>
          </div>
          
          <!-- Connecting structural elements -->
          <div class="absolute top-1/2 -left-12 md:-left-24 w-12 md:w-24 h-px bg-white/20 hidden md:block" v-if="idx % 2 === 0"></div>
          <div class="absolute top-1/2 -right-12 md:-right-24 w-12 md:w-24 h-px bg-white/20 hidden md:block" v-if="idx % 2 !== 0"></div>
        </div>

        <!-- Text Side -->
        <div class="w-full md:w-1/2 flex flex-col justify-center">
          <span class="text-white/40 font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
            0{{ idx + 1 }} // {{ item.tag }}
          </span>
          <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
            {{ item.title }}
          </h2>
          <p class="text-white/70 font-varela text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            {{ item.desc }}
          </p>
          
          <div>
            <button @click="openGallery(item)" class="text-[#e4ef39] hover:text-white transition-colors uppercase font-mono text-sm tracking-widest flex items-center gap-4 group">
              <span class="w-8 h-px bg-[#e4ef39] group-hover:bg-white transition-colors"></span>
              {{ t.exploreProject }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Gallery Modal -->
    <transition name="fade">
      <div 
        v-if="isModalOpen && activeItem" 
        class="fixed inset-0 z-[99999] bg-[#050505]/95 flex flex-col overflow-y-auto backdrop-blur-md custom-scrollbar"
        @click.self="closeGallery"
      >
        <div class="w-full max-w-7xl mx-auto p-6 md:p-12 flex flex-col min-h-screen" @click.self="closeGallery">
          <!-- Header -->
          <div class="flex justify-between items-start md:items-center mb-8 shrink-0" @click.self="closeGallery">
            <div>
              <span class="text-[#e4ef39] font-mono text-sm tracking-[0.2em] uppercase block mb-2">{{ activeItem.tag }}</span>
              <h2 class="text-white font-archivo text-3xl md:text-5xl uppercase tracking-tighter">{{ activeItem.title }}</h2>
            </div>
            <button @click="closeGallery" class="text-white/60 hover:text-white transition-transform duration-300 hover:rotate-90">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Extended Concept Description -->
          <div class="mb-12 max-w-4xl text-white/80 font-varela text-base md:text-lg leading-relaxed whitespace-pre-wrap" @click.self="closeGallery">
            {{ activeItem.extendedDesc || activeItem.desc }}
          </div>

          <!-- Gallery Grid -->
          <div :class="['pb-20 items-start w-full', isGridStyle ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8' : 'grid grid-cols-1 gap-8 md:gap-12']" @click.self="closeGallery">
            <div 
              v-for="(img, idx) in activeItem.gallery" 
              :key="idx" 
              class="w-full bg-[#111] border border-white/10"
            >
              <template v-if="img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.wbm')">
                <video :src="img" :class="['w-full h-auto object-contain', isGridStyle ? 'p-4' : '']" autoplay loop muted playsinline disablePictureInPicture></video>
              </template>
              <template v-else>
                <img :src="img" :alt="activeItem?.title || 'Publishing Image'" :class="['w-full h-auto object-contain', isGridStyle ? 'p-4' : '']" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang.js'

const { t } = useLang()

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

// The macro project is the only item in this category
const macroProject = computed(() => {
  return props.category.items[0] || { subProjects: [] }
})

const isModalOpen = ref(false)
const activeItem = ref(null)

const isGridStyle = computed(() => {
  if (!activeItem.value) return false
  const title = activeItem.value.title.toLowerCase()
  return title.includes('nevia') || title.includes('faro')
})

const openGallery = (item) => {
  activeItem.value = item
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  isModalOpen.value = false
  setTimeout(() => {
    activeItem.value = null
  }, 300)
  document.body.style.overflow = ''
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
