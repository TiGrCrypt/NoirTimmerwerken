<script setup>
/**
 * Herbruikbaar testimonial/quote-blokje. Puur props-based, geen
 * afhankelijkheid van deze site, dus zo over te zetten naar een
 * ander project.
 */
defineProps({
  quote: { type: String, required: true },
  author: { type: String, required: true },
})
</script>

<template>
  <figure class="testimonial">
    <blockquote class="testimonial-text">“{{ quote }}”</blockquote>
    <figcaption class="testimonial-writer">- {{ author }}</figcaption>
  </figure>
</template>

<style scoped>
.testimonial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.testimonial-text {
  font-family: var(--font-heading-caps);
  width: 45rem;
  max-width: 100%;
  font-size: 2.4rem;
  letter-spacing: 0.1em;
  font-style: italic;
}

.testimonial-writer {
  margin-top: 2rem;
  font-family: var(--font-script);
  font-size: 2.8rem;
  letter-spacing: 0.1em;
}

@media only screen and (max-width: 600px) {
  .testimonial-text {
    font-size: 1.9rem;
    width: 28rem;
  }
  .testimonial-writer {
    font-size: 2rem;
  }
}
</style>
