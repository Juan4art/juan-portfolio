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
      <div 
        v-for="(img, idx) in flatImages" 
        :key="idx" 
        class="photo-strip-item"
        :data-caption="`${String(idx + 1).padStart(2, '0')} — ${img.tag} · ${img.title}`"
      >
        <img :src="img.src" :alt="img.title" draggable="false" />
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

// Flatten images from category items (grouped by item)
const flatImages = computed(() => {
  const images = []
  if (props.category && props.category.items) {
    const items = props.category.items
    
    items.forEach(item => {
      if (item.gallery) {
        item.gallery.forEach(src => {
          images.push({
            src: src,
            title: item.title,
            tag: item.tag
          })
        })
      }
    })
  }
  return images
})

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
  const walk = (x - startX.value) * 1.4 // Scroll-fast
  if (Math.abs(walk) > 5) hasDragged.value = true
  strip.value.scrollLeft = scrollLeft.value - walk
}

// Touch events for mobile dragging
let touchStartX = 0
let touchScrollLeft = 0

const onTouchStart = (e) => {
  hasDragged.value = false
  touchStartX = e.touches[0].pageX
  touchScrollLeft = strip.value.scrollLeft
  e.stopPropagation()
}

const onTouchMove = (e) => {
  const dx = touchStartX - e.touches[0].pageX
  if (Math.abs(dx) > 5) hasDragged.value = true
  strip.value.scrollLeft = touchScrollLeft + dx
  e.stopPropagation()
}

const onTouchEnd = (e) => {
  e.stopPropagation()
}

// Horizontal scroll on wheel
const onWheel = (e) => {
  // Prevent default vertical scrolling if scrolling horizontally on the strip
  if (strip.value) {
    e.preventDefault()
    strip.value.scrollLeft += e.deltaY + e.deltaX
  }
}

// Update Counter on scroll
const updateCounter = () => {
  if (!strip.value || totalImages.value === 0) return
  const itemWidth = strip.value.firstElementChild ? strip.value.firstElementChild.offsetWidth : 0
  if (!itemWidth) return
  const idx = Math.round(strip.value.scrollLeft / itemWidth)
  const n = Math.min(idx + 1, totalImages.value)
  currentIndex.value = n
}

onMounted(() => {
  if (strip.value) {
    strip.value.addEventListener('scroll', updateCounter, { passive: true })
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
  z-index: 10; /* Base layer */
  overflow: hidden;
}

.photo-strip {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
}

.photo-strip::-webkit-scrollbar { 
  display: none; 
}

.photo-strip.grabbing { 
  cursor: grabbing; 
}

.photo-strip-item {
  flex-shrink: 0;
  height: 100vh;
  width: auto;
  position: relative;
  overflow: hidden;
  background: #000;
  border: none;
  box-shadow: none;
  border-radius: 0;
}

.photo-strip-item img {
  height: 100%;
  width: auto;
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

/* We want the container itself to appear over the typical black bg */
:global(body .on-off) {
  background-color: #050505;
}
</style>
