<template>
  <section class="relative w-full h-screen overflow-hidden bg-[#050505]" 
           ref="sceneRef"
           @click="handleSceneClick"
           :class="hoveredPanelIndex !== null ? 'cursor-pointer' : 'cursor-default'">
           
    <!-- ── Ambient Background Lighting ── -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none"></div>

    <!-- ── Background Typography ── -->
    <div class="absolute left-10 top-1/2 -translate-y-1/2 text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase" style="text-shadow: 0 2px 10px rgba(255,255,255,0.2);">
      {{ t.heroCollection }}
    </div>
    <div class="absolute right-10 top-1/2 -translate-y-1/2 text-white/30 text-[10px] font-mono tracking-[0.25em] uppercase" style="text-shadow: 0 2px 10px rgba(255,255,255,0.2);">
      {{ t.heroBlustoodio }}
    </div>
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-[9px] font-mono tracking-[0.3em] uppercase">
      {{ t.heroScroll }}
    </div>


<!-- ── Perfectly Centered Keychain Assembly ── -->
    <!-- Floating category label - OUTSIDE 3D transforms so it renders correctly -->
    <Transition name="label-fade">
      <div v-if="hoveredPanelIndex !== null"
           class="fixed left-1/2 z-[200] pointer-events-none"
           :style="labelStyle">
        <span class="text-white font-mono text-[11px] tracking-[0.35em] uppercase font-black whitespace-nowrap"
              style="text-shadow: 0 2px 8px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 0, 0, 0.9);">
          {{ panels[hoveredPanelIndex]?.label }}
        </span>
      </div>
    </Transition>

    <!-- ── Anchor Point (Centered, moved up, Master Zoom) ── -->
    <!-- Center adjustment for much larger objects -->
    <div class="absolute z-[10] pointer-events-none"
         style="left: 50%; perspective: 2500px;"
         :style="{ 
           top: isMobile ? '2vh' : '8vh',
           transform: `scale(${isMobile ? 0.75 : 1.15})` 
         }">
         
      <!-- JeansFront Background Image (Mathematically fits screen height) -->
      <img src="/JeansFront.webp" alt="Jeans Background Texture" class="absolute max-w-none pointer-events-none opacity-100 will-change-transform" style="will-change: transform, opacity;"
           :style="{
             height: isMobile ? '160vh' : '100vh',
             width: 'auto',
             transform: 'translate(-59%, -18%)',
             zIndex: -1
           }" />

      <!-- Centering Wrapper for Pendulum (Independently scaled to 1.2x) -->
      <div class="absolute top-0 left-0 z-10" style="transform: translateX(-50%) scale(1.2); transform-origin: top center;">
      
        <div class="relative flex flex-col items-center pointer-events-none will-change-transform"
             ref="pendulumRef"
             style="transform-style: preserve-3d; transform-origin: center top;">
             
             <!-- Photorealistic Carabiner Hook -->
             <div class="relative flex flex-col items-center z-10" style="transform: translateZ(10px);">
               <img src="/hook.webp" alt="Carabiner Hook" class="w-[106px] h-auto object-contain brightness-[1.1] contrast-[1.2]" style="will-change: filter;" />
             </div>

           <!-- Realistic Metal Keyring -->
           <div class="relative w-[70px] h-[70px] border-[6px] border-[#d0d0d0] rounded-full bg-transparent z-20 -mt-[16px] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.6)] ring-1 ring-[#333]"></div>

           <div class="relative w-0 h-0 flex items-start justify-center z-30 mt-[-10px]">
                  <div v-for="(panel, index) in panels" :key="panel.slug"
                       @click.stop="handlePanelClick(index)"
                       class="absolute top-0 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer pointer-events-auto"
                       style="transform-origin: top center;"
                       :style="{
                          transform: getObjectTransform(index, isHovered, hoveredPanelIndex),
                          opacity: getObjectOpacity(index, hoveredPanelIndex),
                          zIndex: hoveredPanelIndex === index ? 100 : (40 - index)
                       }">
                   
                  <!-- Chrome Chain -->
                  <div class="absolute top-[8px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                     <!-- Link 1 -->
                     <div class="w-4 h-6 rounded-full border-[3px] border-[#d0d0d0] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.6)] -mb-[10px] bg-transparent"></div>
                     <!-- Link 2 (Rotated perspective) -->
                     <div class="w-[6px] h-6 rounded-full border-[2px] border-[#a0a0a0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.8)] -mb-[10px] bg-[#888]"></div>
                     <!-- Link 3 -->
                     <div class="w-4 h-6 rounded-full border-[3px] border-[#d0d0d0] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.6)] -mb-[10px] bg-transparent"></div>
                     <!-- Link 4 (Rotated perspective) -->
                     <div class="w-[6px] h-6 rounded-full border-[2px] border-[#a0a0a0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.8)] -mb-[10px] bg-[#888]"></div>
                     <!-- Link 5 -->
                     <div class="w-4 h-6 rounded-full border-[3px] border-[#d0d0d0] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-transparent"></div>
                  </div>

                  <!-- Object 2: Camera (Photorealistic Image) - ROTATED 90 DEG -->
                  <div v-if="index === 2" 
                       class="w-[225px] h-[350px] absolute top-[85px] left-1/2 -translate-x-1/2 group transition-all duration-300 pointer-events-none flex items-center justify-center"
                       :class="{ 'brightness-110': hoveredPanelIndex === 2 }">
                     <!-- Keyring Hole -->
                     <div class="absolute -top-3 left-1/2 w-6 h-6 rounded-full border-[4px] border-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] bg-transparent z-20 pointer-events-none" style="transform: translateX(-50%) translateZ(2px);"></div>
                     <img src="/Camera.webp" alt="Photography Camera" class="w-[350px] h-[225px] max-w-none object-contain pointer-events-none -rotate-90" loading="lazy" />

                  </div>

                  <!-- Object 1: Identity Card (Thick Acrylic) -->
                  <!-- NO CATEGORY NAME, HUGE PHOTO, ROUTES TO ABOUT -->
                  <div v-if="index === 0" 
                       class="w-[160px] h-[320px] rounded-[14px] absolute top-[70px] left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-300 pointer-events-none
                       bg-gradient-to-b from-white/30 to-white/10 border border-white/50
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4),inset_0_5px_15px_rgba(255,255,255,0.2)]"
                       :class="{ 'brightness-110': hoveredPanelIndex === 0 }">
                    <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/5 opacity-80"></div>
                    <!-- Visible Noise on the Card -->
                    <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
                    <div class="absolute top-3 left-1/2 -translate-x-1/2 w-[30px] h-[10px] rounded-full border-[2px] border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] bg-transparent z-20"></div>
                    
                    <!-- Massive ID Photo -->
                    <div class="absolute left-1/2 top-[45px] -translate-x-1/2 w-[125px] h-[165px] border-[3px] border-white/80 rounded-[8px] bg-white shadow-sm overflow-hidden grayscale pointer-events-none z-20">
                       <!-- Removed the sketches.png so the photo is clean, based on user feedback -->
                       <img src="/io2.webp" alt="Profile" class="absolute inset-0 w-full h-full object-cover object-top opacity-90" style="will-change: filter;" loading="lazy" />
                    </div>

                    <!-- Redacted text lines below the photo -->
                    <div class="absolute left-1/2 bottom-[35px] -translate-x-1/2 flex flex-col items-center gap-[8px] w-[120px] pointer-events-none">
                       <div class="w-full h-[6px] bg-black/40 rounded-full"></div>
                       <div class="w-[80%] h-[6px] bg-black/40 rounded-full"></div>
                       <div class="w-[90%] h-[6px] bg-black/40 rounded-full"></div>
                    </div>

                    <!-- Barcode -->
                    <div class="absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-[2px] h-[15px] opacity-50 pointer-events-none">
                       <div v-for="b in 20" :key="b" class="bg-black h-full" :style="{ width: Math.random() * 3 + 1 + 'px' }"></div>
                    </div>

                    <!-- Hover Hint (Superimposed) -->
                    <div 
                      class="absolute top-[70%] left-1/2 -translate-x-1/2 text-white font-mono text-[10px] tracking-[0.2em] font-black uppercase whitespace-nowrap z-50 transition-opacity duration-500 bg-black/80 px-4 py-1.5 rounded-full border border-white/20"
                      :class="isHovered ? 'opacity-0' : 'opacity-100 animate-pulse'"
                    >
                      {{ t.heroHover }}
                    </div>

                    <!-- hitbox (click handled by pendulum wrapper) -->
                    <div class="absolute inset-0 w-full h-full"></div>
                  </div>

                  <!-- Object 3: Photorealistic Lighter (3D Flipping Front/Back) -->
                  <div v-if="index === 3" class="w-[100px] h-[280px] absolute top-[85px] left-1/2 -translate-x-1/2 pointer-events-none" style="perspective: 1000px;">
                    <div class="absolute -top-4 left-1/2 w-6 h-6 rounded-full border-[4px] border-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] bg-transparent z-20 pointer-events-none" style="transform: translateX(-50%) translateZ(1px);"></div>
                    
                    <!-- Static Container -->
                    <div class="w-full h-full relative transition-all duration-300 pointer-events-none" 
                         :class="{ 'brightness-110': hoveredPanelIndex === 3 }">
                       <!-- Front (Purple OCHO) -->
                       <img src="/front.webp" alt="Creative Direction Front" class="absolute inset-0 w-full h-full object-contain pointer-events-none" style="will-change: filter;" loading="lazy" />
                    </div>

                    <!-- hitbox (click handled by pendulum wrapper) -->
                    <div class="absolute inset-0 w-full h-full"></div>
                  </div>

                  <!-- Object 4: Branding Bottlecap -->
                  <div v-if="index === 1" class="w-[275px] h-[275px] absolute top-[85px] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none" style="perspective: 1000px;">
                     <!-- Keyring Hole -->
                     <div class="absolute -top-3 left-1/2 w-6 h-6 rounded-full border-[4px] border-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] bg-transparent z-20 pointer-events-none" style="transform: translateX(-50%) translateZ(2px);"></div>
                     
                     <!-- 3D Transform Wrapper -->
                     <div class="w-full h-full relative pointer-events-none transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" 
                          style="transform-style: preserve-3d; transform: rotateY(5deg) rotateZ(-3deg);"
                          :class="{ 'rotate-y-[15deg] -rotate-x-[10deg]': hoveredPanelIndex === 1 }">
                       <!-- Transparent PNG Image -->
                       <img src="/branding.webp" alt="Branding" class="w-full h-full object-contain pointer-events-none" style="will-change: filter;" loading="lazy" />
                       
                       <!-- 3D Gloss / Specular Overlay -->
                       <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transition-opacity duration-700 pointer-events-none rounded-full"
                            :class="hoveredPanelIndex === 1 ? 'opacity-100' : 'opacity-0'"></div>
                     </div>
                     <!-- hitbox (click handled by pendulum wrapper) -->
                     <div class="absolute inset-0 w-full h-full rounded-full"></div>
                  </div>

                  <!-- Object 5: 3D Magazine (Publishings) -->
                  <div v-if="index === 4" 
                       class="w-[200px] h-[280px] absolute top-[85px] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none" 
                       style="perspective: 1200px;"
                       :class="{ 'brightness-110': hoveredPanelIndex === 4 }">
                    <!-- Keyring Hole -->
                    <div class="absolute -top-3 left-1/2 w-6 h-6 rounded-full border-[4px] border-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] bg-transparent z-20 pointer-events-none" style="transform: translateX(-50%) translateZ(2px);"></div>
                    
                    <!-- 3D Book/Magazine Assembly -->
                    <div class="w-full h-full relative rounded-r-md transition-transform duration-700 ease-out pointer-events-none" 
                         style="transform-style: preserve-3d; transform: rotateY(2deg) rotateZ(-1deg);"
                         :class="{ 'rotate-y-[8deg]': hoveredPanelIndex === 4 }">
                      <!-- Page stack 2 -->
                      <div class="absolute inset-0 bg-[#e0e0e0] border-y border-r border-[#aaa] rounded-r-md transform translate-x-[4px] translate-y-[2px] -translate-z-[6px] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                      <!-- Page stack 1 -->
                      <div class="absolute inset-0 bg-[#f5f5f5] border-y border-r border-[#ccc] rounded-r-md transform translate-x-[2px] translate-y-[1px] -translate-z-[3px] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                      
                      <!-- Front Cover -->
                      <div class="absolute inset-0 rounded-r-sm overflow-hidden bg-[#111] shadow-[inset_2px_0_5px_rgba(255,255,255,0.2)] border-l-2 border-l-black/80">
                         <img src="/magazine.webp" alt="Publishings Magazine" class="w-full h-full object-cover pointer-events-none" style="will-change: filter;" loading="lazy" />
                         <!-- Spine fold shading (Left edge) -->
                         <div class="absolute left-0 top-0 bottom-0 w-[15px] bg-gradient-to-r from-black/60 via-black/10 to-transparent pointer-events-none"></div>
                         <!-- Specular gloss overlay -->
                         <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transition-opacity duration-700 pointer-events-none"
                              :class="hoveredPanelIndex === 4 ? 'opacity-100' : 'opacity-0'"></div>
                      </div>
                    </div>
                    <!-- hitbox (click handled by pendulum wrapper) -->
                    <div class="absolute inset-0 w-full h-full"></div>
                  </div>

                  <!-- Object 6: Cassette Tape (Music Player) - BIGGER & MORE 3D -->
                  <div v-if="index === 5" class="w-[230px] h-[330px] absolute top-[85px] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none" style="perspective: 1000px;">
                     <!-- Keyring Hole -->
                     <div class="absolute -top-3 left-1/2 w-6 h-6 rounded-full border-[4px] border-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] bg-transparent z-20 pointer-events-none" style="transform: translateX(-50%) translateZ(2px);"></div>
                     
                     <!-- 3D Transform Wrapper -->
                     <div class="w-full h-full relative pointer-events-none transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" 
                          style="transform-style: preserve-3d; transform: rotateY(4deg) rotateZ(-2deg);"
                          :class="{ 'rotate-y-[12deg] -rotate-x-[5deg]': hoveredPanelIndex === 5 }">
                       <img src="/cassette.webp" alt="Awesome Mix Tape" class="w-full h-full object-contain pointer-events-none" loading="lazy" />
                       
                       <!-- 3D Gloss / Specular Overlay -->
                       <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transition-opacity duration-700 pointer-events-none rounded-[8px]"
                            :class="hoveredPanelIndex === 5 ? 'opacity-100' : 'opacity-0'"></div>

                       <!-- Playing Indicator -->
                       <div v-if="isPlayingMusic" class="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#fff] font-mono text-[11px] tracking-widest bg-black/90 px-4 py-1.5 rounded-full animate-pulse border border-[#ffd700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                         {{ t.heroPlaying }}
                       </div>
                     </div>
                     <!-- hitbox (click handled by pendulum wrapper) -->
                     <div class="absolute inset-0 w-full h-full"></div>
                  </div>

              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Mobile Touch Swipe Overlay -->
    <div v-if="isMobile"
         class="absolute inset-0 z-[30] pointer-events-auto select-none touch-none"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
    </div>

    <!-- Mobile Carousel Dots Indicator -->
    <div v-if="isMobile" class="fixed left-1/2 bottom-[160px] -translate-x-1/2 z-[200] flex gap-2 pointer-events-none select-none">
      <div v-for="i in 6" :key="i"
           class="w-1.5 h-1.5 rounded-full transition-all duration-300"
           :class="hoveredPanelIndex === (i-1) ? 'bg-white scale-125' : 'bg-white/30'">
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useLang } from '../../composables/useLang'
import { useAudio } from '../../composables/useAudio'

