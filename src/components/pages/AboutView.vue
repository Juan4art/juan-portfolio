<template>
  <section class="min-h-screen pt-28 pb-24 px-6 md:px-12 flex flex-col items-center justify-center bg-[url('/JeansBack.webp')] bg-cover bg-center md:bg-fixed bg-scroll">

    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6 items-stretch">
      
      <!-- ── Photo (Left Column, Spans 2 rows) ───────────────────────── -->
      <div
        class="md:col-span-1 md:row-span-2 flex flex-col animate-fade-up h-full relative"
        style="animation-delay: 0.05s; opacity: 0;"
      >
        <div 
          ref="photoRef"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
          class="w-full h-full relative flex items-center justify-center md:scale-[1.5] scale-100 md:-translate-x-12 translate-x-0 origin-center"
        >
          <!-- Grayscale Base -->
          <img
            src="/ABOUT_ME.webp"
            alt="About Me Base"
            class="w-full max-h-full object-contain grayscale drop-shadow-2xl pointer-events-none"
          />
          <!-- Color Reveal Overlay (Soft Spotlight) -->
          <img
            ref="revealImgRef"
            src="/ABOUT_ME.webp"
            alt="About Me Reveal"
            class="absolute inset-0 w-full h-full object-contain drop-shadow-2xl pointer-events-none transition-opacity duration-700 ease-out"
            :class="isHovering ? 'opacity-100' : 'opacity-0'"
          />
        </div>
      </div>

      <!-- ── Typography Content (Right Column, Spans 2 columns) ───────── -->
      <div
        class="md:col-span-2 md:row-span-2 flex flex-col justify-center gap-6 md:gap-8 text-white animate-fade-up z-10 p-6 md:p-10 bg-black/95 border border-white/10 rounded-[2rem] shadow-2xl md:max-h-[80vh] md:overflow-y-auto overflow-visible scrollbar-hide"
        style="animation-delay: 0.12s; opacity: 0;"
      >
      <!-- Experience -->
        <div class="flex flex-col hover-stamp-block">
          <h2 class="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-archivo uppercase tracking-tighter leading-none mb-2 break-words hyphens-auto w-full overflow-hidden">
            <template v-for="({w,i}) in expBlock.title" :key="'et'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
          </h2>
          <ul class="text-xs sm:text-sm md:text-base font-varela flex flex-col leading-relaxed tracking-tight text-white/90">
            <li>
              <template v-for="({w,i}) in expBlock.role" :key="'er'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
              {{ ' ' }}<template v-for="({w,i}) in expBlock.date" :key="'ed'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
            </li>
          </ul>
        </div>

        <!-- Education -->
        <div class="flex flex-col hover-stamp-block">
          <h2 class="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-archivo uppercase tracking-tighter leading-none mb-2 break-words hyphens-auto w-full overflow-hidden">
            <template v-for="({w,i}) in eduBlock.title" :key="'edt'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
          </h2>
          <ul class="text-xs sm:text-sm md:text-base font-varela flex flex-col leading-relaxed tracking-tight text-white/90">
            <li>
              <template v-for="({w,i}) in eduBlock.degree" :key="'edd'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template><br>
              <template v-for="({w,i}) in eduBlock.school" :key="'eds'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
              {{ ' ' }}<template v-for="({w,i}) in eduBlock.date" :key="'eddt'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
            </li>
          </ul>
        </div>

        <!-- Programs -->
        <div class="flex flex-col hover-stamp-block">
          <h2 class="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-archivo uppercase tracking-tighter leading-none mb-2 break-words hyphens-auto w-full overflow-hidden">
            <template v-for="({w,i}) in progBlock.title" :key="'pt'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
          </h2>
          <ul class="text-xs sm:text-sm md:text-base font-varela flex flex-col leading-relaxed tracking-tight text-white/90">
            <li><template v-for="({w,i}) in progBlock.line1" :key="'p1'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
            <li><template v-for="({w,i}) in progBlock.line2" :key="'p2'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
            <li><template v-for="({w,i}) in progBlock.line3" :key="'p3'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
          </ul>
        </div>

        <!-- Languages -->
        <div class="flex flex-col hover-stamp-block">
          <h2 class="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-archivo uppercase tracking-tighter leading-none mb-2 break-words hyphens-auto w-full overflow-hidden">
            <template v-for="({w,i}) in langBlock.title" :key="'lt'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template>
          </h2>
          <ul class="text-xs sm:text-sm md:text-base font-varela flex flex-col leading-relaxed tracking-tight text-white/90">
            <li><template v-for="({w,i}) in langBlock.italian" :key="'li'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
            <li><template v-for="({w,i}) in langBlock.english" :key="'le'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
            <li><template v-for="({w,i}) in langBlock.spanish" :key="'ls'+i"><span class="word-hl" :style="`--i:${i}`">{{ w }}</span>{{ ' ' }}</template></li>
          </ul>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, h, reactive, computed } from 'vue'
