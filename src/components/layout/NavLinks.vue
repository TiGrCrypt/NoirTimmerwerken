<script setup>
/**
 * Herbruikbare navigatielijst. Props-based en zonder eigen
 * kleuraannames (dat regelt de ouder-component via CSS), zodat 'm
 * zowel licht-op-donker als donker-op-licht ingezet kan worden.
 */
import { scrollToHash } from '../../composables/useAnchorScroll'

defineProps({
  links: {
    type: Array,
    required: true,
    // [{ label: 'Home', href: '#home' }, ...]
  },
})

function onClick(event, href) {
  if (!href?.startsWith('#')) return
  event.preventDefault()
  scrollToHash(href)
}
</script>

<template>
  <nav class="nav-links">
    <ul>
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" @click="onClick($event, link.href)">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-links {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.nav-links ul {
  font-size: var(--nav-font-size, 1.6rem);
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: var(--font-corsiva);
  font-style: italic;
  letter-spacing: 0.1em;
}

.nav-links a {
  transition: opacity 0.15s ease;
}

.nav-links a:hover {
  opacity: 0.7;
}
</style>
