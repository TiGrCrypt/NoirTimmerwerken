<script setup>
/**
 * Herbruikbaar layout-patroon: afbeelding naast tekstblok (50/50).
 * Los van deze site te gebruiken via props/slots.
 *
 * overlayOnMobile: op mobiel normaal gesproken staan afbeelding en tekst
 * onder elkaar. Zet deze prop op true om in plaats daarvan de afbeelding
 * als achtergrond te tonen met de tekst er (met een donker scrim voor
 * leesbaarheid) overheen — handig voor secties waar je op mobiel geen
 * ruimte kwijt wilt aan een losse foto.
 */
defineProps({
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  heading: { type: String, default: '' },
  reverse: { type: Boolean, default: false },
  overlayOnMobile: { type: Boolean, default: false },
})
</script>

<template>
  <div class="image-text" :class="{ reverse, 'overlay-on-mobile': overlayOnMobile }">
    <div class="image-text-image">
      <img :src="image" :alt="imageAlt" />
    </div>
    <div class="image-text-content">
      <h2 v-if="heading">{{ heading }}</h2>
      <p><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.image-text {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  align-items: center;
  gap: 5rem;
}

.image-text.reverse {
  flex-direction: row-reverse;
}

.image-text-image {
  width: 45%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-text-image img {
  width: 100%;
  border-radius: 0.6rem;
}

.image-text-content {
  width: 55%;
}

.image-text-content h2 {
  font-family: var(--font-corsiva);
  font-style: italic;
  font-weight: 500;
  font-size: 4rem;
  letter-spacing: 0.06em;
  margin-bottom: 2.4rem;
}

.image-text-content p {
  font-size: 2.1rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
}

@media only screen and (max-width: 600px) {
  .image-text {
    flex-direction: column;
    gap: 2rem;
  }
  .image-text-image,
  .image-text-content {
    width: 100%;
  }
  .image-text-content h2 {
    font-size: 3.2rem;
  }
  .image-text-content p {
    font-size: 1.9rem;
  }

  /* Foto als achtergrond, tekst erover heen (met scrim voor leesbaarheid).
     Vult de volledige sectie (breedte + hoogte, tot de randen), geen
     afgeronde hoeken meer — dat hoorde bij de kleinere 55vh-variant. */
  .image-text.overlay-on-mobile {
    display: block;
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100svh;
    overflow: hidden;
    padding: 3rem 2rem;
  }

  .image-text.overlay-on-mobile .image-text-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    border-radius: 0;
  }

  .image-text.overlay-on-mobile .image-text-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .image-text.overlay-on-mobile .image-text-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  .image-text.overlay-on-mobile .image-text-content {
    position: relative;
    z-index: 1;
    color: var(--color-paper);
  }
}
</style>