const router = useRouter()
const { t } = useLang()

const sceneRef = ref(null)
const pendulumRef = ref(null)

const panels = computed(() => [
  { id: 0, slug: 'graphic-design',    label: t.value.panelAbout },
  { id: 3, slug: 'branding',          label: t.value.categories['branding'].title },
  { id: 1, slug: 'photography',       label: t.value.categories['photography'].title },
  { id: 2, slug: 'creative-direction',label: t.value.categories['creative-direction'].title },
  { id: 4, slug: 'publishings',       label: t.value.categories['publishings'].title },
  { id: 5, slug: 'music',             label: t.value.panelMusic }
])

const { isPlaying: isPlayingMusic, togglePlay } = useAudio()

const isHovered = ref(false)
const hoveredPanelIndex = ref(null)

const isMobile = computed(() => windowSize.value.w < 768)

// Computed labels style for mobile placement vs desktop
const labelStyle = computed(() => {
  const isMobileDevice = windowSize.value.w < 768
  if (isMobileDevice) {
    return {
      bottom: '120px',
      transform: 'translateX(-50%)'
    }
  } else {
    return {
      top: 'calc(50vh + 260px)',
      transform: 'translateX(-50%)'
    }
  }
})

// Touch/Click selection for mobile + desktop
const handlePanelClick = (index) => {
  const isMobileDevice = windowSize.value.w < 768
  if (isMobileDevice) {
    hoveredPanelIndex.value = index
    playHoverSound()
    setTimeout(() => {
      handleKeychainClick()
    }, 450)
  } else {
    hoveredPanelIndex.value = index
    handleKeychainClick()
  }
}

