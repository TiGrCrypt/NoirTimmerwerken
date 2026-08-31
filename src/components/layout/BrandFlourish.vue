<script setup>
/**
 * Grote decoratieve letter "N" op de achtergrond (gebruikt op Over/Contact
 * in het Figma-ontwerp, in Kunstler Script). We renderen 'm als live tekst
 * in de Kunstler Script-vervanger (Pinyon Script) i.p.v. als afbeelding —
 * scherp op elk scherm, geen extra requests.
 */
defineProps({
  color: { type: String, default: 'var(--color-ink)' },
})
</script>

<template>
  <span class="brand-flourish" aria-hidden="true">N</span>
</template>

<style scoped>
.brand-flourish {
  position: absolute;
  z-index: 0;
  font-family: var(--font-display);
  font-size: 60rem;
  line-height: 1;
  color: v-bind(color);
  /* Bewust erg laag: dit is puur een achtergrond-watermerk. Bij een hoge
     dekking overlapt de letter op sommige schermbreedtes de tekst ernaast
     en wordt die minder goed leesbaar — dat mag nooit gebeuren. */
  opacity: 0.07;
  pointer-events: none;
  user-select: none;
}

@media only screen and (max-width: 1500px) {
  .brand-flourish {
    font-size: 36rem;
  }
}

@media only screen and (max-width: 600px) {
  .brand-flourish {
    font-size: 22rem;
  }
}
</style>
