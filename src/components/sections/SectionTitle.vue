<script setup>
/**
 * Kop die alleen op mobiel getoond wordt (op desktop staat de titel
 * al impliciet in de sticky nav / context). Herbruikbaar over secties heen.
 */
defineProps({
  text: { type: String, required: true },
})
</script>

<template>
  <h2 class="title-mobile">{{ text }}</h2>
</template>

<style scoped>
.title-mobile {
  display: none;
}

@media only screen and (max-width: 600px) {
  .title-mobile {
    margin: 2rem 3rem;
    display: inline-block;
    font-size: 6.8rem;
    font-family: var(--font-mobile-title);
    font-weight: 100;
  }
}
</style>