// Screen-space center X positions for each object (relative to screen center)
// We detect hover by finding which object the mouse is closest to
const objectHitRadii = [120, 80, 50, 90, 100, 90] // approximate half-widths per object

const getObjectTransform = (index, hovered, hoveredIdx) => {
  const isMobileDevice = windowSize.value.w < 768
  
  if (hovered || isMobileDevice) {
    let rotZ = isMobileDevice 
      ? [36, 18, 0, -18, -36, -54]  // default fan on mobile
      : [60, 30, 0, -30, -60, -90]
    let rotX = [0, 0, 0, 0, 0, 0]
    let rotY = [0, 0, 0, 0, 0, 0]
    let scale = [1, 1, 1, 1, 1, 1]
    let ty = [0, 0, 0, 0, 0, 0]
    let tx = [0, 0, 0, 0, 0, 0]
    let tz = [4, 2, 0, -2, -4, -6]
    
    if (hoveredIdx !== null) {
      if (index < hoveredIdx) {
        // Push items before it to the left
        rotZ[index] += isMobileDevice ? 25 : 45
        if (isMobileDevice) {
          scale[index] = 0.75
        }
      } else if (index > hoveredIdx) {
        // Push items after it to the right
        rotZ[index] -= isMobileDevice ? 25 : 45
        if (isMobileDevice) {
          scale[index] = 0.75
        }
      } else {
        // The hovered item itself
        rotX[index] = isMobileDevice ? 15 : 12
        if (isMobileDevice) {
          scale[index] = 1.2
          ty[index] = 20
          tz[index] = 30
          rotZ[index] = 0 // Straighten!
        }
      }
    }

    const transformStr = isMobileDevice
      ? `translateX(${tx[index]}px) translateY(${ty[index]}px) translateZ(${tz[index]}px) rotateZ(${rotZ[index]}deg) rotateX(${rotX[index]}deg) rotateY(${rotY[index]}deg) scale(${scale[index]})`
      : `translateX(0px) translateY(0px) translateZ(${tz[index]}px) rotateZ(${rotZ[index]}deg) rotateX(${rotX[index]}deg) rotateY(${rotY[index]}deg)`
      
    return transformStr
  } else {
    const clumpRot = [6, 3, 0, -3, -6, -9]
    return `translateX(0px) translateY(0px) rotateZ(${clumpRot[index]}deg) translateZ(${index * 2}px)`
  }
}

