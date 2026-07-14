<template>
  <section class="min-h-screen bg-[#050505] pt-28 pb-24 px-6 md:px-12 flex flex-col items-center overflow-x-hidden">

    <!-- ── Header ──────────────────────────────────── -->
    <div class="w-full max-w-5xl animate-fade-up" style="animation-delay:0.05s;opacity:0">

      <!-- Big stamp title -->
      <div class="flex items-end gap-6 mb-2">
        <h1 class="font-archivo text-[16vw] md:text-[10rem] uppercase tracking-tighter leading-none text-white select-none">
          PLAYLIST
        </h1>
        <!-- Spinning cassette -->
        <div class="hidden md:flex mb-6 shrink-0">
          <div class="cassette" :class="{ spinning: isPlaying }">
            <svg viewBox="0 0 80 52" width="100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="78" height="50" rx="5" stroke="white" stroke-width="1.5" fill="#111"/>
              <rect x="8" y="8" width="64" height="36" rx="3" stroke="white" stroke-width="1" fill="#0a0a0a"/>
              <circle cx="23" cy="26" r="8" stroke="white" stroke-width="1.2" fill="#111"/>
              <circle cx="23" cy="26" r="3" fill="white" opacity="0.6"/>
              <circle cx="57" cy="26" r="8" stroke="white" stroke-width="1.2" fill="#111"/>
              <circle cx="57" cy="26" r="3" fill="white" opacity="0.6"/>
              <rect x="30" y="20" width="20" height="12" rx="2" stroke="white" stroke-width="1" fill="#1a1a1a"/>
              <line x1="34" y1="26" x2="46" y2="26" stroke="#FF6500" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>

      <p class="text-white/40 font-varela text-sm tracking-widest uppercase mb-12">
        {{ currentTrackCount }} {{ lang === 'it' ? 'brani selezionati' : 'curated tracks' }}
      </p>
    </div>

    <!-- ── Now Playing Graphic ─────────────────────────────── -->
    <div class="w-full max-w-5xl mb-12 animate-fade-up" style="animation-delay:0.12s;opacity:0">
      <div class="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] min-h-[300px] md:min-h-[400px] flex items-center justify-center group">
        
        <!-- Blurred background cover -->
        <div class="absolute inset-0 z-0">
          <img :src="`https://img.youtube.com/vi/${currentTrack.videoId}/mqdefault.jpg`" :alt="currentTrack.title" 
               class="w-full h-full object-cover scale-150 blur-3xl opacity-20 transition-all duration-700" 
               :class="isPlaying ? 'scale-[1.6] opacity-40' : ''" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-16 w-full">
          <!-- Spinning Vinyl / Cover -->
          <div class="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full border border-white/10 shadow-2xl overflow-hidden [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
               :class="isPlaying ? 'animate-spin-slow' : ''" style="animation-duration: 8s;">
            <!-- Vinyl grooves -->
            <div class="absolute inset-0 rounded-full border-[10px] border-[#050505]/80 z-20 pointer-events-none"></div>
            <div class="absolute inset-0 rounded-full border-[24px] border-[#0a0a0a]/50 z-20 pointer-events-none"></div>
            <div class="absolute inset-0 rounded-full border-[48px] border-[#111]/30 z-20 pointer-events-none"></div>
            <div class="absolute inset-0 rounded-full border-[72px] border-white/5 z-20 pointer-events-none"></div>
            <!-- Center hole -->
            <div class="absolute inset-0 m-auto w-4 h-4 bg-[#050505] rounded-full z-30 shadow-inner"></div>
            <img :src="`https://img.youtube.com/vi/${currentTrack.videoId}/mqdefault.jpg`" :alt="currentTrack.title" 
                 class="w-full h-full object-cover scale-[1.35] transition-transform duration-700" />
          </div>

          <!-- Info -->
          <div class="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <span class="text-[#FF6500] font-mono text-xs tracking-[0.2em] uppercase mb-4 px-4 py-1.5 border border-[#FF6500]/30 rounded-full bg-[#FF6500]/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,101,0,0.2)]">
              {{ isPlaying ? 'Now Playing' : 'Paused' }}
            </span>
            <h2 class="text-white font-archivo text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-4">
              {{ currentTrack.title }}
            </h2>
            <p class="text-white/60 font-varela text-lg md:text-2xl tracking-wide mb-8">
              {{ currentTrack.artist }}
            </p>
            
            <!-- Audio visualizer bars -->
            <div class="flex items-end gap-1.5 h-10 transition-opacity duration-300" :class="isPlaying ? 'opacity-80' : 'opacity-30'">
              <div v-for="n in 16" :key="n" 
                   class="w-1.5 bg-white/80 rounded-t-sm origin-bottom"
                   :class="isPlaying ? 'animate-bar' : ''"
                   :style="isPlaying ? `animation-delay: -${n * 0.15}s; animation-duration: ${0.6 + (n % 3) * 0.2}s` : 'transform: scaleY(0.2)'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Track List ───────────────────────────────── -->
    <div class="w-full max-w-5xl animate-fade-up" style="animation-delay:0.2s;opacity:0">
      <div class="border-t border-white/10 mb-1"/>

      <div
        v-for="(track, i) in tracks"
        :key="i"
        @click="playTrack(i)"
        :class="['track-row group flex items-center gap-4 md:gap-6 py-4 border-b cursor-pointer transition-all duration-200 px-2 rounded-lg', i === currentTrackIndex ? 'border-[#FF6500]/40 bg-white/[0.02]' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]']"
        :style="`animation-delay: ${0.22 + i * 0.04}s`"
      >
        <!-- Index -->
        <span class="w-6 text-right font-mono text-xs shrink-0 transition-colors"
              :class="i === currentTrackIndex ? 'text-[#FF6500]' : 'text-white/20 group-hover:text-[#FF6500]'">
          {{ String(i + 1).padStart(2, '0') }}
        </span>

        <!-- Artwork placeholder -->
        <div class="w-10 h-10 md:w-12 md:h-12 rounded-md shrink-0 overflow-hidden bg-white/5 border flex items-center justify-center transition-colors [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
             :class="i === currentTrackIndex ? 'border-[#FF6500]/40' : 'border-white/10 group-hover:border-[#FF6500]/40'">
          <img :src="`https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg`" :alt="track.title" class="w-full h-full object-cover scale-[1.35]" />
        </div>

        <!-- Title & Artist -->
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm md:text-base truncate leading-tight transition-colors"
             :class="i === currentTrackIndex ? 'text-[#FF6500]' : 'text-white group-hover:text-[#FF6500]'">
            {{ track.title }}
          </p>
          <p class="text-white/40 text-xs md:text-sm truncate font-varela">
            {{ track.artist }}
          </p>
        </div>

        <!-- Genre tag -->
        <span class="hidden md:inline text-[10px] tracking-widest uppercase font-semibold border px-2 py-0.5 rounded-full shrink-0 transition-colors"
              :class="i === currentTrackIndex ? 'border-[#FF6500]/40 text-[#FF6500]/60' : 'text-white/30 border-white/10 group-hover:border-[#FF6500]/40 group-hover:text-[#FF6500]/60'">
          {{ track.genre }}
        </span>

        <!-- Duration -->
        <span class="text-white/30 font-mono text-xs shrink-0">
          {{ track.duration }}
        </span>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../../composables/useLang.js'
import { useAudio } from '../../composables/useAudio.js'

const { lang } = useLang()
const { isPlaying, tracks, playTrack, currentTrackIndex, currentTrack } = useAudio()

// ─────────────────────────────────────────────────────────────
// TRACKS — managed in useAudio.js
// ─────────────────────────────────────────────────────────────

const currentTrackCount = computed(() => tracks.value.length)
</script>

<style scoped>
.cassette {
  will-change: transform;
}
.cassette.spinning circle:nth-child(3),
.cassette.spinning circle:nth-child(6) {
  animation: spool 0.6s linear infinite;
}
@keyframes spool {
  from { transform-origin: center; transform: rotate(0deg); }
  to   { transform-origin: center; transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-bar {
  animation: bar-bounce 0.8s ease-in-out infinite alternate;
}
@keyframes bar-bounce {
  0% { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}
</style>
