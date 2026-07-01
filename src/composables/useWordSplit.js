/**
 * Splits an array of strings into word objects [{w, i}]
 * where `i` is a continuous index across all strings in the block.
 * Used to drive the .word-hl stagger CSS variable --i.
 */
export const makeBlock = (strings) => {
  let i = 0
  return strings.map(str =>
    (str || '').split(/\s+/).filter(Boolean).map(w => ({ w, i: i++ }))
  )
}

/**
 * Splits a single string into word objects, starting from `start`.
 * Useful inside v-for templates where each card is independent.
 */
export const splitWords = (text, start = 0) => {
  let i = start
  return (text || '').split(/\s+/).filter(Boolean).map(w => ({ w, i: i++ }))
}

/**
 * Splits title + body into a combined block so the --i counter
 * is shared and the stagger wave flows from title into body.
 */
export const splitBlock = (title, body) => {
  let i = 0
  const t = (title || '').split(/\s+/).filter(Boolean).map(w => ({ w, i: i++ }))
  const b = (body  || '').split(/\s+/).filter(Boolean).map(w => ({ w, i: i++ }))
  return { title: t, body: b }
}
