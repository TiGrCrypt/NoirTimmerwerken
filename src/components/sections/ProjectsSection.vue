<script setup>
import { ref } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  // [{ title, description, images: [] }]
  projects: { type: Array, default: () => [] },
})

const trackEl = ref(null)
const activeIndex = ref(0)
const cardRefs = ref([])

function setCardRef(el, i) {
  if (el) cardRefs.value[i] = el
}

function scrollToIndex(i) {
  cardRefs.value[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  activeIndex.value = i
}

function onScroll() {
  if (!trackEl.value) return
  const trackRect = trackEl.value.getBoundingClientRect()
  const center = trackRect.left + trackRect.width / 2
  let closest = 0
  let closestDist = Infinity
  cardRefs.value.forEach((el, i) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dist = Math.abs(rect.left + rect.width / 2 - center)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })
  activeIndex.value = closest
}
</script>

<template>
  <section class="section-projects">
    <h1 class="title-desktop">Projecten</h1>

    <template v-if="projects.length">
      <div ref="trackEl" class="projects-track" @scroll.passive="onScroll">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.title"
          :ref="(el) => setCardRef(el?.$el ?? el, i)"
          :title="project.title"
          :description="project.description"
          :images="project.images"
        />
      </div>

      <div class="dots" role="tablist" aria-label="Projecten">
        <button
          v-for="(project, i) in projects"
          :key="project.title"
          type="button"
          class="dot"
          :class="{ active: i === activeIndex }"
          :aria-label="`Toon ${project.title}`"
          @click="scrollToIndex(i)"
        />
      </div>
    </template>

    <p v-else class="placeholder">Binnenkort meer projecten.</p>
  </section>
</template>

<style scoped>
.section-projects {
  /* Bewust "height" (i.p.v. min-height) + overflow:hidden: deze sectie
     mag nooit hoger worden dan één schermhoogte, ook niet als de inhoud
     eigenlijk meer ruimte zou willen. */
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  background-color: var(--color-ink);
  color: var(--color-paper);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 3rem;
}

.title-desktop {
  font-family: var(--font-corsiva);
  font-style: italic;
  font-size: 4rem;
  letter-spacing: 0.06em;
}

.placeholder {
  font-size: 2.2rem;
  opacity: 0.7;
}

.projects-track {
  display: flex;
  justify-content: safe center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  min-height: 0;
  padding: 0 3rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 3rem;

  /* Fade aan de zijkanten: kaarten verdwijnen zachtjes in de achtergrond */
  mask-image: linear-gradient(to right, transparent 0, black 8rem, black calc(100% - 8rem), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 8rem, black calc(100% - 8rem), transparent 100%);

  /* Scrollbalk verbergen (blijft wel scrollbaar) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* oude Edge/IE */
}

.projects-track::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.dots {
  display: flex;
  gap: 1rem;
}

.dot {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 1px solid var(--color-paper);
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dot.active {
  background-color: var(--color-paper);
}

@media only screen and (max-width: 600px) {
  .section-projects {
    /* De titel staat weer gewoon aan op mobiel, dus geen harde 1-scherm-cap
       meer (die knelde) — de sectie mag nu meegroeien met de inhoud. */
    height: auto;
    min-height: 100vh;
    min-height: 100svh;
    overflow: visible;
    padding: 3rem 0;
    gap: 2rem;
  }
  .projects-track {
    padding: 0 1.5rem;
    gap: 2rem;
    mask-image: linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0, black 3rem, black calc(100% - 3rem), transparent 100%);
  }
}
</style>
