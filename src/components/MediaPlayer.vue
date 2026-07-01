<template>
  <div 
    class="media-player fixed bottom-[12px] md:bottom-[20px] left-8 md:left-12 z-[9999] pointer-events-auto flex flex-col items-start gap-2"
    :class="isHidden ? 'media-player-hidden' : ''"
    @wheel.prevent="handleWheel"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Artist (Top) -->
    <div class="relative h-3 md:h-3.5 w-[200px] md:w-[300px] overflow-hidden text-[9px] md:text-[10px] uppercase tracking-widest font-mono select-none text-left transition-opacity duration-300"
         :class="isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'">
      <Transition :name="scrollDirection === 'down' ? 'widget-scroll-down' : 'widget-scroll-up'">
        <span :key="currentTrack?.artist" class="absolute inset-0 pl-5 text-white/40 block truncate">
          {{ currentTrack?.artist || t.unknown }}
        </span>
      </Transition>
    </div>

    <!-- The actual button -->
    <div 
      class="select-none cursor-pointer flex items-center gap-[3px] group hover:scale-105 h-[40px] px-5 rounded-full border border-white/10 bg-black/95 hover:bg-black/100 hover:border-white/20 shadow-2xl transition-all duration-300"
      title="Music"
      @click="togglePlay"
    >
      <!-- Dot Matrix Equalizer -->
      <div class="flex items-end gap-[3px] h-[24px]">
        <div v-for="col in 16" :key="'col-'+col" class="flex flex-col justify-end gap-[1.5px] h-full">
          <div v-for="row in 6" :key="'dot-'+col+'-'+row"
               :id="'vis-dot-'+col+'-'+row"
               class="w-[2.5px] h-[2.5px] rounded-full bg-white will-change-transform">
          </div>
        </div>
      </div>
    </div>

    <!-- Title (Bottom) -->
    <div class="relative h-3 md:h-3.5 w-[200px] md:w-[300px] overflow-hidden text-[9px] md:text-[10px] uppercase tracking-widest font-mono select-none text-left transition-opacity duration-300"
         :class="isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'">
      <Transition :name="scrollDirection === 'down' ? 'widget-scroll-down' : 'widget-scroll-up'">
        <span :key="currentTrack?.title" class="absolute inset-0 pl-5 text-[#FF6500] font-semibold block truncate">
          {{ currentTrack?.title || t.noTrack }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAudio } from '../composables/useAudio.js'
import { useLang } from '../composables/useLang.js'

const { t } = useLang()

const props = defineProps({
  isHidden: {
    type: Boolean,
    default: false
  }
})

const { isPlaying, togglePlay, currentTrack, next, prev } = useAudio()

const scrollDirection = ref('down')
let wheelTimeout = null

let touchStartY = 0
let touchStartTime = 0

const handleTouchStart = (e) => {
  if (e.touches.length === 0) return
  touchStartY = e.touches[0].clientY
  touchStartTime = Date.now()
}

const handleTouchEnd = (e) => {
  if (e.changedTouches.length === 0) return
  const dy = e.changedTouches[0].clientY - touchStartY
  const dt = Date.now() - touchStartTime
  
  if (Math.abs(dy) > 30 && dt < 800) {
    if (dy > 0) {
      scrollDirection.value = 'down'
      next()
    } else {
      scrollDirection.value = 'up'
      prev()
    }
  }
}

const handleWheel = (e) => {
  if (wheelTimeout) return
  
  if (e.deltaY > 10) {
    scrollDirection.value = 'down'
    next()
  } else if (e.deltaY < -10) {
    scrollDirection.value = 'up'
    prev()
  } else {
    return
  }
  
  wheelTimeout = setTimeout(() => {
    wheelTimeout = null
  }, 1200)
}

const COL_COUNT = 16
const ROW_COUNT = 6
let animationId = null
let dotsCache = null
let currentIntensity = 0

const updateVisualizer = () => {
  const time = Date.now() / 1000
  
  // Smoothly interpolate intensity from 0 to 1 based on isPlaying
  const targetIntensity = isPlaying.value ? 1 : 0
  currentIntensity += (targetIntensity - currentIntensity) * 0.15
  
  if (!dotsCache) {
    dotsCache = []
    for (let col = 1; col <= COL_COUNT; col++) {
      for (let row = 1; row <= ROW_COUNT; row++) {
        const el = document.getElementById(`vis-dot-${col}-${row}`)
        if (el) dotsCache.push(el)
      }
    }
  }
  
  if (dotsCache.length === COL_COUNT * ROW_COUNT) {
    for (let col = 0; col < COL_COUNT; col++) {
      // Idle formula (0 to 2 rows active)
      const idleVal = Math.sin(time * 2 + col * 0.3) * 1 + 1 
      
      // Playing formula (0 to 6 rows active)
      const val1 = Math.sin(time * 6 + col * 0.45)
      const val2 = Math.sin(time * 4.8 + col * 0.2)
      const playVal = (val1 + val2 + 2) * 1.5 
      
      // Blend the values based on currentIntensity
      const val = idleVal * (1 - currentIntensity) + playVal * currentIntensity
      const activeRows = Math.floor(val)
      
      // Blend opacities
      const activeOp = 0.4 * (1 - currentIntensity) + 1.0 * currentIntensity
      const inactiveOp = 0.1 * (1 - currentIntensity) + 0.15 * currentIntensity
      
      for (let r = 0; r < ROW_COUNT; r++) {
        const idx = col * ROW_COUNT + r
        const fromBottom = ROW_COUNT - 1 - r // 0 is bottom, 5 is top
        const dot = dotsCache[idx]
        if (dot) {
          dot.style.opacity = fromBottom < activeRows ? activeOp : inactiveOp
        }
      }
    }
  }
  
  animationId = requestAnimationFrame(updateVisualizer)
}

onMounted(() => {
  animationId = requestAnimationFrame(updateVisualizer)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style>
.media-player {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s ease;
}

body:not(.is-loaded) .media-player {
  opacity: 0;
  transform: translateY(20px);
}

body.is-loaded .media-player {
  transition: opacity 1s ease 0.8s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
  opacity: 1;
  transform: translateY(0);
}

.controls-ready .media-player {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              border-color 0.3s ease;
}

.controls-ready .media-player.media-player-hidden {
  opacity: 0;
  transform: translateY(100px) !important;
  pointer-events: none;
}

/* Smart Widget Scroll Animations */
.widget-scroll-down-enter-active,
.widget-scroll-down-leave-active,
.widget-scroll-up-enter-active,
.widget-scroll-up-leave-active {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease;
}

/* Scroll Down (Next): new comes from bottom, old goes to top */
.widget-scroll-down-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.widget-scroll-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Scroll Up (Prev): new comes from top, old goes to bottom */
.widget-scroll-up-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.widget-scroll-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