const getObjectFilter = () => 'brightness(1)'
const getObjectOpacity = (index, hoveredIdx) => {
  const isMobileDevice = windowSize.value.w < 768
  if (!isMobileDevice) return 1
  if (hoveredIdx === null) return 1
  return hoveredIdx === index ? 1 : 0.25
}

const badgeRot = { x: 0, y: 0, z: 0, targetX: 0, targetY: 0, targetZ: 0, vx: 0, vy: 0, vz: 0 }
const windowSize = ref({ w: typeof window !== 'undefined' ? window.innerWidth : 1200, h: typeof window !== 'undefined' ? window.innerHeight : 800 })

const goToCategory = (slug) => {
  router.push(`/category/${slug}`)
}

const goToAbout = () => {
  router.push(`/about`)
}

const handleKeychainClick = () => {
  const idx = hoveredPanelIndex.value
  if (idx === null) return
  
  if (idx === 5) {
    router.push(`/playlist`)
    return
  }

  const panel = panels.value[idx]
  // ID card (index 0) goes to About
  if (idx === 0) {
    goToAbout()
  } else {
    goToCategory(panel.slug)
  }
}

const handleSceneClick = () => {
  if (hoveredPanelIndex.value !== null) {
    handleKeychainClick()
  }
}

let cardsInteractionEnabled = false
let targetMouse = { x: -1000, y: -1000 }
let mouse = { x: -1000, y: -1000 }

