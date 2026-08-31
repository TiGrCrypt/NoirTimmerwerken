<script setup>
import { ref } from 'vue'
import NavLinks from './NavLinks.vue'
import MobileNavToggle from './MobileNavToggle.vue'
import { scrollToHash } from '../../composables/useAnchorScroll'

const props = defineProps({
  logo: { type: String, required: true },
  logoWhite: { type: String, required: true },
  leftLinks: { type: Array, required: true },
  rightLinks: { type: Array, required: true },
  // true zodra er voorbij sectie 1 (Home) gescrold is
  sticky: { type: Boolean, default: false },
  // 'light' of 'dark' — de kleur die de sticky balk zelf moet krijgen
  // (dus al het tegenovergestelde van de sectie erachter, dat bepaalt de ouder)
  theme: { type: String, default: 'light' },
})

const mobileOpen = ref(false)
const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

function onMobileLinkClick(event, href) {
  if (!href?.startsWith('#')) return
  event.preventDefault()
  scrollToHash(href)
  // het menu zelf sluit al via de @click op de <nav>-wrapper (bubbelt door)
}

const allLinks = [...props.leftLinks, ...props.rightLinks]
</script>

<template>
  <!-- Statische balk: blijft altijd op zijn plek bovenaan de pagina,
       precies zoals in het oude project ("blijft staan tot sectie 2"). -->
  <header class="header header-static">
    <NavLinks class="header-menu --left" :links="leftLinks" />
    <img :src="logo" alt="logo Noir Timmerwerken" class="header-logo" />
    <NavLinks class="header-menu --right" :links="rightLinks" />
    <MobileNavToggle class="mobile-toggle" :is-dark="true" :is-open="mobileOpen" @toggle="toggleMobile" />
  </header>

  <!-- Sticky balk: verschijnt fixed bovenaan zodra je voorbij sectie 1 bent
       (ook op mobiel), en wisselt van kleur op basis van de sectie die er
       net onder zit. -->
  <header class="header header-sticky" :class="[theme, { visible: sticky }]">
    <NavLinks class="header-menu --left" :links="leftLinks" />
    <img :src="theme === 'dark' ? logoWhite : logo" alt="logo Noir Timmerwerken" class="header-logo" />
    <NavLinks class="header-menu --right" :links="rightLinks" />
    <MobileNavToggle
      class="mobile-toggle"
      :is-dark="theme === 'light'"
      :is-open="mobileOpen"
      @toggle="toggleMobile"
    />
  </header>

  <Transition name="mobile-menu">
    <nav v-if="mobileOpen" class="mobile-menu" @click="mobileOpen = false">
      <ul>
        <li v-for="link in allLinks" :key="link.href">
          <a :href="link.href" @click="onMobileLinkClick($event, link.href)">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<style scoped>
.header {
  height: var(--header-height-big);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-static {
  position: relative;
  z-index: 5;
  background-color: var(--color-paper);
  color: var(--color-ink);
}

.header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: var(--header-height-small);
  transform: translateY(-100%);
  transition: transform 0.25s ease, background-color 0.2s linear, color 0.2s linear;
}

.header-sticky.visible {
  transform: translateY(0);
}

.header-sticky.light {
  background-color: var(--color-paper);
  color: var(--color-ink);
}

.header-sticky.dark {
  background-color: var(--color-ink);
  color: var(--color-paper);
}

.header-menu {
  --nav-font-size: var(--nav-font-size-big);
}

.header-sticky .header-menu {
  --nav-font-size: var(--nav-font-size-small);
}

.header-logo {
  height: 13rem;
}

.header-sticky .header-logo {
  height: 8rem;
}

.mobile-toggle {
  display: none;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-ink);
}

.mobile-menu ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  font-size: 3.2rem;
  font-family: var(--font-corsiva);
  font-style: italic;
  color: var(--color-paper);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 1500px) {
  .header-logo {
    height: 10rem;
  }
  .header-sticky .header-logo {
    height: 7rem;
  }
}

@media only screen and (max-width: 600px) {
  .header {
    height: var(--header-height-big);
    justify-content: space-between;
    padding: 0 2rem;
  }
  .header-menu {
    display: none;
  }
  .header-logo {
    height: 6rem;
  }
  .header-sticky {
    height: var(--header-height-small);
  }
  .header-sticky .header-logo {
    height: 5rem;
  }
  .mobile-toggle {
    display: block;
  }
}
</style>
