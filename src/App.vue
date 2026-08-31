<script setup>
import { ref, computed } from 'vue'
import { useStickyNav } from './composables/useStickyNav'
import { useScrollSpy } from './composables/useScrollSpy'

import AppHeader from './components/layout/AppHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

import logo from './assets/noir-logo.svg'
import logoWhite from './assets/noir-logo-white.svg'
import heroImage from './assets/makita-saw.jpg'
import aboutImage from './assets/man-using-saw.jpg'
import makita from './assets/makita-saw.jpg'
import manSaw from './assets/man-using-saw.jpg'
import appointmentImage from './assets/Appointment.jpg'

const leftLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projecten', href: '#projecten' },
]
const rightLinks = [
  { label: 'Over', href: '#over' },
  { label: 'Contact', href: '#contact' },
]

// Hoogte van de sticky (kleine) balk — moet in sync blijven met
// --header-height-small in styles/tokens.css (11.1rem = 111px, bij
// html { font-size: 62.5% } dus 1rem = 10px).
const STICKY_HEADER_HEIGHT_PX = 111

// Secties + hun "kleur" (achtergrond) — bepaalt straks de kleur van de
// sticky nav zodra die sectie zich er net onder bevindt.
const sections = ref([
  { id: 'home', theme: 'light', el: null },
  { id: 'projecten', theme: 'dark', el: null },
  { id: 'over', theme: 'light', el: null },
  { id: 'contact', theme: 'dark', el: null },
])

function setSectionEl(id, el) {
  const entry = sections.value.find((s) => s.id === id)
  if (entry) entry.el = el
}

// Sticky wordt actief zodra de Home-sectie (sectie 1) uit beeld scrolt,
// d.w.z. zodra je bij sectie 2 (Projecten) aankomt.
const homeEl = computed(() => sections.value[0].el)
const { isSticky } = useStickyNav(homeEl)

// Welke sectie zit er nu net onder de sticky balk?
const { activeTheme } = useScrollSpy(sections, STICKY_HEADER_HEIGHT_PX)

// De balk krijgt het TEGENOVERGESTELDE kleurenschema van die sectie:
// wit op een zwarte sectie, zwart op een witte sectie.
const headerTheme = computed(() => (activeTheme.value === 'dark' ? 'light' : 'dark'))

// Placeholder-content uit het Figma-ontwerp (daar delen alle drie kaarten
// dezelfde voorbeeldtekst en zijn de foto's stockfoto's).
const placeholderText =
  'Een houten veranda is perfect voor het creëren van een beschutte plek om gedurende verschillende weersomstandigheden buiten te verblijven. Het geeft direct meer sfeer, licht en mogelijkheden aan zowel je tuin als je woning.'
const projects = [
  { title: 'Veranda', description: placeholderText, images: [makita, manSaw, makita, manSaw, makita] },
  { title: 'Zithoek', description: placeholderText, images: [manSaw, makita, manSaw, makita, manSaw] },
  { title: 'Patio', description: placeholderText, images: [makita, manSaw, makita, manSaw, makita] },
]
</script>

<template>
  <AppHeader
    :logo="logo"
    :logo-white="logoWhite"
    :left-links="leftLinks"
    :right-links="rightLinks"
    :sticky="isSticky"
    :theme="headerTheme"
  />

  <main>
    <div id="home" class="section-anchor" :ref="(el) => setSectionEl('home', el)">
      <HeroSection
        :background-image="heroImage"
        hero-quote="Unique handcrafted Furniture and More..."
        testimonial-quote="Ondanks de beperkte ruimte heeft Noir Timmerwerken mij een hele mooie oplossing kunnen bieden"
        testimonial-author="Tim Grootendorst"
      />
    </div>

    <div id="projecten" class="section-anchor" :ref="(el) => setSectionEl('projecten', el)">
      <ProjectsSection :projects="projects" />
    </div>

    <div id="over" class="section-anchor" :ref="(el) => setSectionEl('over', el)">
      <AboutSection
        :image="aboutImage"
        heading="Hoe het begon..."
        text="Als kleine jongen was ik al bezig met hout. De geur van vers gezaagd hout, het schuren van ruwe planken, en het tikken van de hamer op spijkers – het waren mijn eerste kennismakingen met het ambacht van een timmerman. Als kind kon ik urenlang doorbrengen in mijn vaders werkplaats, waar ik gefascineerd toekeek hoe hij meubels creëerde uit ogenschijnlijk dood materiaal. Het was alsof het hout tot leven kwam onder zijn handen. Naarmate ik ouder werd, groeide mijn passie voor houtbewerking. Ik leerde de fijne kneepjes van het vak: het met precisie zagen, het schaven van oppervlakken, en het samenstellen van complexe constructies. Elk stuk hout had zijn eigen karakter, zijn eigen verhaal. En ik? Ik was de verteller die het tot leven bracht."
      />
    </div>

    <div id="contact" class="section-anchor" :ref="(el) => setSectionEl('contact', el)">
      <ContactSection
        :image="appointmentImage"
        phone="06 23 80 97 93"
        email="info@noir-timmerwerken.nl"
        :credit="{ label: 'Internet of Tims', url: 'https://www.internet-of-tims.nl' }"
      />
    </div>
  </main>
</template>

<style scoped>
.section-anchor {
  scroll-margin-top: var(--header-height-small);
}
</style>