import { useLang } from '../../composables/useLang.js'

const { t } = useLang()

// ── Word-by-word highlight helper ──────────────────────────────
// Splits strings into [{w, i}] objects where i is a continuous
// index across the whole block so CSS stagger delay is seamless.
const ws = (text) => (text || '').split(/\s+/).filter(Boolean)

const makeBlock = (strings) => {
  let i = 0
  return strings.map(str => ws(str).map(w => ({ w, i: i++ })))
}

const expBlock = computed(() => {
  const [title, role, date] = makeBlock([
    t.value.aboutText.expTitle,
    t.value.aboutText.expRole,
    t.value.aboutText.expDate
  ])
  return { title, role, date }
})

const eduBlock = computed(() => {
  const [title, degree, school, date] = makeBlock([
    t.value.aboutText.eduTitle,
    t.value.aboutText.eduDegree,
    t.value.aboutText.eduSchool,
    t.value.aboutText.eduDate
  ])
  return { title, degree, school, date }
})

const progBlock = computed(() => {
  const [title, line1, line2, line3] = makeBlock([
    t.value.aboutText.progTitle,
    `Photoshop, InDesign, Illustrator, Lightroom - ${t.value.aboutText.progExpert}`,
    `Figma, After Effects, DaVinci Resolve, Touch Designer - ${t.value.aboutText.progProficient}`,
    `Cinema 4D, Nomad, Coding - ${t.value.aboutText.progIntermediate}`
  ])
  return { title, line1, line2, line3 }
})

const langBlock = computed(() => {
  const [title, italian, english, spanish] = makeBlock([
    t.value.aboutText.langTitle,
    `${t.value.aboutText.langItalian} - ${t.value.aboutText.langNative}`,
    `${t.value.aboutText.langEnglish} - ${t.value.aboutText.langC1}`,
    `${t.value.aboutText.langSpanish} - ${t.value.aboutText.langB2}`
  ])
  return { title, italian, english, spanish }
})

const photoRef = ref(null)
const revealImgRef = ref(null)
let mousePos = { x: -1000, y: -1000 }
const targetPos = { x: -1000, y: -1000 }
const isHovering = ref(false)
let rafId = null

const lerp = (start, end, factor) => start + (end - start) * factor

const updatePos = () => {
  mousePos.x = lerp(mousePos.x, targetPos.x, 0.15)
  mousePos.y = lerp(mousePos.y, targetPos.y, 0.15)
  
  if (revealImgRef.value) {
    const mask = `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0) 80%)`
    revealImgRef.value.style.maskImage = mask
    revealImgRef.value.style.WebkitMaskImage = mask
  }
  
  rafId = requestAnimationFrame(updatePos)
}

const handleMouseMove = (e) => {
  if (!photoRef.value) return
  
  const rect = photoRef.value.getBoundingClientRect()
  // Divide by 1.5 to account for the scale-[1.5] CSS transform,
  // mapping the screen coordinates perfectly back to the unscaled local coordinate system.
  targetPos.x = (e.clientX - rect.left) / 1.5
  targetPos.y = (e.clientY - rect.top) / 1.5
  
  if (!isHovering.value) {
    // Snap immediately to position on first enter to prevent trailing from across the screen
    mousePos.x = targetPos.x
    mousePos.y = targetPos.y
    isHovering.value = true
  }
}

const handleMouseLeave = () => {
  isHovering.value = false
}

import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  rafId = requestAnimationFrame(updatePos)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

const skills = [
  'JavaScript (ES6+)', 'Vue.js', 'React', 'Tailwind CSS',
  'Node.js', 'UI/UX Design', 'Figma', 'Web Animations',
  'Three.js', 'GSAP',
]

// Inline SVG icon components for socials
const GithubIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' })
])

const LinkedinIcon = () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
])

const EmailIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.8' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])

const socials = [
  { name: 'GitHub',   link: '#',                        icon: GithubIcon   },
  { name: 'LinkedIn', link: '#',                        icon: LinkedinIcon },
  { name: 'Email',    link: 'mailto:hello@juanmerla.com', icon: EmailIcon  },
]
</script>
