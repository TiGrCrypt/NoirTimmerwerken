<script setup>
/**
 * Herbruikbare projectkaart: titel, beschrijving en een fotogrid
 * (3 vierkante + 2 rechthoekige foto's, zoals in het Figma-ontwerp).
 * images verwacht precies 5 paden, maar rendert ook netjes met minder.
 * Klik op een foto opent een fullscreen gallerij (ImageLightbox) die bij
 * die foto begint en waar je verder doorheen kan scrollen/swipen.
 */
import { ref } from 'vue'
import ImageLightbox from './ImageLightbox.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, default: () => [] },
})

const lightboxIndex = ref(null)
</script>

<template>
  <article class="project-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="photo-grid">
      <img
        v-for="(src, i) in images"
        :key="i"
        :src="src"
        :alt="`${title} foto ${i + 1}`"
        @click="lightboxIndex = i"
      />
    </div>

    <Teleport to="body">
      <ImageLightbox
        v-if="lightboxIndex !== null"
        :images="images"
        :alt="title"
        :start-index="lightboxIndex"
        @close="lightboxIndex = null"
      />
    </Teleport>
  </article>
</template>

<style scoped>
.project-card {
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 60rem;
  max-width: 88vw;
  background-color: var(--color-paper);
  color: var(--color-ink);
  border-radius: 1.2rem;
  padding: 4rem 3.6rem;
}

.project-card h3 {
  font-family: var(--font-corsiva);
  font-style: italic;
  font-weight: 500;
  font-size: 4.4rem;
  letter-spacing: 0.06em;
  margin-bottom: 1.6rem;
}

.project-card p {
  font-size: 2rem;
  line-height: 1.7;
  margin-bottom: 2.6rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
}

.photo-grid img {
  width: 100%;
  aspect-ratio: 3 / 5;
  object-fit: cover;
  border-radius: 0.6rem;
  cursor: pointer;
}

.photo-grid img:nth-child(4),
.photo-grid img:nth-child(5) {
  grid-column: span 1;
  aspect-ratio: 4 / 3;
}

@media only screen and (max-width: 600px) {
  .project-card {
    width: 38rem;
    padding: 2.4rem 2rem;
  }
  .project-card h3 {
    font-size: 3rem;
  }
}
</style>
