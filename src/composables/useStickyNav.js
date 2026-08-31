import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Herbruikbare "sticky nav on scroll" logica.
 * Observeert een element (meestal de hero-sectie) en levert een
 * boolean terug die aangeeft of de sticky/donkere nav-variant
 * getoond moet worden (d.w.z. zodra dat element niet meer zichtbaar is).
 *
 * @param {import('vue').Ref<HTMLElement|null>} targetRef - element om te observeren
 * @param {IntersectionObserverInit} options
 * @returns {{ isSticky: import('vue').Ref<boolean> }}
 */
export function useStickyNav(targetRef, options = {}) {
  const isSticky = ref(false)
  let observer = null

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSticky.value = !entry.isIntersecting
        })
      },
      {
        root: null,
        rootMargin: '-10px',
        threshold: 0,
        ...options,
      }
    )

    observer.observe(targetRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isSticky }
}
