<script setup>
import TestimonialQuote from './TestimonialQuote.vue'

defineProps({
  backgroundImage: { type: String, required: true },
  heroQuote: { type: String, required: true },
  testimonialQuote: { type: String, required: true },
  testimonialAuthor: { type: String, required: true },
})
</script>

<template>
  <section class="section-hero">
    <div class="image-box" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="scrim" />
      <h1 class="hero-quote">{{ heroQuote }}</h1>
    </div>

    <div class="testimonial-wrap">
      <TestimonialQuote :quote="testimonialQuote" :author="testimonialAuthor" />
    </div>
  </section>
</template>

<style scoped>
.section-hero {
  min-height: calc(100vh - var(--header-height-big));
  display: flex;
  flex-direction: column;
}

.image-box {
  position: relative;
  width: 100%;
  min-height: 60vh;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-quote {
  position: relative;
  width: 60rem;
  max-width: 100%;
  padding: 0 6rem 6rem;
  font-family: var(--font-corsiva);
  font-style: italic;
  font-weight: 400;
  font-size: 4.4rem;
  letter-spacing: 0.1em;
  color: var(--color-paper);
  text-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
}

.testimonial-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

@media only screen and (max-width: 1500px) {
  .hero-quote {
    font-size: 3rem;
    padding: 0 3rem 4rem;
  }
}

@media only screen and (max-width: 600px) {
  .hero-quote {
    font-size: 2.2rem;
    padding: 0 2rem 3rem;
  }
}
</style>
