<template>
  <div class="photo-strip-container" ref="container">
    <div 
      class="photo-strip" 
      ref="strip"
      :class="{ 'grabbing': isDown }"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @wheel="onWheel"
    >
      <div class="photo-strip-inner">
        <!-- Desktop: 2 rows -->
        <div class="photo-row hidden md:flex">
          <div 
            v-for="(img, idx) in row1Images" 
            :key="'r1'+idx" 
            class="photo-strip-item"
            :data-caption="`${img.tag} · ${img.title}`"
            @click="$emit('open-detail', { project: img.project, initialSlide: img.imageIndex })"
          >
            <img :src="img.src" :alt="img.title" draggable="false" />
          </div>
        </div>
        
        <!-- Desktop: 2 rows -->
        <div class="photo-row hidden md:flex">
          <div 
            v-for="(img, idx) in row2Images" 
            :key="'r2'+idx" 
            class="photo-strip-item"
            :data-caption="`${img.tag} · ${img.title}`"
            @click="$emit('open-detail', { project: img.project, initialSlide: img.imageIndex })"
          >
            <img :src="img.src" :alt="img.title" draggable="false" />
          </div>
        </div>

        <!-- Mobile: 1 vertical column -->
        <div class="photo-col flex md:hidden flex-col w-full h-auto pb-24 gap-4">
          <div 
            v-for="(img, idx) in flatImages" 
            :key="'m'+idx" 
            class="photo-strip-item-mobile relative w-full h-auto cursor-pointer"
            @click="$emit('open-detail', { project: img.project, initialSlide: img.imageIndex })"
          >
            <img :src="img.src" :alt="img.title" class="w-full h-auto block object-cover filter contrast-110" />
            <!-- Mobile Caption -->
            <div class="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-black/90 to-transparent text-center pointer-events-none">
              <span class="font-poppins text-[10px] tracking-widest text-white/90 uppercase font-medium">{{ img.tag }} · {{ img.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="photo-counter font-poppins text-white/40 tracking-widest absolute bottom-8 right-10 text-[11px] pointer-events-none z-20">
      {{ String(currentIndex).padStart(2, '0') }} / {{ String(totalImages).padStart(2, '0') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['open-detail'])

// Flatten all images
const flatImages = computed(() => {
  const images = []
  if (props.category && props.category.items) {
    const items = props.category.items
    items.forEach(item => {
      if (item.gallery) {
        item.gallery.forEach((src, index) => {
          images.push({
            src: src,
            title: item.title,
            tag: item.tag,
            project: item,
            imageIndex: index
          })
        })
      }
    })
  }
  
  // Apply explicit order for the first images (Grid start with mixed Ranch)
  const explicitSrcs = [
    '/images/Snickers19.webp',     // 0: Top 1 (snickers now first)
    '/images/Concert3.webp',       // 1: Bottom 1
    '/images/Concert4.webp',       // 2: Top 2
    '/images/DiscoRanch_8.webp',   // 3: Bottom 2 (swapped with Portrait1)
    '/images/Concert2.webp',       // 4: Top 3
    '/images/Moto1.webp',          // 5: Bottom 3
    '/images/DiscoRanch_New.webp', // 6: Top 4 (cowboy moved here)
    '/images/DiscoRanch_15.webp',  // 7: Bottom 4 (RANCH)
    '/images/Moto2.webp',          // 8: Top 5
    '/images/Snickers3.webp'       // 9: Bottom 5
  ]

  const explicitImages = []
  
  // We extract them from the images array to prevent duplicates
  explicitSrcs.forEach(src => {
    // If Portrait1 is not found, it might be Portrait2, but let's try exactly the src
    let idx = images.findIndex(img => img.src === src)
    if (idx === -1 && src === '/images/Portrait1.webp') {
      // Fallback to Portrait2 if Portrait1 is missing or not the right one
      idx = images.findIndex(img => img.src === '/images/Portrait2.webp')
    }
    
    if (idx > -1) {
      explicitImages.push(images.splice(idx, 1)[0])
    }
  })

  // Prepend the explicitly ordered images to the rest
  return [...explicitImages, ...images]
})

// Split images into two rows to create a tight 2-row horizontal grid
const row1Images = computed(() => flatImages.value.filter((_, i) => i % 2 === 0))
const row2Images = computed(() => flatImages.value.filter((_, i) => i % 2 !== 0))

const totalImages = computed(() => flatImages.value.length)
const currentIndex = ref(1)

// Drag to scroll logic
const strip = ref(null)
const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const hasDragged = ref(false)

const onMouseDown = (e) => {
  isDown.value = true
  hasDragged.value = false
  startX.value = e.pageX - strip.value.offsetLeft
  scrollLeft.value = strip.value.scrollLeft
}

const onMouseLeave = () => {
  isDown.value = false
}

const onMouseUp = () => {
  isDown.value = false
}

const onMouseMove = (e) => {
  if (!isDown.value) return
  e.preventDefault()
  const x = e.pageX - strip.value.offsetLeft
  if (window.innerWidth < 768) return
  const walk = (x - startX.value) * 1.4 // Scroll-fast
  if (Math.abs(walk) > 5) hasDragged.value = true
  strip.value.scrollLeft = scrollLeft.value - walk
}

let touchStartX = 0
let touchScrollLeft = 0

const onTouchStart = (e) => {
  hasDragged.value = false
  touchStartX = e.touches[0].pageX
  touchScrollLeft = strip.value.scrollLeft
}

const onTouchMove = (e) => {
  if (window.innerWidth < 768) return // Native vertical scroll on mobile
  const dx = touchStartX - e.touches[0].pageX
  if (Math.abs(dx) > 5) hasDragged.value = true
  strip.value.scrollLeft = touchScrollLeft + dx
}

const onTouchEnd = (e) => {}

const onWheel = (e) => {
  if (strip.value && window.innerWidth >= 768) {
    e.preventDefault()
    strip.value.scrollLeft += e.deltaY + e.deltaX
  }
}

const updateCounter = () => {
  if (!strip.value || totalImages.value === 0) return
  
  if (window.innerWidth < 768) {
    const totalScroll = strip.value.scrollHeight - strip.value.clientHeight
    if (totalScroll <= 0) return
    const scrollRatio = strip.value.scrollTop / totalScroll
    const idx = Math.floor(scrollRatio * (totalImages.value - 1))
    currentIndex.value = Math.min(Math.max(idx + 1, 1), totalImages.value)
  } else {
    const totalScroll = strip.value.scrollWidth - strip.value.clientWidth
    if (totalScroll <= 0) return
    const scrollRatio = strip.value.scrollLeft / totalScroll
    const idx = Math.floor(scrollRatio * (totalImages.value - 1))
    currentIndex.value = Math.min(Math.max(idx + 1, 1), totalImages.value)
  }
}

onMounted(() => {
  if (strip.value) {
    strip.value.addEventListener('scroll', updateCounter, { passive: true })
    setTimeout(updateCounter, 100)
  }
})

onUnmounted(() => {
  if (strip.value) {
    strip.value.removeEventListener('scroll', updateCounter)
  }
})
</script>

<style scoped>
.photo-strip-container {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #050505;
  z-index: 10;
  overflow: hidden;
}

.photo-strip {
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
}

.photo-strip-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: max-content;
  min-width: 100%;
}

.photo-row {
  height: 50vh;
  gap: 0;
}

.photo-strip::-webkit-scrollbar { 
  display: none; 
}

.photo-strip.grabbing { 
  cursor: grabbing; 
}

.photo-strip-item {
  height: 100%;
  width: auto;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: #000;
  cursor: pointer;
}

.photo-strip-item:last-child {
  flex-grow: 1;
}

.photo-strip-item img {
  height: 100%;
  width: auto;
  min-width: 100%;
  display: block;
  object-fit: cover;
  pointer-events: none;
  transition: filter 0.5s ease, transform 0.5s ease;
}

.photo-strip-item:hover img {
  filter: brightness(0.82);
  transform: scale(1.02);
}

/* caption: bottom-center on hover */
.photo-strip-item::after {
  content: attr(data-caption);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  white-space: nowrap;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
  opacity: 0;
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
  padding: 40px 12px 16px;
  transform: translateY(10px);
}

.photo-strip-item:hover::after {
  opacity: 1;
  transform: translateY(0);
}

:global(body .on-off) {
  background-color: #050505;
}

@media (max-width: 768px) {
  .photo-strip {
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 80px; /* Space for the navbar */
    touch-action: pan-y;
  }
  .photo-strip-inner {
    width: 100%;
    min-width: 100%;
  }
  .photo-counter {
    bottom: 24px;
    right: 24px;
    background: rgba(0,0,0,0.5);
    padding: 4px 12px;
    border-radius: 12px;
    backdrop-filter: blur(4px);
  }
}
</style>
