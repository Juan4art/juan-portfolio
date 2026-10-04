<template>
  <div class="fixed inset-0 z-[999999] bg-[#030303]/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto force-cursor" 
       @click.self="$emit('close')"
       @wheel.prevent="handleScroll">
    
    <!-- Top Bar -->
    <div class="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[1000] pointer-events-none">
      <div class="flex flex-col gap-1 max-w-xl pointer-events-none text-white mix-blend-difference">
        <h3 class="font-archivo text-lg md:text-xl uppercase tracking-widest">{{ magazine.title }}</h3>
        <p v-if="magazine.desc" class="opacity-50 font-mono text-xs md:text-sm line-clamp-2 md:line-clamp-none mt-1">{{ magazine.desc }}</p>
      </div>
      
      <button @click="$emit('close')" 
              class="pointer-events-auto text-white/50 hover:text-white uppercase font-mono text-xs tracking-[0.2em] transition-colors focus:outline-none flex items-center gap-2 mix-blend-difference">
        <span>Close</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Flipbook Container -->
    <div class="relative w-full max-w-[95vw] md:max-w-[90vw] h-[80vh] flex justify-center items-center pointer-events-none mt-24 md:mt-16" @click.self="$emit('close')">
      
      <div v-if="pages.length === 0" class="text-white/50 font-mono text-sm tracking-widest uppercase">
        No pages available yet.
      </div>
      
      <div v-else 
           class="flipbook-wrapper relative pointer-events-auto shadow-2xl"
           ref="flipbookWrapperEl">
           
        <div id="flipbook" class="flipbook" ref="flipbookEl">
          <div class="page" v-for="(page, idx) in pages" :key="idx">
            <div class="page-content bg-white w-full h-full">
              <img :src="page" class="w-full h-full object-cover pointer-events-none" :alt="`Page ${idx + 1}`" />
            </div>
          </div>
        </div>
      </div>
      

    </div>

    <!-- Controls -->
    <div v-if="pages.length > 0" class="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 z-[1000]">
      <button @click="flipPrev" class="text-white/50 hover:text-white transition-colors" :class="{ 'opacity-20 cursor-not-allowed': isFirstPage }">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <span class="text-white/80 font-mono text-xs tracking-widest">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="flipNext" class="text-white/50 hover:text-white transition-colors" :class="{ 'opacity-20 cursor-not-allowed': isLastPage }">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { PageFlip } from 'page-flip'

const props = defineProps({
  magazine: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const flipbookWrapperEl = ref(null)
const flipbookEl = ref(null)
const pageFlip = ref(null)

const pages = computed(() => {
  // If gallery has items, use them, otherwise use cover if available
  if (props.magazine.gallery && props.magazine.gallery.length > 0) {
    return props.magazine.gallery
  } else if (props.magazine.cover) {
    return [props.magazine.cover]
  }
  return []
})

const currentPage = ref(0)
const totalPages = computed(() => pages.value.length)
const isFirstPage = computed(() => currentPage.value === 0)
const isLastPage = computed(() => currentPage.value >= totalPages.value - 1)

onMounted(() => {
  if (pages.value.length > 0 && flipbookEl.value) {
    // Need a slight delay to ensure DOM is fully rendered for dimensions
    setTimeout(() => {
      initFlipbook()
    }, 100)
  }
})

onBeforeUnmount(() => {
  if (pageFlip.value) {
    pageFlip.value.destroy()
  }
})

const initFlipbook = () => {
  // Determine aspect ratio for pages based on the actual PDF size we found (581x722)
  const width = 581
  const height = 722

  pageFlip.value = new PageFlip(flipbookEl.value, {
    width: width,
    height: height,
    size: 'stretch',
    minWidth: 300,
    maxWidth: 700,
    minHeight: 372, // Proportional to 581:722
    maxHeight: 870, // Proportional to 581:722 (700 * 722/581 = ~870)
    drawShadow: true,
    showCover: props.magazine.showCover !== false,
    usePortrait: true, // Use single page portrait mode on mobile
    startPage: 0,
    maxShadowOpacity: 0.5,
    flippingTime: 800,
  })

  // Load pages from DOM elements
  const pageElements = document.querySelectorAll('.page')
  pageFlip.value.loadFromHTML(pageElements)

  pageFlip.value.on('flip', (e) => {
    currentPage.value = e.data
  })
}

const flipNext = () => {
  if (pageFlip.value) pageFlip.value.flipNext()
}

const flipPrev = () => {
  if (pageFlip.value) pageFlip.value.flipPrev()
}

// ── Scroll Handling ──
let isFlipping = false
let flipTimeout = null

const handleScroll = (e) => {
  if (isFlipping) return
  
  // Threshold for trackpads
  if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return
  
  if (e.deltaY > 0 && !isLastPage.value) {
    flipNext()
    throttleScroll()
  } else if (e.deltaY < 0 && !isFirstPage.value) {
    flipPrev()
    throttleScroll()
  }
}

const throttleScroll = () => {
  isFlipping = true
  if (flipTimeout) clearTimeout(flipTimeout)
  flipTimeout = setTimeout(() => {
    isFlipping = false
  }, 1000) // 1 second cooldown (matches flippingTime roughly + buffer)
}
</script>

<style scoped>
.flipbook-wrapper {
  /* Provide bounds for the flipbook */
  width: 100%;
  max-width: 1600px; /* Two pages max width */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  background-color: #fff;
  border: solid 1px hsl(35, 20%, 70%);
  overflow: hidden;
}

.page.--left {
  border-right: 0;
  box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

.page.--right {
  border-left: 0;
  box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

/* Force cursor visibility in this overlay, overriding global hidden cursors */
:global(.force-cursor), :global(.force-cursor *) {
  cursor: auto !important;
}
</style>