// Touch swipe variables for mobile carousel
let touchStartX = 0
let touchStartY = 0
let gestureStartX = 0
let gestureStartY = 0
let touchStartTime = 0
let touchStartIdx = 0
let isSwiping = false

const handleTouchStart = (e) => {
  if (e.touches.length === 0) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  gestureStartX = touchStartX
  gestureStartY = touchStartY
  touchStartTime = Date.now()
  touchStartIdx = hoveredPanelIndex.value ?? 0
  isSwiping = true
}

const handleTouchMove = (e) => {
  if (!isSwiping || e.touches.length === 0) return
  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  
  const dx = currentX - touchStartX
  const dy = currentY - touchStartY
  const gestureDx = currentX - gestureStartX
  
  // Rotate/wobble the keychain in Z-space based on total gesture drag
  const rotationStrength = 0.08
  badgeRot.targetZ = Math.min(25, Math.max(-25, gestureDx * rotationStrength))

  // Dynamically update active index in real-time based on horizontal swipe distance
  const step = 60 // Sensitivity of horizontal drag (pixels per card transition)
  
  if (Math.abs(dx) >= step) {
    const direction = Math.sign(dx) // +1 for swipe right (dx > 0), -1 for swipe left (dx < 0)
    let newIdx = (hoveredPanelIndex.value ?? touchStartIdx) - direction
    
    if (newIdx >= 0 && newIdx <= 5) {
      hoveredPanelIndex.value = newIdx
      playHoverSound()
    }
    
    // Always update start touch points when threshold is crossed,
    // even at bounds, to prevent dead-zone accumulation.
    touchStartX = currentX
    touchStartY = currentY
  }
}

