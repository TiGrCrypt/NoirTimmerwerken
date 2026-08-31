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
// Op mobiel wordt de tekst afgekapt (line-clamp); deze knop laat je 'm
// alsnog volledig lezen. Op desktop wordt niets afgekapt, dus daar blijft
// de knop via CSS verborgen.
const expanded = ref(false)
</script>

<template>
  <article class="project-card">
    <p :class="{ expanded }">{{ description }}</p>
    <button type="button" class="read-more" @click="expanded = !expanded">
      {{ expanded ? 'Lees minder' : 'Lees meer' }}
    </button>
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

/* Alleen relevant op mobiel (zie media query) — op desktop wordt de
   tekst nooit afgekapt, dus is er niets om uit te klappen. */
.read-more {
  display: none;
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
    padding: 2.2rem 2rem;
  }
  /* Weer meer regels tekst nu de sectie kan meegroeien i.p.v. vastzitten
     op 1 schermhoogte — en met een "Lees meer"-knop kun je de rest
     alsnog lezen in plaats van dat hij gewoon afgekapt blijft. */
  .project-card p {
    font-size: 1.7rem;
    line-height: 1.6;
    margin-bottom: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .project-card p.expanded {
    -webkit-line-clamp: unset;
    overflow: visible;
  }
  .read-more {
    display: block;
    background: none;
    border: none;
    padding: 0;
    margin-bottom: 2rem;
    font-family: var(--font-corsiva);
    font-style: italic;
    font-size: 1.5rem;
    text-decoration: underline;
    color: var(--color-ink);
    cursor: pointer;
  }
  /* Foto's blijven vierkant op mobiel (ook de 4e/5e, die op desktop
     breder/lager zijn) — compacter en rustiger in de 2 rijen. */
  .photo-grid img,
  .photo-grid img:nth-child(4),
  .photo-grid img:nth-child(5) {
    aspect-ratio: 1 / 1;
  }
}
</style>
