<script setup>
/**
 * Herbruikbare projectkaart: beschrijving en een fotogrid (3 vierkante +
 * 2 rechthoekige foto's, zoals in het Figma-ontwerp). images verwacht
 * precies 5 paden, maar rendert ook netjes met minder.
 * Klik op een foto opent een fullscreen gallerij (ImageLightbox) die bij
 * die foto begint en waar je verder doorheen kan scrollen/swipen.
 *
 * Geen zichtbare titel (meer): zodra de projecten straks rechtstreeks uit
 * Instagram komen, is er toch geen aparte titel per post beschikbaar om te
 * tonen. `title` blijft wel als prop bestaan, puur voor de alt-teksten van
 * de foto's.
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
    width: 34rem;
    padding: 1.8rem 1.6rem;
  }
  /* Beschrijving inkorten met "..." i.p.v. de volledige tekst — scheelt
     flink wat hoogte, de volledige tekst blijft nergens anders nodig. */
  .project-card p {
    font-size: 1.6rem;
    line-height: 1.5;
    margin-bottom: 1.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  /* Compacter fotogrid: vierkant i.p.v. hoog-rechthoekig, en de 4e/5e
     foto (2e rij) verbergen we in de preview — die blijven gewoon
     bereikbaar via de fullscreen-gallerij (klik op een foto). */
  .photo-grid img {
    aspect-ratio: 1 / 1;
  }
  .photo-grid img:nth-child(4),
  .photo-grid img:nth-child(5) {
    display: none;
  }
}
</style>
