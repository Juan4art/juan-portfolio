<template>
  <div 
    class="freestyle-marquee-container relative w-full h-screen bg-[#050505] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    @wheel.prevent="onWheel"
    @mousedown="onDragStart"
    @mousemove="onDragMove"
    @mouseup="onDragEnd"
    @mouseleave="onDragEnd"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    
    <!-- Background Content / Hint (Fixed to viewport) -->
    <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
      <h1 class="font-archivo text-[15vw] md:text-[12vw] text-white/5 uppercase tracking-tighter leading-none select-none" aria-hidden="true">
        Freestyle
      </h1>
      <div class="mt-12 flex flex-col items-center gap-3">
        <p class="font-mono text-white/30 tracking-widest text-xs uppercase bg-black/40 px-6 py-2 rounded-none border border-white/10 backdrop-blur-md hidden md:block">
          Scroll to explore space
        </p>
        <p class="font-mono text-white/30 tracking-widest text-xs uppercase bg-black/40 px-6 py-2 rounded-none border border-white/10 backdrop-blur-md md:hidden">
          Drag to explore space
        </p>
      </div>
    </div>

    <!-- The Massive Canvas Space -->
    <div 
      class="canvas-space absolute top-0 left-0 flex flex-col justify-center"
      :style="{
        width: `${CANVAS_WIDTH}px`,
        height: `${CANVAS_HEIGHT}px`,
        transform: `translate3d(${panX}px, ${panY}px, 0)`,
        transition: isDragging ? 'none' : 'transform 0.1s linear'
      }"
    >
      <!-- Marquee Rows -->
      <div class="relative z-10 flex flex-col gap-12 md:gap-24 w-full">
        
        <!-- Row 1 -->
        <div class="marquee-row group" v-if="row1.length">
          <div class="marquee-content animate-marquee-left group-hover:pause-animation flex gap-8 md:gap-16">
            <div v-for="(item, idx) in [...row1, ...row1, ...row1, ...row1]" :key="`r1-${idx}`" class="marquee-item" @click.stop="!hasDragged && $emit('open-detail', item)">
              
              <!-- Project Card Inline -->
              <div class="relative p-2 md:p-3 bg-black border border-white/20 rounded-none shadow-2xl transition-all duration-300 hover:border-[#d1ff00] cursor-pointer flex flex-col gap-3 group/card w-[280px] md:w-[380px] h-full">
                <div class="w-full aspect-[4/5] overflow-hidden bg-[#0a0a0a] relative pointer-events-none rounded-none border border-white/5">
                  <template v-if="item.gallery[0].endsWith('.mp4')">
                    <video :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" autoplay loop muted playsinline disablePictureInPicture></video>
                  </template>
                  <template v-else>
                    <img :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" draggable="false" />
                  </template>
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-[#d1ff00] font-mono uppercase tracking-widest text-sm border border-[#d1ff00] px-6 py-2 bg-black/60 rounded-none">View</span>
                  </div>
                </div>
                <div class="flex items-center justify-between px-1">
                   <span class="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest font-bold truncate max-w-[70%]">{{ item.title }}</span>
                   <span class="text-[9px] md:text-[10px] font-mono bg-[#d1ff00] text-black px-2 py-1 whitespace-nowrap rounded-none">{{ item.tag }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <!-- Row 2 -->
        <div class="marquee-row group" v-if="row2.length">
          <div class="marquee-content animate-marquee-right group-hover:pause-animation flex gap-8 md:gap-16">
            <div v-for="(item, idx) in [...row2, ...row2, ...row2, ...row2]" :key="`r2-${idx}`" class="marquee-item" @click.stop="!hasDragged && $emit('open-detail', item)">
              
              <!-- Project Card Inline -->
              <div class="relative p-2 md:p-3 bg-black border border-white/20 rounded-none shadow-2xl transition-all duration-300 hover:border-[#d1ff00] cursor-pointer flex flex-col gap-3 group/card w-[280px] md:w-[380px] h-full">
                <div class="w-full aspect-[4/5] overflow-hidden bg-[#0a0a0a] relative pointer-events-none rounded-none border border-white/5">
                  <template v-if="item.gallery[0].endsWith('.mp4')">
                    <video :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" autoplay loop muted playsinline disablePictureInPicture></video>
                  </template>
                  <template v-else>
                    <img :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" draggable="false" />
                  </template>
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-[#d1ff00] font-mono uppercase tracking-widest text-sm border border-[#d1ff00] px-6 py-2 bg-black/60 rounded-none">View</span>
                  </div>
                </div>
                <div class="flex items-center justify-between px-1">
                   <span class="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest font-bold truncate max-w-[70%]">{{ item.title }}</span>
                   <span class="text-[9px] md:text-[10px] font-mono bg-[#d1ff00] text-black px-2 py-1 whitespace-nowrap rounded-none">{{ item.tag }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <!-- Row 3 -->
        <div class="marquee-row group" v-if="row3.length">
          <div class="marquee-content animate-marquee-left group-hover:pause-animation flex gap-8 md:gap-16">
            <div v-for="(item, idx) in [...row3, ...row3, ...row3, ...row3]" :key="`r3-${idx}`" class="marquee-item" @click.stop="!hasDragged && $emit('open-detail', item)">
              
              <!-- Project Card Inline -->
              <div class="relative p-2 md:p-3 bg-black border border-white/20 rounded-none shadow-2xl transition-all duration-300 hover:border-[#d1ff00] cursor-pointer flex flex-col gap-3 group/card w-[280px] md:w-[380px] h-full">
                <div class="w-full aspect-[4/5] overflow-hidden bg-[#0a0a0a] relative pointer-events-none rounded-none border border-white/5">
                  <template v-if="item.gallery[0].endsWith('.mp4')">
                    <video :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" autoplay loop muted playsinline disablePictureInPicture></video>
                  </template>
                  <template v-else>
                    <img :src="item.gallery[0]" class="w-full h-full object-cover filter grayscale group-hover/card:grayscale-0 transition-all duration-500" draggable="false" />
                  </template>
                  <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span class="text-[#d1ff00] font-mono uppercase tracking-widest text-sm border border-[#d1ff00] px-6 py-2 bg-black/60 rounded-none">View</span>
                  </div>
                </div>
                <div class="flex items-center justify-between px-1">
                   <span class="text-xs md:text-sm font-mono text-white/90 uppercase tracking-widest font-bold truncate max-w-[70%]">{{ item.title }}</span>
                   <span class="text-[9px] md:text-[10px] font-mono bg-[#d1ff00] text-black px-2 py-1 whitespace-nowrap rounded-none">{{ item.tag }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-detail'])

// Distribute items into 3 rows
const row1 = computed(() => (props.category?.items || []).filter((_, i) => i % 3 === 0))
const row2 = computed(() => (props.category?.items || []).filter((_, i) => i % 3 === 1))
const row3 = computed(() => (props.category?.items || []).filter((_, i) => i % 3 === 2))

// Canvas State
const CANVAS_WIDTH = 4000
const CANVAS_HEIGHT = 2000

const panX = ref(0)
const panY = ref(0)
const isDragging = ref(false)
const hasDragged = ref(false)

let startX = 0
let startY = 0
let initialPanX = 0
let initialPanY = 0

// Center the canvas on mount
onMounted(() => {
  panX.value = -(CANVAS_WIDTH / 2) + (window.innerWidth / 2)
  panY.value = -(CANVAS_HEIGHT / 2) + (window.innerHeight / 2)
})

const clampPan = () => {
  const minX = -(CANVAS_WIDTH - window.innerWidth)
  const minY = -(CANVAS_HEIGHT - window.innerHeight)
  
  if (panX.value > 0) panX.value = 0
  if (panY.value > 0) panY.value = 0
  if (panX.value < minX) panX.value = minX
  if (panY.value < minY) panY.value = minY
}

// Desktop Scroll (Trackpad / Mouse Wheel)
const onWheel = (e) => {
  panX.value -= e.deltaX
  panY.value -= e.deltaY
  clampPan()
}

// Mouse Drag Navigation (Fallback for non-trackpad users)
const onDragStart = (e) => {
  isDragging.value = true
  hasDragged.value = false
  startX = e.pageX
  startY = e.pageY
  initialPanX = panX.value
  initialPanY = panY.value
}

const onDragMove = (e) => {
  if (!isDragging.value) return
  
  const dx = e.pageX - startX
  const dy = e.pageY - startY
  
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    hasDragged.value = true
  }
  
  panX.value = initialPanX + dx
  panY.value = initialPanY + dy
  clampPan()
}

const onDragEnd = () => {
  isDragging.value = false
}

// Mobile Touch Navigation
const onTouchStart = (e) => {
  if (e.touches.length !== 1) return
  isDragging.value = true
  hasDragged.value = false
  startX = e.touches[0].pageX
  startY = e.touches[0].pageY
  initialPanX = panX.value
  initialPanY = panY.value
}

const onTouchMove = (e) => {
  if (!isDragging.value || e.touches.length !== 1) return
  
  const dx = e.touches[0].pageX - startX
  const dy = e.touches[0].pageY - startY
  
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    hasDragged.value = true
  }
  
  panX.value = initialPanX + dx
  panY.value = initialPanY + dy
  clampPan()
}

const onTouchEnd = () => {
  isDragging.value = false
}
</script>

<style scoped>
.freestyle-marquee-container {
  touch-action: none;
}

.marquee-row {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  width: max-content;
}

.marquee-item {
  flex-shrink: 0;
}

/* Animations */
.animate-marquee-left {
  animation: marqueeLeft 40s linear infinite;
}

.animate-marquee-right {
  animation: marqueeRight 45s linear infinite;
}

/* Pause on hover */
.pause-animation {
  animation-play-state: paused;
}

/* Using a simple transform calculation:
   Since we render [...row, ...row, ...row, ...row] (4 copies to fill 4000px safely),
   translating by -25% perfectly offsets one full copy length.
*/
@keyframes marqueeLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-25%); }
}

@keyframes marqueeRight {
  0% { transform: translateX(-25%); }
  100% { transform: translateX(0); }
}

/* For mobile, make them a bit faster */
@media (max-width: 768px) {
  .animate-marquee-left {
    animation-duration: 25s;
  }
  .animate-marquee-right {
    animation-duration: 30s;
  }
}
</style>
