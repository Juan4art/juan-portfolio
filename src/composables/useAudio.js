import { ref } from 'vue'

const isPlaying = ref(false)
const tracks = ref([
  { title: 'MY LOVE SONG', artist: 'Noyz Narcos', genre: 'Rap Italiano', duration: '3:10', videoId: 'xu4B37Au0aE' },
  { title: 'Complicated', artist: 'Avril Lavigne', genre: 'Pop Punk', duration: '4:12', videoId: '5NPBIwQyPWE' },
  { title: 'Baby One More Time', artist: 'Britney Spears', genre: 'Pop', duration: '3:30', videoId: 'nbmVTIYkbOo' },
  { title: 'Amélie m\'a dit', artist: 'Alizée', genre: 'Pop', duration: '3:51', videoId: 'JJ6clbNFCJM' },
  { title: 'WOKE UP', artist: 'XG', genre: 'Hip-Hop', duration: '3:24', videoId: '5sT20edl02I' },
  { title: 'Fuyu no hanashi', artist: 'Given', genre: 'Anime', duration: '3:40', videoId: '48jOu3tTXbo' }
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
