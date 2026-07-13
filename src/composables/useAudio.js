import { ref } from 'vue'

const isPlaying = ref(false)
const tracks = ref([
  { title: 'Daechwita', artist: 'Agust D (Suga)', genre: 'K-Rap', duration: '3:45', videoId: '65XIZDJ24_s' },
  { title: 'God\'s Menu', artist: 'Stray Kids', genre: 'K-Pop/Urban', duration: '3:06', videoId: 'TQTlCHxyuu8' },
  { title: 'Praise The Lord (Da Shine)', artist: 'A$AP Rocky', genre: 'Hip-Hop', duration: '3:28', videoId: '_eDpH4hMW1o' },
  { title: 'MY LOVE SONG 2 (Feat. Coez, Frah Quintale)', artist: 'Salmo & Noyz Narcos', genre: 'Rap Italiano', duration: '3:12', videoId: 'w6sYc-ZZQ6c' },
  { title: 'Brivido', artist: 'Marracash & Guè', genre: 'Rap Italiano', duration: '3:48', videoId: 'QHD5ScEAmFI' },
  { title: 'La Canzone Nostra', artist: 'Mace, Blanco, Salmo', genre: 'Rap Italiano', duration: '3:57', videoId: 'XE6lV6xseQ4' },
  { title: 'Dark Light', artist: 'Night Lovell', genre: 'Dark Trap', duration: '3:03', videoId: 'HTp5PH8ot6Q' },
  { title: 'Space Cadet ft. Gunna', artist: 'Metro Boomin', genre: 'Hip-Hop', duration: '3:23', videoId: 'qBWhc4qbsjo' },
  { title: 'My Love Song', artist: 'Noyz Narcos', genre: 'Rap Italiano', duration: '3:10', videoId: '-ynZN3p6FH8' }
])
const currentTrackIndex = ref(0)
const currentTrack = ref(tracks.value[0])

let ytPlayer = null
let isApiLoaded = false
let isPlayerReady = false

const initYouTubeAPI = () => {
  if (typeof window === 'undefined') return

  if (!document.getElementById('youtube-api-script')) {
    const tag = document.createElement('script')
    tag.id = 'youtube-api-script'
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  // Handle YouTube API readiness
  window.onYouTubeIframeAPIReady = () => {
    isApiLoaded = true
    ytPlayer = new window.YT.Player('youtube-player-container', {
      height: '1',
      width: '1',
      videoId: tracks.value[0].videoId,
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'showinfo': 0,
        'rel': 0,
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }
}

const onPlayerReady = (event) => {
  isPlayerReady = true
}

const onPlayerStateChange = (event) => {
  if (typeof window === 'undefined' || !window.YT) return
  if (event.data === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true
  } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
    isPlaying.value = false
  }

  if (event.data === window.YT.PlayerState.ENDED) {
    next()
  }
}

const togglePlay = () => {
  if (!isPlayerReady || !ytPlayer) {
    console.warn("YouTube player not ready yet")
    return
  }
  if (isPlaying.value) {
    ytPlayer.pauseVideo()
  } else {
    ytPlayer.playVideo()
  }
}

const playTrack = (index) => {
  if (index >= 0 && index < tracks.value.length) {
    currentTrackIndex.value = index
    currentTrack.value = tracks.value[index]
    if (isPlayerReady && ytPlayer) {
      ytPlayer.loadVideoById(currentTrack.value.videoId)
      ytPlayer.playVideo()
    }
  }
}

const next = () => {
  const nextIndex = (currentTrackIndex.value + 1) % tracks.value.length
  playTrack(nextIndex)
}

const prev = () => {
  const prevIndex = (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length
  playTrack(prevIndex)
}

if (typeof window !== 'undefined' && !document.getElementById('youtube-api-script')) {
  initYouTubeAPI()
}

export const useAudio = () => {
  return {
    isPlaying,
    tracks,
    currentTrack,
    currentTrackIndex,
    togglePlay,
    playTrack,
    next,
    prev
  }
}
