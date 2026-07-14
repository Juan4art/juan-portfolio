<template>
  <div class="w-full flex flex-col gap-6 md:gap-12 pb-32">
    <!-- List of horizontal rectangular projects -->
    <div 
      v-for="(item, idx) in displayItems" 
      :key="idx"
      class="relative w-full h-[35vh] md:h-[50vh] min-h-[300px] overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30 transition-colors duration-500"
      @click="openDetail(idx)"
    >
      <!-- Background Image -->
      <div class="absolute inset-0 bg-black">
        <img 
          :src="item.cover || item.gallery?.[0]" 
          :alt="item.title"
          class="w-full h-full object-cover opacity-60 filter grayscale-[50%] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      <!-- Gradient Overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>

      <!-- Scratched/Dusty Texture Overlay -->
      <div class="absolute inset-0 bg-dusty-scratch opacity-20 pointer-events-none mix-blend-screen"></div>

      <!-- Text Content -->
      <div class="absolute inset-0 p-6 md:p-12 flex flex-col justify-end pointer-events-none z-10">
        <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col">
          <div class="flex flex-wrap gap-2 mb-3 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             <span class="bg-[#d1ff00] text-black px-3 py-1 text-[10px] md:text-xs font-black tracking-widest uppercase">
               {{ item.tag }}
             </span>
             <span class="border border-white/30 text-white px-3 py-1 text-[10px] md:text-xs font-black tracking-widest uppercase backdrop-blur-sm">
               {{ String(idx + 1).padStart(2, '0') }} / {{ String(displayItems.length).padStart(2, '0') }}
             </span>
          </div>

          <h2 class="font-archivo text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-none mb-2 md:mb-4 drop-shadow-2xl group-hover:text-[#d1ff00] transition-colors duration-300">
            {{ item.title }}
          </h2>
          
          <p class="font-varela text-sm md:text-base text-white/80 max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 drop-shadow-md">
            {{ item.tagline || item.desc }}
          </p>
        </div>
      </div>
    </div>
    <!-- Grid Modal Overlay -->
    <transition name="modal-scale">
      <div 
        v-if="isModalOpen && activeCard" 
        class="fixed inset-0 z-[9999] flex flex-col p-6 md:p-12 bg-[#050505] overflow-y-auto custom-scrollbar"
        @click.self="isModalOpen = false"
      >
        <div class="modal-content flex flex-col flex-1 max-w-[1600px] mx-auto w-full" @click.self="isModalOpen = false">
          <!-- Modal Header -->
          <div class="flex justify-between items-center mb-6 shrink-0" @click.self="isModalOpen = false">
            <h2 class="text-white font-archivo text-3xl md:text-5xl uppercase tracking-tighter pointer-events-none">{{ activeCard.title }}</h2>
            <button @click="isModalOpen = false" class="text-white/60 hover:text-[#e4ef39] transition-transform duration-300 hover:rotate-90 hover:scale-110 focus:outline-none">
              <svg class="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Description / Explanatory text -->
          <div v-if="activeCard.desc" class="mb-10 max-w-4xl" @click.self="isModalOpen = false">
            <p class="text-white/80 font-varela text-base md:text-lg leading-relaxed whitespace-pre-wrap">{{ activeCard.desc }}</p>
          </div>

          <!-- Grid Layout -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-20" @click.self="isModalOpen = false">
            <div 
              v-for="(img, idx) in activeCard.gallery" 
              :key="idx" 
              class="w-full bg-gray-900 border-2 border-black overflow-hidden relative group aspect-auto sm:aspect-square md:aspect-[4/5] shadow-[4px_4px_0px_rgba(0,0,0,1)] modal-grid-item cursor-zoom-in"
              :style="{ transitionDelay: isModalOpen ? `${0.15 + (idx * 0.08)}s` : '0s' }"
              @click="$emit('open-detail', { project: activeCard, initialSlide: idx })"
            >
              <img :src="img" :alt="cat?.title || 'Project Image'" class="w-full h-auto sm:h-full object-contain sm:object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700 block" />
            </div>
          </div>
          
          <!-- Lightbox removed in favor of CategoryView full-screen Swiper -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-detail'])

// Make sure we have some items to display (fallback to empty array)
const displayItems = computed(() => props.category?.items || [])

const isModalOpen = ref(false)
const activeCard = ref(null)

watch(isModalOpen, (isOpen) => {
  if (isOpen) {
    window.dispatchEvent(new Event('modal-open'))
  } else {
    window.dispatchEvent(new Event('modal-close'))
  }
})

const openDetail = (index) => {
  const item = displayItems.value[index]
  if (!item) return
  
  activeCard.value = {
    ...item,
    gallery: item.gallery || [item.cover]
  }
  isModalOpen.value = true
}
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

/* Modal Scale Animation */
.modal-scale-enter-active {
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-scale-leave-active {
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
}

.modal-scale-enter-active .modal-content {
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.05s;
  will-change: transform, opacity;
}
.modal-scale-leave-active .modal-content {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
  transform: scale(0.95);
}

.modal-grid-item:nth-child(2) { transition-delay: 0.1s; }
.modal-grid-item:nth-child(3) { transition-delay: 0.15s; }
.modal-grid-item:nth-child(4) { transition-delay: 0.2s; }
.modal-grid-item:nth-child(5) { transition-delay: 0.25s; }
.modal-grid-item:nth-child(6) { transition-delay: 0.3s; }
.modal-grid-item:nth-child(7) { transition-delay: 0.35s; }
.modal-grid-item:nth-child(8) { transition-delay: 0.4s; }



.modal-scale-enter-active .modal-grid-item {
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.modal-scale-leave-active .modal-grid-item {
  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
}

.modal-scale-enter-from .modal-content {
  opacity: 0;
  transform: translateY(20px);
}
.modal-scale-leave-to .modal-content {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-scale-enter-from .modal-grid-item {
  opacity: 0;
  transform: translateY(80px) scale(0.85);
}
.modal-scale-leave-to .modal-grid-item {
  opacity: 0;
  transform: scale(0.95);
}
</style>
