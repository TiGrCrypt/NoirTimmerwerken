<script setup>
/**
 * Hamburger-knop voor mobiel. De lijntjes wisselen van kleur op basis
 * van het thema (light/dark) van de header waarin hij staat.
 *
 * NB: in de originele HTML/CSS-site deed deze knop nog niets (geen
 * click-handler). Hier is 'm functioneel gemaakt: hij emit 'toggle'
 * zodat de ouder een mobiel menu kan open/dichtklappen.
 */
defineProps({
  isDark: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle'])
</script>

<template>
  <button
    class="btn-mobile-nav"
    type="button"
    :aria-expanded="isOpen"
    aria-label="Menu openen/sluiten"
    @click="$emit('toggle')"
  >
    <svg height="36" width="36" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <line class="mobile-line" :class="isDark ? 'dark' : 'light'" x1="5" y1="10" x2="45" y2="10" />
      <line class="mobile-line" :class="isDark ? 'dark' : 'light'" x1="5" y1="25" x2="45" y2="25" />
      <line class="mobile-line" :class="isDark ? 'dark' : 'light'" x1="5" y1="40" x2="45" y2="40" />
    </svg>
  </button>
</template>

<style scoped>
.btn-mobile-nav {
  background: none;
  display: none;
  border: 0;
  padding: 0.5rem;
  line-height: 0;
}

.mobile-line {
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke 0.2s linear;
}

.dark {
  stroke: var(--color-ink);
}

.light {
  stroke: var(--color-paper);
}

@media only screen and (max-width: 600px) {
  .btn-mobile-nav {
    display: block;
  }
}
</style>
