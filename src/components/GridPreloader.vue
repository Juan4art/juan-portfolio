<template>
  <div v-if="isVisible" class="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden" :class="isReadyToStart ? 'cursor-pointer' : ''" @click="handleScreenClick">
    
    <!-- 6 Vertical Slices of the Screen -->
    <div v-for="i in 6" :key="i"
         class="absolute inset-0 bg-black flex items-center justify-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.7,0,0.1,1)]"
         :style="{
           clipPath: `polygon(${(i-1)*16.667}% 0, ${i*16.667 + 0.2}% 0, ${i*16.667 + 0.2}% 100%, ${(i-1)*16.667}% 100%)`,
           transitionDelay: `${i * 60}ms`
         }"
         :class="isAnimatingOut ? (i%2===0 ? 'translate-y-full' : '-translate-y-full') : ''">
         
         <div class="flex flex-col items-center justify-center pointer-events-none select-none">
           <h1 class="font-sans font-black text-white text-[13vw] leading-none tracking-tighter transition-opacity duration-300"
               :class="fontsReady ? 'opacity-100' : 'opacity-0'">PORTFOLIO</h1>
           
           <!-- Sleek Loading Progress Indicator -->
           <div class="mt-10 transition-opacity duration-500 flex flex-col items-center gap-2.5"
                :class="isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100'">
             
             <template v-if="!isReadyToStart">
               <!-- Minimal Spinner -->
               <div class="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
             </template>
             <template v-else>
               <span class="font-mono text-xs md:text-sm tracking-[0.3em] uppercase animate-pulse text-white/80">
                 {{ lang === 'it' ? 'CLICCA PER INIZIARE' : 'CLICK TO START' }}
               </span>
             </template>
           </div>
         </div>
         
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLang } from '../composables/useLang.js'

const isVisible = ref(true)
const isAnimatingOut = ref(false)
const fontsReady = ref(false)
const isReadyToStart = ref(false)

const { lang } = useLang()

const handleScreenClick = () => {
  if (isReadyToStart.value && !isAnimatingOut.value) {
    startExitAnimation()
  }
}

const criticalImages = [
  '/logo.webp',
  '/JeansFront.webp',
  '/JeansBack.webp',
  '/hook.webp',
  '/Camera.webp',
  '/front.webp',
  '/branding.webp',
  '/magazine.webp',
  '/cassette.webp',
  '/ABOUT_ME.webp',
  '/io2.webp',
  '/images/Jazz1.webp',
  '/images/Solene1.webp',
  '/images/GD_brutalista1.webp',
  '/images/Concert4.webp',
  '/images/Moto1.webp',
  '/images/Snickers19.webp',
  '/images/GD_entropia1.webp',
  '/images/GiorniScalzi1.webp',
  '/images/Matera1.webp',
  '/images/GD_aeternum.webp',
  '/images/GD_commedia1.webp',
  '/images/Macchine1.webp'
]

const loadedCount = ref(0)
const totalCount = criticalImages.length
const progressPercent = computed(() => {
  if (totalCount === 0) return 100
  return Math.round((loadedCount.value / totalCount) * 100)
})

onMounted(() => {
  document.body.classList.remove('is-loaded')
  
  document.fonts.ready.then(() => {
    fontsReady.value = true
  })
  
  if (totalCount === 0) {
    document.fonts.ready.then(() => {
      isReadyToStart.value = true
    })
    return
  }

  // Failsafe: force exit after 30 seconds if images hang, so we give them plenty of time
  const timeoutId = setTimeout(() => {
    if (isVisible.value && !isAnimatingOut.value) {
      isReadyToStart.value = true
    }
  }, 30000)

  let loaded = 0
  const handleLoad = () => {
    loaded++
    loadedCount.value = loaded
    if (loaded >= totalCount) {
      clearTimeout(timeoutId)
      document.fonts.ready.then(() => {
        setTimeout(() => {
          isReadyToStart.value = true
        }, 500) // Small delay to let user see it's complete
      })
    }
  }

  criticalImages.forEach((url) => {
    const img = new Image()
    img.onload = handleLoad
    img.onerror = handleLoad // Resolve anyway to avoid blocking on missing files
    img.src = url
  })
})

const startExitAnimation = () => {
  isAnimatingOut.value = true
  document.body.classList.add('is-loaded')
  setTimeout(() => {
    isVisible.value = false
  }, 1500)
}
</script>