const handleTouchEnd = (e) => {
  if (!isSwiping) return
  isSwiping = false
  
  // Snap keyring rotation back to center on finger release
  badgeRot.targetZ = 0
  
  if (e.changedTouches.length === 0) return
  const dx = e.changedTouches[0].clientX - gestureStartX
  const dy = e.changedTouches[0].clientY - gestureStartY
  const dt = Date.now() - touchStartTime
  
  // If it's a simple quick tap (minimal drag and short duration), perform navigation to current page
  if (Math.abs(dx) < 15 && Math.abs(dy) < 15 && dt < 300) {
    if (hoveredPanelIndex.value !== null) {
      handleKeychainClick()
    }
  }
}



const onMouseMove = (e) => {
  if (document.getElementById('grid-preloader') || !cardsInteractionEnabled) return
  targetMouse.x = e.clientX; targetMouse.y = e.clientY
}

// Compute hovered object index from raw mouse position
// We compare mouse X against each object's expected screen-space X position
const computeHoveredIndex = (mx, my) => {
  if (!isHovered.value) return null
  const cx = windowSize.value.w / 2
  
  // The fan spreads horizontally. We divide the screen width into 6 vertical slices.
  // This is infinitely more reliable than radial distance hit-testing.
  const spreadWidth = Math.min(windowSize.value.w * 0.8, 900) // 80% of screen, max 900px
  const startX = cx - (spreadWidth / 2)
  
  let normX = (mx - startX) / spreadWidth
  if (normX < 0) normX = 0
  if (normX >= 1) normX = 0.99
  
  return Math.floor(normX * 6)
}

let audioCtx = null

const unlockAudio = () => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    if (audioCtx.state === 'suspended') audioCtx.resume()
  } catch (e) {
    // Silently ignore browser restrictions
  }
}

let lastSoundTime = 0
const playHoverSound = () => {
  if (!audioCtx) return;
  
  // Try to resume if it was suspended (e.g., by browser tab inactive)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  if (audioCtx.state !== 'running') return;

  const now = Date.now();
  if (now - lastSoundTime < 50) return; // Prevent overlapping spam
  lastSoundTime = now;

  try {
    const t = audioCtx.currentTime;
    
    // Soft interface blip
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 50, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
    
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(t + 0.05);
  } catch (e) {
    console.log("Audio play failed", e)
  }
}

