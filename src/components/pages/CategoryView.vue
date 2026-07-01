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
    <PhotoStripGallery v-else-if="slug === 'photography'" :category="cat" />

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

    <!-- ── Full-screen detail overlay ──────────────────────── -->
    <transition name="overlay-anim">
      <div
        v-if="activeItem"
        class="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-10 select-text"
        @click.self="closeDetail"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#050505]/95 animate-fade-in" @click="closeDetail" />

        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 transform scale-100"
             style="max-height: 90vh;">
          
          <!-- Close button -->
          <button @click="closeDetail" 
                  aria-label="Close detail"
                  class="absolute top-4 right-4 z-50 p-2 text-white/60 hover:text-white transition-colors focus:outline-none">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Header -->
          <div class="mb-4 pr-8">
            <h3 class="font-archivo text-3xl sm:text-4xl text-white font-bold leading-tight tracking-tight mb-2">{{ activeItem.title }}</h3>
          </div>

          <!-- Swiper Container -->
          <swiper
            v-if="activeItem.gallery"
            :modules="[SwiperNavigation, SwiperPagination]"
            :slides-per-view="1"
            :space-between="20"
            navigation
            pagination
            class="sleek-swiper w-full aspect-square bg-white/5 rounded-xl border border-white/5 mb-6 overflow-hidden"
          >
            <swiper-slide v-for="(img, idx) in activeItem.gallery" :key="idx">
              <template v-if="img.endsWith('.mp4')">
                <video :src="img" :title="activeItem.title" class="w-full h-full object-contain" autoplay loop muted playsinline disablePictureInPicture></video>
              </template>
              <template v-else>
                <img :src="img" :alt="activeItem.title" class="w-full h-full object-contain" />
              </template>
            </swiper-slide>
          </swiper>

          <!-- Description -->
          <div class="overflow-y-auto custom-scrollbar pr-2 max-h-40">
            <p class="text-white/80 font-varela text-base leading-relaxed">{{ activeItem.desc }}</p>
          </div>
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
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
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
    gallery: p.item.gallery || [getProjectImage(slug.value, p.index)]
  }
}

const openCustomDetail = (itemData) => {
  activeItem.value = {
    title: itemData.title,
    tag: itemData.tag,
    desc: itemData.desc,
    gallery: itemData.gallery
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

/* Sleek Glassmorphic Swiper Styling */
:deep(.sleek-swiper .swiper-button-next),
:deep(.sleek-swiper .swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

:deep(.sleek-swiper .swiper-button-next:hover),
:deep(.sleek-swiper .swiper-button-prev:hover) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

:deep(.sleek-swiper .swiper-button-next::after),
:deep(.sleek-swiper .swiper-button-prev::after) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.sleek-swiper .swiper-pagination-bullet) {
  background: white;
  opacity: 0.3;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.sleek-swiper .swiper-pagination-bullet-active) {
  opacity: 1;
  background: white;
  transform: scale(1.3);
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
