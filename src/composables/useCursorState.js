import { reactive } from 'vue'

export const cursorState = reactive({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
})
