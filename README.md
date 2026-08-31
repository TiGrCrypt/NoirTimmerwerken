# Noir Timmerwerken — Vue

Component-based Vue 3 + Vite versie van de Noir Timmerwerken site: één
scrollende pagina (Home / Projecten / Over / Contact als secties), met
content gebaseerd op het Figma-bestand "NoirTimmerwerken" (Hi-Fi Desktop
+ Mobile) en de oorspronkelijke HTML/CSS in `../NoirTimmerwerken`.

## Starten

Dit project is hier opgezet zonder `npm install` te draaien (deze sessie
had geen toegang tot de npm-registry). Open een gewone terminal op je
eigen computer (buiten Claude om, bv. in VS Code) in deze map en draai:

```bash
npm install
npm run dev
```

## Structuur

```
src/
  styles/
    tokens.css             -> kleuren, fonts, spacing als CSS-variabelen
    base.css                -> reset + globale basisstijlen
  composables/
    useStickyNav.js          -> bepaalt of er voorbij sectie 1 gescrold is
    useScrollSpy.js           -> bepaalt welke sectie er net onder de sticky balk zit
  components/
    layout/
      NavLinks.vue            -> navigatielijst (ankerlinks naar secties)
      MobileNavToggle.vue     -> hamburger-knop
      AppHeader.vue           -> statische balk + sticky balk (zie hieronder)
      BrandFlourish.vue       -> grote decoratieve "N" (Over/Contact)
    icons/
      IconWhatsapp.vue, IconMail.vue
    sections/
      HeroSection.vue, ProjectsSection.vue, AboutSection.vue, ContactSection.vue
      ImageTextSection.vue    -> herbruikbaar "afbeelding naast tekst"-patroon
      TestimonialQuote.vue, ProjectCard.vue
      SectionTitle.vue        -> (momenteel ongebruikt, staat klaar voor hergebruik)
  App.vue                    -> zet alles samen + regelt de nav-logica
  main.js
```

## De navigatiebalk

Zoals gevraagd, gebaseerd op wat je in het oude project al had staan:

- Er zijn twee balken in `AppHeader.vue`: een **statische** (groot logo,
  altijd bovenaan de pagina, blijft gewoon op zijn plek) en een
  **sticky** balk (klein, `position: fixed`, in eerste instantie
  onzichtbaar).
- De sticky balk schuift in zodra je voorbij sectie 1 (Home) scrolt —
  dat wordt gedetecteerd met `useStickyNav`, dezelfde
  IntersectionObserver-aanpak als in je oude project.
- Terwijl je scrolt, houdt `useScrollSpy` bij welke sectie zich net
  ónder de sticky balk bevindt, en de balk krijgt automatisch de
  tegenovergestelde kleur: wit op een zwarte sectie (Projecten,
  Contact), zwart op een witte sectie (Home, Over).
- Op mobiel (<600px) blijft dit net als vroeger uit; daar is alleen de
  vaste balk + hamburgermenu zichtbaar.

De hoogte van de sticky balk staat op twee plekken (moet gelijk blijven):
`--header-height-small` in `src/styles/tokens.css` en
`STICKY_HEADER_HEIGHT_PX` in `src/App.vue`.

## Fonts — belangrijke keuze

Het Figma-ontwerp gebruikt "Kunstler Script" (het woord "Noir") en
"Monotype Corsiva" (vrijwel alle andere tekst). Dit zijn **geen
webfonts** — niet vrij te hosten, en de meeste bezoekers (Mac, mobiel,
Windows zonder MS Office) hebben ze niet lokaal geïnstalleerd.

- Het woord **"Noir"** zelf staat al als vector in `noir-logo.svg` /
  `noir-logo-white.svg`, dus dat blijft overal exact Kunstler Script.
- Voor de rest zijn vrije Google Fonts-vervangers gekozen: **Pinyon
  Script** (rol van Kunstler Script, decoratief: de grote "N") en
  **Cormorant Garamond** italic (rol van Monotype Corsiva: nav, koppen,
  body — een goed leesbare italic serif, want Monotype Corsiva zelf is
  op body-tekstlengte matig leesbaar).
- Heb je het originele lettertype-bestand (.ttf/.otf) van Kunstler
  Script of Monotype Corsiva? Zet het in een nieuwe `src/assets/fonts`
  map en laat het weten, dan zet ik er een `@font-face` op zodat het
  bij iedereen exact matcht met Figma.

## Wat nog placeholder is

- **Projecten**: de 3 kaarten (Veranda/Zithoek/Patio) gebruiken in het
  Figma-ontwerp zelf ook al lorem-tekst (alle drie identiek) en
  stockfoto's. Hier gebruik ik voorlopig de twee bestaande foto's als
  vulling — vervang de `projects`-array in `src/App.vue` door je eigen
  projectfoto's en teksten.
