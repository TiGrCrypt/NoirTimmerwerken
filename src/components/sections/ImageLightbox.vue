<script setup>
/**
 * Fullscreen foto-gallerij (lightbox). Open 'm op een gegeven start-index;
 * daarna kun je horizontaal scrollen/swipen door alle foto's, net als een
 * native foto-app (en op desktop ook met de pijltjesknoppen of de
 * pijltjestoetsen). Sluit via het kruisje, de achtergrond, of Escape.
 */
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  alt: { type: String, default: '' },
  startIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['close'])

const trackEl = ref(null)
const activeIndex = ref(props.startIndex)

function scrollToStart() {
  const el = trackEl.value?.children?.[props.startIndex]
  el?.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' })
  activeIndex.value = props.startIndex
}

function onScroll() {
  if (!trackEl.value) return
  const trackRect = trackEl.value.getBoundingClientRect()
  const center = trackRect.left + trackRect.width / 2
  let closest = 0
  let closestDist = Infinity
  Array.from(trackEl.value.children).forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const dist = Math.abs(rect.left + rect.width / 2 - center)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })
  activeIndex.value = closest
}

function goTo(i) {
  const clamped = Math.max(0, Math.min(i, props.images.length - 1))
  trackEl.value?.children?.[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  activeIndex.value = clamped
}

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight') goTo(activeIndex.value + 1)
  if (event.key === 'ArrowLeft') goTo(activeIndex.value - 1)
}

// Lichaam niet laten meescrollen zolang de gallerij open staat, en
// meteen naar de aangeklikte foto springen (zonder animatie, want de
// gallerij toont pas net op).
onMounted(async () => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  await nextTick()
  scrollToStart()
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="lightbox" @click.self="emit('close')">
    <button type="button" class="lightbox-close" aria-label="Sluiten" @click="emit('close')">
      &times;
    </button>

    <button
      v-if="images.length > 1 && activeIndex > 0"
      type="button"
      class="lightbox-arrow lightbox-arrow--prev"
      aria-label="Vorige foto"
      @click="goTo(activeIndex - 1)"
    >
      &#10094;
    </button>
    <button
      v-if="images.length > 1 && activeIndex < images.length - 1"
      type="button"
      class="lightbox-arrow lightbox-arrow--next"
      aria-label="Volgende foto"
      @click="goTo(activeIndex + 1)"
    >
      &#10095;
    </button>

    <div ref="trackEl" class="lightbox-track" @scroll.passive="onScroll">
      <div v-for="(src, i) in images" :key="i" class="lightbox-slide">
        <img :src="src" :alt="`${alt} foto ${i + 1}`" />
      </div>
    </div>

    <div v-if="images.length > 1" class="lightbox-dots">
      <span v-for="(src, i) in images" :key="i" class="lightbox-dot" :class="{ active: i === activeIndex }" />
    </div>
  </div>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.12);
  color: var(--color-paper);
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-track {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.lightbox-track::-webkit-scrollbar {
  display: none;
}

.lightbox-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
}

.lightbox-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.6rem;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.12);
  color: var(--color-paper);
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.lightbox-arrow:hover {
  background-color: rgba(255, 255, 255, 0.22);
}

.lightbox-arrow--prev {
  left: 2rem;
}

.lightbox-arrow--next {
  right: 2rem;
}

.lightbox-dots {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.lightbox-dot {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 1px solid var(--color-paper);
  background: transparent;
}

.lightbox-dot.active {
  background-color: var(--color-paper);
}

@media only screen and (max-width: 600px) {
  .lightbox-slide {
    padding: 8rem 1.5rem;
  }
  .lightbox-close {
    top: 1.2rem;
    right: 1.2rem;
    width: 4rem;
    height: 4rem;
    font-size: 2.6rem;
  }
  /* Op mobiel swipe je gewoon door de foto's; de pijlen zijn dan overbodig. */
  .lightbox-arrow {
    display: none;
  }
}
</style>
