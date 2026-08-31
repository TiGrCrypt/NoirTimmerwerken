import { ref, onMounted, onBeforeUnmount, watch, toValue } from 'vue'

/**
 * Herbruikbare "sticky nav on scroll" logica.
 * Observeert een element (meestal de hero-sectie) en levert een
 * boolean terug die aangeeft of de sticky/donkere nav-variant
 * getoond moet worden (d.w.z. zodra dat element niet meer zichtbaar is).
 *
 * De observer krijgt een negatieve top-rootMargin ter grootte van de
 * sticky-balk zelf. Zonder dat "triggert" hij pas zodra de Home-sectie
 * VOLLEDIG uit beeld is — maar als je via de navigatiebalk direct naar
 * Projecten springt, land je precies op een punt waar er nog een klein
 * randje van Home (bv. de testimonial-tekst) zichtbaar is, terwijl de
 * sticky balk dat randje juist zou moeten afdekken. Door de balkhoogte
 * als marge te gebruiken, wordt Home al als "weg" beschouwd zodra er nog
 * precies balkhoogte-aan-Home over is — dus verschijnt de sticky balk
 * op tijd om dat randje te bedekken, in plaats van een fractie te laat.
 *
 * @param {import('vue').Ref<HTMLElement|null>} targetRef - element om te observeren
 * @param {number|import('vue').Ref<number>|(() => number)} [stickyBarHeightPx] - hoogte van de sticky balk (mag reactief zijn, ivm mobiel breakpoint)
 * @param {IntersectionObserverInit} options
 * @returns {{ isSticky: import('vue').Ref<boolean> }}
 */
export function useStickyNav(targetRef, stickyBarHeightPx = 0, options = {}) {
  const isSticky = ref(false)
  let observer = null

  function setup() {
    observer?.disconnect()
    if (!targetRef.value) return

    const margin = toValue(stickyBarHeightPx)

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSticky.value = !entry.isIntersecting
        })
      },
      {
        root: null,
        rootMargin: `-${margin}px 0px 0px 0px`,
        threshold: 0,
        ...options,
      }
    )

    observer.observe(targetRef.value)
  }

  onMounted(setup)

  // Herbouw de observer als de balkhoogte verandert (bv. bij het
  // oversteken van de mobiele breakpoint), zodat de marge klopt.
  watch(() => toValue(stickyBarHeightPx), setup)

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isSticky }
}