let rafId = null
const tick = () => {
  if (targetMouse.x !== -1000) {
    if (mouse.x === -1000) { mouse.x = targetMouse.x; mouse.y = targetMouse.y }
    else { mouse.x += (targetMouse.x - mouse.x) * 0.15; mouse.y += (targetMouse.y - mouse.y) * 0.15 }
  }

  if (mouse.x !== -1000 && !isMobile.value) {
    const cx = windowSize.value.w / 2
    const anchorY = windowSize.value.h * 0.08
    const mx = mouse.x
    const my = mouse.y

    // Calculate if mouse is inside the interactive keychain zone mathematically
    let inside = false
    if (isHovered.value) {
      // Tighter threshold with hysteresis so it's easier to un-hover
      inside = mx >= cx - 500 && mx <= cx + 500 && my >= anchorY - 80 && my <= anchorY + 850
    } else {
      // Entry threshold for fanned clump
      inside = mx >= cx - 200 && mx <= cx + 200 && my >= anchorY - 30 && my <= anchorY + 700
    }
    
    if (isHovered.value !== inside) {
      isHovered.value = inside
      if (!inside) {
        hoveredPanelIndex.value = null
      }
    }

    // Update hovered object using mouse-position math (bypasses 3D transform hit-test bug)
    const newIdx = computeHoveredIndex(mouse.x, mouse.y)
    if (hoveredPanelIndex.value !== newIdx) {
      if (newIdx !== null) {
        playHoverSound()
      }
      hoveredPanelIndex.value = newIdx
    }

    if (isHovered.value) {
      const dx = mouse.x - windowSize.value.w / 2
      const dy = mouse.y - windowSize.value.h / 2
      const multiplier = 40
      badgeRot.targetY = (dx / windowSize.value.w) * multiplier
      badgeRot.targetX = -(dy / windowSize.value.h) * multiplier
      badgeRot.targetZ = (dx / window.innerWidth) * (-multiplier * 0.8)
    } else {
      badgeRot.targetX = 0
      badgeRot.targetY = 0
      badgeRot.targetZ = 0
    }
  } else if (isMobile.value) {
    // Force complete stillness on X and Y axes on mobile
    badgeRot.targetX = 0
    badgeRot.targetY = 0
    badgeRot.x = 0
    badgeRot.y = 0
    badgeRot.vx = 0
    badgeRot.vy = 0
    // Z-axis target is set by swipe drag and snaps back to 0 on release
  }

  const stiffness = 0.025, damping = 0.86
  badgeRot.vx += (badgeRot.targetX - badgeRot.x) * stiffness
  badgeRot.vy += (badgeRot.targetY - badgeRot.y) * stiffness
  badgeRot.vz += (badgeRot.targetZ - badgeRot.z) * stiffness
  badgeRot.vx *= damping; badgeRot.vy *= damping; badgeRot.vz *= damping
  badgeRot.x += badgeRot.vx; badgeRot.y += badgeRot.vy; badgeRot.z += badgeRot.vz

  if (pendulumRef.value) {
    pendulumRef.value.style.transform = `rotateX(${badgeRot.x}deg) rotateY(${badgeRot.y}deg) rotateZ(${badgeRot.z}deg)`
  }

  rafId = requestAnimationFrame(tick)
}

const handleResize = () => { 
  windowSize.value = { w: window.innerWidth, h: window.innerHeight }
  if (window.innerWidth < 768) {
    if (hoveredPanelIndex.value === null) {
      hoveredPanelIndex.value = 0
    }
    isHovered.value = true
  } else {
    isHovered.value = false
    hoveredPanelIndex.value = null
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('click', unlockAudio, { once: true, capture: true })
  window.addEventListener('touchstart', unlockAudio, { once: true, capture: true })
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove)
  
  if (window.innerWidth < 768) {
    hoveredPanelIndex.value = 0
    isHovered.value = true
  }

  rafId = requestAnimationFrame(tick)
  const checkLoaded = setInterval(() => {
    if (document.body.classList.contains('is-loaded')) {
      clearInterval(checkLoaded)
      setTimeout(() => cardsInteractionEnabled = true, 1500)
    }
  }, 100)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('click', unlockAudio, { capture: true })
  window.removeEventListener('touchstart', unlockAudio, { capture: true })
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.label-fade-enter-active,
.label-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.label-fade-enter-from,
.label-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
.label-fade-enter-to,
.label-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0px);
}
</style>
