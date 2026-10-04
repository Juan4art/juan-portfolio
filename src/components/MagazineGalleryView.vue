<template>
  <div class="w-full flex flex-col items-center pb-40 pt-24 md:pt-32">
    
    <!-- Title / Intro removed -->

    <!-- Magazine Grid -->
    <div class="w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 relative z-10">
      
      <div v-for="(magazine, idx) in category.items" :key="idx" 
           class="group flex flex-col items-center cursor-pointer perspective-1000"
           @click="$emit('open-detail', magazine)">
        
        <!-- Book Cover with 3D hover effect -->
        <div class="relative w-full aspect-[3/4] md:aspect-[4/5] shadow-2xl transition-all duration-500 transform-style-3d group-hover:rotate-y-12 group-hover:scale-105">
          <!-- Spine (Side) -->
          <div class="absolute inset-y-0 left-0 w-4 bg-[#111] transform -translate-x-full rotate-y-90 origin-right border-y border-l border-white/10 flex items-center justify-center">
            <span class="text-white/40 font-mono text-[8px] uppercase tracking-widest whitespace-nowrap transform -rotate-90 origin-center translate-y-full">
              {{ magazine.title }}
            </span>
          </div>

          <!-- Front Cover -->
          <div class="absolute inset-0 bg-[#050505] border border-white/10 overflow-hidden transform translate-z-1">
            <template v-if="magazine.cover.endsWith('.mp4') || magazine.cover.endsWith('.webm')">
              <video :src="magazine.cover" class="w-full h-full object-cover filter contrast-110" autoplay loop muted playsinline disablePictureInPicture></video>
            </template>
            <template v-else>
              <img :src="magazine.cover" :alt="magazine.title" class="w-full h-full object-cover filter contrast-110" />
            </template>
            
            <!-- Book Lighting Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/10 pointer-events-none mix-blend-overlay"></div>
            <!-- Spine Crease -->
            <div class="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>

            <!-- Hover Read overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
              <span class="text-white border border-white px-6 py-3 uppercase tracking-widest font-mono text-sm">
                Read / Sfoglia
              </span>
            </div>
          </div>
        </div>

        <!-- Details below -->
        <div class="mt-8 text-center flex flex-col items-center">
          <span class="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase mb-2">
            {{ magazine.tag }}
          </span>
          <h4 class="text-white font-archivo text-xl md:text-2xl uppercase tracking-tighter mb-3">
            {{ magazine.title }}
          </h4>
          <p class="text-white/60 font-varela text-xs md:text-sm leading-relaxed max-w-xs line-clamp-3">
            {{ magazine.desc }}
          </p>
        </div>
      </div>
      
    </div>



  </div>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['open-detail'])
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.rotate-y-12 {
  transform: rotateY(12deg);
}
.rotate-y-90 {
  transform: rotateY(90deg);
}
.translate-z-1 {
  transform: translateZ(1px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
