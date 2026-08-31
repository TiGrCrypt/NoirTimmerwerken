/**
 * Robuust scrollen naar een sectie via een #hash-link, met een correctie-stap
 * voor mobiel: als je bij het klikken op een navigatielink scrolt, verbergt
 * de mobiele browser vaak tijdens de scroll-animatie de adresbalk. Daardoor
 * verandert de layout (en dus de echte doelpositie) TERWIJL je nog aan het
 * scrollen bent, en land je net te vroeg/te hoog (met bv. de rand van de
 * vorige sectie nog in beeld). We doen daarom eerst de normale smooth
 * scroll, en meten na afloop (als alles — incl. adresbalk — tot rust is
 * gekomen) de doelpositie opnieuw en corrigeren zo nodig in één keer,
 * zonder animatie (dus onzichtbaar als het al goed stond).
 *
 * @param {string} href - bv. "#projecten"
 */
export function scrollToHash(href) {
  if (!href || !href.startsWith('#')) return
  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return

  // Respecteert gewoon de scroll-margin-top die al in CSS staat
  // (inclusief de uitzonderingen voor #home en #contact) — geen dubbele
  // logica hier nodig.
  function targetY() {
    const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    const rectTop = el.getBoundingClientRect().top + window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    // Afronden op hele pixels: scrollTo/scrollY werken zelf ook met hele
    // (device-)pixels, dus zonder afronding vergelijk je een fractioneel
    // doel met een geheel resultaat en lijkt het altijd "1px" te schelen.
    return Math.round(Math.max(0, Math.min(rectTop - marginTop, maxScroll)))
  }

  // URL bijwerken zonder de native (ongecontroleerde) jump-scroll te
  // triggeren.
  if (history.pushState) {
    history.pushState(null, '', href)
  }

  window.scrollTo({ top: targetY(), behavior: 'smooth' })

  // Na de scroll (en het eventueel in-/uitschuiven van de adresbalk) nog
  // één keer de echte doelpositie meten en zo nodig in één keer (zonder
  // animatie) corrigeren.
  function settle() {
    const drift = Math.abs(window.scrollY - targetY())
    if (drift > 0) {
      window.scrollTo({ top: targetY(), behavior: 'auto' })
    }
  }

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', settle, { once: true })
  } else {
    // Fallback voor browsers zonder 'scrollend' (bv. oudere Safari):
    // iets langer dan onze scroll-behavior transitie duurt.
    setTimeout(settle, 700)
  }
}
