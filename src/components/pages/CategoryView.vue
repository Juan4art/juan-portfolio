<template>
  <div class="relative w-full h-screen bg-[#0a0a0a] overflow-x-hidden overflow-y-auto flex flex-col" 
       :class="(slug === 'photography' || slug === 'creative-direction' || slug === 'publishings') ? '' : 'pt-24 md:pt-32 px-8 md:px-12'" 
       ref="scrollContainer">
    
    <!-- ── Header ──────────────────────── -->
    <div class="flex flex-col pointer-events-none animate-fade-in" 
         v-if="slug !== 'photography' && slug !== 'creative-direction' && slug !== 'publishings'"
         :class="slug === 'branding' ? 'relative md:absolute md:top-32 md:left-12 z-0 mb-8 md:mb-0' : 'md:flex-row md:items-end md:gap-8 mb-20'">
      <!-- Massive Background text effect like the reference -->
      <h1 class="font-archivo text-6xl md:text-[6rem] lg:text-[8rem] text-white uppercase tracking-tighter leading-none drop-shadow-lg flex flex-col items-start gap-2">
        <span v-for="(word, i) in cat.title.split(' ')" :key="i" class="hover-stamp leading-[0.85]">{{ word }}</span>
      </h1>
      <p 
        class="text-white/60 font-varela text-sm md:text-base max-w-xl leading-relaxed mt-4 drop-shadow-md"
        :class="slug !== 'branding' ? 'md:mt-0 md:mb-4' : ''"
        v-html="cat.description"
      ></p>
    </div>

    <!-- ── Branding Horizontal Gallery ──────────────────────── -->
    <HorizontalRectGallery v-if="slug === 'branding'" :category="cat" class="w-full z-10" />

    <!-- ── Freestyle Image Trail Gallery ──────────────────────── -->
    <FreestyleMarqueeGallery v-else-if="slug === 'creative-direction'" :category="cat" @open-detail="openCustomDetail" />

    <!-- ── Photography Swipe Gallery ──────────────────────── -->
    <PhotoStripGallery v-else-if="slug === 'photography'" :category="cat" @open-detail="openCustomDetail" />

    <!-- ── Poem Narrative View ──────────────────────── -->
    <PoemNarrativeView v-else-if="slug === 'publishings'" :category="cat" />


    <!-- ── Dynamic Vertical Project Gallery (Strict Brutalist Grid) ────────── -->
    <div v-else
      class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-40 items-stretch"
    >
      <div 
        v-for="(panel, idx) in panels" 
        :key="idx"
        class="relative cursor-pointer z-10 hover:z-30 group flex flex-col card-spread"
        :style="{ animationDelay: `${idx * 0.1}s` }"
        @click="openDetail(idx)"
      >
        <div 
          class="flex flex-col flex-1 border-4 border-black w-full relative transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:shadow-[12px_16px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          :class="getPunkStyle(idx).bg"
        >
          <!-- Dynamic Glare Overlay -->
          <div class="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>

          <!-- Full Card Scratched Texture -->
          <div class="absolute inset-0 bg-dusty-scratch opacity-10 pointer-events-none z-10"></div>

          <!-- Image Container -->
          <div class="w-full border-b-4 border-black overflow-hidden relative z-0 aspect-[4/5] md:aspect-[3/4] bg-black/5 p-4 flex items-center justify-center">
            <img 
              :src="getProjectImage(slug, idx)" 
              alt="Project thumbnail"
              class="w-full h-full object-contain filter contrast-110 transition-all duration-700 group-hover:scale-105" 
              style="will-change: filter, transform;"
            />
          </div>
          
          <div class="p-5 md:p-6 flex flex-col flex-1 justify-between">
            <div>
              <!-- Title (Label Maker Style) -->
              <h2 class="font-archivo text-2xl md:text-4xl text-white uppercase tracking-tighter leading-none mb-4 inline-block bg-black px-3 py-1 -ml-3 transform -skew-x-6">
                {{ panel.item.title }}
              </h2>
              <!-- Description -->
              <p class="font-mono text-xs md:text-sm leading-relaxed line-clamp-3 mb-4" :class="getPunkStyle(idx).textColor">
                {{ panel.item.desc }}
              </p>
            </div>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="border-2 border-black px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-transparent" :class="getPunkStyle(idx).textColor">
                {{ panel.item.tag }}
              </span>
              <span class="border-2 border-black px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black text-white">
                {{ cat.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right padding -->
      <div class="shrink-0 w-8 md:w-32"></div>
    </div>

    <!-- ── Full-screen detail overlay (Modern Style) ──────────────────────── -->
    <transition name="overlay-anim">
      <div
        v-if="activeItem"
        class="fixed inset-0 z-[9998] flex items-center justify-center select-text bg-[#030303]"
      >
        <!-- Minimal Full-Screen Modal Content -->
        <div class="relative w-full h-full flex flex-col pointer-events-none">
          
          <!-- Top Bar -->
          <div class="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[9999] pointer-events-none mix-blend-difference">
            <div class="flex flex-col gap-1 max-w-xl pointer-events-none text-white">
              <h3 class="font-archivo text-lg md:text-xl uppercase tracking-widest">{{ activeItem.title }}</h3>
              <p v-if="activeItem.desc" class="opacity-50 font-mono text-xs md:text-sm line-clamp-2 md:line-clamp-none mt-1">{{ activeItem.desc }}</p>
            </div>
            
            <!-- Close button -->
            <button @click="closeDetail" 
                    class="pointer-events-auto text-white/50 hover:text-white uppercase font-mono text-xs tracking-[0.2em] transition-colors focus:outline-none flex items-center gap-2">
              <span>Close</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Swiper Container -->
          <swiper
            v-if="activeItem.gallery"
            :modules="[SwiperPagination, SwiperKeyboard, SwiperMousewheel]"
            :slides-per-view="1"
            :space-between="0"
            :initial-slide="activeItem.initialSlide || 0"
            :loop="true"
            :keyboard="{ enabled: true }"
            :mousewheel="true"
            :grab-cursor="true"
            pagination
            class="sleek-swiper-fullscreen w-full h-full pointer-events-auto"
          >
            <swiper-slide v-for="(img, idx) in activeItem.gallery" :key="idx" class="w-full h-full cursor-auto" @click.self="closeDetail">
              <div class="w-full h-full flex items-center justify-center p-8 md:p-24 pointer-events-none" @click.self="closeDetail">
                <template v-if="img.endsWith('.mp4')">
                  <video :src="img" :title="activeItem.title" class="max-w-full max-h-full object-contain pointer-events-auto cursor-default" autoplay loop muted playsinline disablePictureInPicture @click.stop></video>
                </template>
                <template v-else>
                  <img :src="img" :alt="activeItem.title" class="max-w-full max-h-full object-contain pointer-events-auto cursor-default" @click.stop />
                </template>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLang } from '../../composables/useLang.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Keyboard as SwiperKeyboard, Mousewheel as SwiperMousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import HorizontalRectGallery from '../HorizontalRectGallery.vue'
import PhotoStripGallery from '../PhotoStripGallery.vue'
import FreestyleMarqueeGallery from '../FreestyleMarqueeGallery.vue'
import PoemNarrativeView from '../PoemNarrativeView.vue'

const route = useRoute()
const router = useRouter()
const { t } = useLang()

const slug = computed(() => route.params.slug)

const cat = computed(() => {
  const data = t.value.categories?.[slug.value]
  if (!data) return { title: slug.value, description: '', items: [] }
  return data
})

// ── Large Themed Unsplash Images ────────────────────────────────
const projectImages = {
  'creative-direction': [
    '/images/Jazz1.webp',
    '/images/Solene1.webp',
    '/images/GD_brutalista1.webp'
  ],
  'photography': [
    '/images/Concert4.webp',
    '/images/Moto1.webp',
    '/images/Snickers19.webp'
  ],
  'branding': [
    '/images/GD_entropia1.webp',
    '/images/GiorniScalzi1.webp',
    '/images/Matera1.webp'
  ],
  'publishings': [
    '/images/GD_aeternum.webp',
    '/images/GD_commedia1.webp',
    '/images/Macchine1.webp'
  ]
}

const getProjectImage = (slugVal, indexVal) => {
  const images = projectImages[slugVal] || projectImages['branding']
  return images[indexVal % images.length]
}

// ── Grungy Punk Dynamic Styling ─────────────────────────────────
const getPunkStyle = (idx) => {
  const styles = [
    { bg: 'bg-[#fbff00]', textColor: 'text-black' },
    { bg: 'bg-[#ff00aa]', textColor: 'text-black' },
    { bg: 'bg-[#ffffff]', textColor: 'text-black' }
  ]
  return styles[idx % styles.length]
}

// ── Reactive Panels ────────────────────────────────────────────
const activeItem = ref(null)

const panels = computed(() => {
  let items = cat.value.items || []
  if (items.length > 0) {
    while (items.length < 6) items = [...items, ...items]
    items = items.slice(0, 6)
  }
  return items.map((item, i) => ({ index: i, item }))
})

// ── Overlay Modal ──────────────────────────────────────────────
const openDetail = (index) => {
  const p = panels.value[index]
  activeItem.value = {
    index: p.index,
    title: p.item.title,
    tag: p.item.tag,
    desc: p.item.desc,
    gallery: p.item.gallery || [getProjectImage(slug.value, p.index)],
    initialSlide: 0
  }
}

const openCustomDetail = (payload) => {
  const project = payload.project || payload
  const initialSlide = payload.initialSlide || 0
  
  activeItem.value = {
    title: project.title,
    tag: project.tag,
    desc: project.desc,
    gallery: project.gallery,
    initialSlide: initialSlide
  }
}

const closeDetail = () => {
  activeItem.value = null
}

watch(slug, () => { activeItem.value = null })
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Sleek Modern Swiper Styling for Fullscreen */
:deep(.sleek-swiper-fullscreen .swiper-pagination) {
  bottom: 24px !important;
}

:deep(.sleek-swiper-fullscreen .swiper-pagination-bullet) {
  background: white;
  opacity: 0.2;
  width: 32px;
  height: 2px;
  border-radius: 0;
  transition: all 0.3s ease;
}

:deep(.sleek-swiper-fullscreen .swiper-pagination-bullet-active) {
  opacity: 1;
  background: #FF6500;
  box-shadow: 0 0 8px rgba(255, 101, 0, 0.6);
}

.card-spread {
  opacity: 0;
  animation: spreadAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes spreadAnim {
  0% {
    opacity: 0;
    transform: translate(0, 150px) scale(0.3) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
}

/* ── Scrollbar Hiding ─────────────────────────────────────── */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* ── Overlay Transitions ─────────────────────────────────────── */
.overlay-anim-enter-active {
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.overlay-anim-enter-active .overlay-card {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.overlay-anim-leave-active {
  transition: opacity 0.22s ease;
}
.overlay-anim-leave-active .overlay-card {
  transition: transform 0.25s ease, opacity 0.2s ease;
}
.overlay-anim-enter-from {
  opacity: 0;
}
.overlay-anim-enter-from .overlay-card {
  opacity: 0;
  transform: scale(0.92) translateY(24px);
}
.overlay-anim-leave-to {
  opacity: 0;
}
.overlay-anim-leave-to .overlay-card {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}
</style>
