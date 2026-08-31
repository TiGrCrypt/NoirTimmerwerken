import { ref, onMounted, onBeforeUnmount, toValue } from 'vue'

/**
 * Herbruikbare scroll-spy: bepaalt welke sectie zich net "achter" een
 * vast punt bevindt, zodat je bijvoorbeeld de kleur van een sticky nav
 * kunt laten meebewegen met de sectie waar de gebruiker net overheen
 * scrolt.
 *
 * Belangrijk: dit "vaste punt" is per sectie NIET zomaar de headerhoogte
 * — het moet exact hetzelfde punt zijn als waar de browser (en
 * useAnchorScroll.js) een sectie ook daadwerkelijk laat "landen" bij een
 * nav-klik, anders wisselt de kleur van de balk op een ander moment dan
 * waar je scroll-navigatie je naartoe brengt. Dat landingspunt wordt al
 * bepaald door CSS `scroll-margin-top` op elke `.section-anchor` (met
 * uitzonderingen voor #home en #contact, zie App.vue). Door hier per
 * sectie live `getComputedStyle(el).scrollMarginTop` te lezen i.p.v. een
 * los, hardgecodeerde JS-getal, kunnen scroll-landing en kleurwissel
 * nooit meer uit sync raken.
 *
 * @param {import('vue').Ref<Array<{ id: string, theme: 'light'|'dark', el: HTMLElement|null }>>} sections
 * @param {number|import('vue').Ref<number>|(() => number)} fallbackOffsetPx - reservewaarde (in px) voor als scroll-margin-top om wat voor reden niet uit te lezen is
 * @returns {{ activeTheme: import('vue').Ref<string> }}
 */
export function useScrollSpy(sections, fallbackOffsetPx = 0) {
  const activeTheme = ref(sections.value[0]?.theme ?? 'light')
  let ticking = false

  function marginFor(el) {
    const raw = getComputedStyle(el).scrollMarginTop
    const px = parseFloat(raw)
    return Number.isFinite(px) ? px : toValue(fallbackOffsetPx)
  }

  function update() {
    ticking = false
    const entries = sections.value
    let current = entries[0]
    for (const entry of entries) {
      if (!entry.el) continue
      const offset = marginFor(entry.el)
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
