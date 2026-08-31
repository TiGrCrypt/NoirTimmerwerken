import { ref, onMounted, onBeforeUnmount, toValue } from 'vue'

/**
 * Herbruikbare scroll-spy: bepaalt welke sectie zich net "achter" een
 * vast punt (bv. de hoogte van een sticky header) bevindt, zodat je
 * bijvoorbeeld de kleur van een sticky nav kunt laten meebewegen met
 * de sectie waar de gebruiker net overheen scrolt.
 *
 * @param {import('vue').Ref<Array<{ id: string, theme: 'light'|'dark', el: HTMLElement|null }>>} sections
 * @param {number|import('vue').Ref<number>|(() => number)} offsetPx - denkbeeldige lijn (in px vanaf de top van het scherm) die bepaalt welke sectie "actief" is (mag ook reactief zijn, bv. als de headerhoogte per breakpoint verschilt)
 * @returns {{ activeTheme: import('vue').Ref<string> }}
 */
export function useScrollSpy(sections, offsetPx = 0) {
  const activeTheme = ref(sections.value[0]?.theme ?? 'light')
  let ticking = false

  function update() {
    ticking = false
    const offset = toValue(offsetPx)
    const entries = sections.value
    let current = entries[0]
    for (const entry of entries) {
      if (!entry.el) continue
      const top = entry.el.getBoundingClientRect().top
      if (top <= offset) {
        current = entry
      } else {
        break
      }
    }
    if (current) activeTheme.value = current.theme
  }

  function onScroll() {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { activeTheme }
}
