<script setup>
import ImageTextSection from './ImageTextSection.vue'
import BrandFlourish from '../layout/BrandFlourish.vue'

defineProps({
  image: { type: String, required: true },
  heading: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <section class="section-about">
    <BrandFlourish class="flourish" />
    <ImageTextSection :image="image" image-alt="Aan het werk in de werkplaats" :heading="heading" overlay-on-mobile>
      {{ text }}
    </ImageTextSection>
  </section>
</template>

<style scoped>
.section-about {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background-color: var(--color-paper);
  color: var(--color-ink);
  padding: 6rem 16rem;
}

.flourish {
  right: -8rem;
  top: -6rem;
}

@media only screen and (max-width: 600px) {
  .section-about {
    padding: 3rem;
    min-height: auto;
  }
  .flourish {
    right: -6rem;
    top: 0;
  }
}
</style>
