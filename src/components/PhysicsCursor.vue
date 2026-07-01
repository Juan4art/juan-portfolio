<template>
  <div 
    v-if="!isMobile"
    ref="cursorRef"
    class="physics-cursor" 
    :class="{ 'is-hidden': isHidden }"
  >
    <!-- Solid black physics pointer -->
    <div class="cursor-solid"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref(null)

// Physics internal state (non-reactive for performance)
let x = window.innerWidth / 2
let y = window.innerHeight / 2
let angle = 0
let scaleX = 1
let scaleY = 1

const isHidden = ref(true)
const isMobile = ref(false)

let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let raf = null

const onMouseMove = (e) => {
  isHidden.value = false
  target.x = e.clientX
  target.y = e.clientY
}

const onMouseOver = (e) => {
  // No longer tracking hover state to ensure physics are always applied
}

const updatePhysics = () => {
  // Spring tension / Lerp factor (higher = less delay, tracks closer to mouse)
  const speed = 0.35

  const dx = target.x - current.x
  const dy = target.y - current.y
  
  // Calculate instantaneous velocity
  const vx = dx * speed
  const vy = dy * speed
  
  current.x += vx
  current.y += vy
  
  // Update internal properties (center the cursor by subtracting half its size: 16px)
  x = current.x - 16
  y = current.y - 16

  const velocitySq = vx * vx + vy * vy
  const velocity = Math.sqrt(velocitySq)

  // Calculate movement angle
  if (velocity > 0.1) {
    angle = Math.atan2(vy, vx) * (180 / Math.PI)
  }

  // Deform circle based on velocity (stretches along movement axis)
  // Stronger stretch multipliers for a more visible effect
  const stretch = Math.min(1 + velocity * 0.08, 3.5)
  const squish = Math.max(1 - velocity * 0.04, 0.25)
  
  // Smoothly apply stretch/squish (faster lerp here too)
  scaleX += (stretch - scaleX) * 0.3
  scaleY += (squish - scaleY) * 0.3

  // Apply directly to DOM to bypass Vue reactivity overhead
  if (cursorRef.value) {
    cursorRef.value.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scaleX(${scaleX}) scaleY(${scaleY})`
  }

  if (!isMobile.value) {
    raf = requestAnimationFrame(updatePhysics)
  }
}

const handleResize = () => {
  const checkMobile = window.innerWidth < 768
  if (checkMobile !== isMobile.value) {
    isMobile.value = checkMobile
    if (isMobile.value) {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = null
      }
    } else {
      if (!raf) {
        raf = requestAnimationFrame(updatePhysics)
      }
    }
  }
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseover', onMouseOver, { passive: true })
  
  // Also detect if mouse leaves window to hide cursor
  document.documentElement.addEventListener('mouseleave', () => isHidden.value = true)
  document.documentElement.addEventListener('mouseenter', () => isHidden.value = false)
  
  if (!isMobile.value) {
    raf = requestAnimationFrame(updatePhysics)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style scoped>
.physics-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 99999;
  transform-origin: center center;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.physics-cursor.is-hidden {
  opacity: 0;
}

/* The solid pointer */
.cursor-solid {
  width: 14px;
  height: 14px;
  background-color: #000000;
  border: 2px solid white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.2), background-color 0.3s ease;
}

/* Hover State Modifications */
/* The user requested to NOT change the pointer when showing categories */
/* .physics-cursor.is-hovering .cursor-solid {
  transform: scale(3.5);
  background-color: rgba(0, 0, 0, 0.08);
} */

/* Disable default cursor everywhere except for desktop, mobile doesn't matter */
@media (pointer: fine) {
  :global(*), :global(a), :global(button) {
    cursor: none !important;
  }
}
</style>
