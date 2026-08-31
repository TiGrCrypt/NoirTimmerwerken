<script setup>
import BrandFlourish from "../layout/BrandFlourish.vue";
import IconWhatsapp from "../icons/IconWhatsapp.vue";
import IconMail from "../icons/IconMail.vue";
import logoIoT from "../../assets/LogoIoT.svg";

defineProps({
  image: { type: String, default: "" },
  heading: { type: String, default: "Afspraak maken?" },
  intro: { type: String, default: "Neem contact met ons op:" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  credit: {
    type: Object,
    default: () => ({
      label: "Internet of Tims",
      url: "https://www.internet-of-tims.nl",
    }),
  },
});

const telHref = (phone) => `tel:${phone.replace(/\s+/g, "")}`;
</script>

<template>
  <section class="section-contact">
    <BrandFlourish
      color="var(--color-paper)"
      class="flourish"
    />

    <div class="contact-inner">
      <div
        v-if="image"
        class="contact-image"
      >
        <img
          :src="image"
          alt=""
        />
      </div>

      <div class="contact-copy">
        <h2>{{ heading }}</h2>
        <p class="intro">{{ intro }}</p>

        <ul class="contact-list">
          <li v-if="phone">
            <IconWhatsapp :size="24" />
            <a :href="telHref(phone)">{{ phone }}</a>
          </li>
          <li v-if="email">
            <IconMail :size="22" />
            <a :href="`mailto:${email}`">{{ email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <footer class="contact-footer">
      <ul class="contact-list contact-list--footer">
        <li v-if="phone">
          <IconWhatsapp :size="16" />
          <a :href="telHref(phone)">{{ phone }}</a>
        </li>
        <li v-if="email">
          <IconMail :size="15" />
          <a :href="`mailto:${email}`">{{ email }}</a>
        </li>
      </ul>

      <a
        v-if="credit"
        class="credit"
        :href="credit.url"
        target="_blank"
        rel="noopener"
      >
        <span>Powered by:</span>
        <img
          :src="logoIoT"
          :alt="credit.label"
          class="credit-logo"
        />
      </a>
    </footer>
  </section>
</template>

<style scoped>
.section-contact {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background-color: var(--color-ink);
  color: var(--color-paper);
  display: flex;
  flex-direction: column;
  padding: 6rem 6rem 2rem;
}

.flourish {
  right: -10rem;
  top: -8rem;
}

.contact-inner {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 90rem;
  margin: 0 auto;
}

.contact-image {
  flex: 1 1 40rem;
  max-width: 50rem;
}

.contact-image img {
  width: 100%;
  border-radius: 1.2rem;
  box-shadow: 0 1px 40px 0 rgba(250, 250, 250, 0.4);
}

.contact-copy {
  flex: 1 1 30rem;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.contact-copy h2 {
  font-family: var(--font-corsiva);
  font-style: italic;
  font-weight: 500;
  font-size: 4rem;
  letter-spacing: 0.06em;
  margin-bottom: 1.6rem;
}

.contact-copy .intro {
  font-size: 2.2rem;
  margin-bottom: 2.4rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.4rem;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2.2rem;
}

.contact-footer {
  position: relative;
  z-index: 1;
  margin-top: 4rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(250, 250, 250, 0.25);
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-list--footer {
  flex-direction: row;
  gap: 2.4rem;
}

.contact-list--footer li {
  font-size: 1.5rem;
}

.credit {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  line-height: 1.4;
  color: var(--color-paper);
}

.credit-logo {
  height: 2.2rem;
  width: auto;
}

@media only screen and (max-width: 600px) {
  .section-contact {
    padding: 4rem 2rem 2rem;
  }
  .contact-copy h2 {
    font-size: 3rem;
  }
  .contact-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  .contact-image {
    display: none;
  }

  /* Op mobiel wel gecentreerd (op desktop blijft het links uitgelijnd) */
  .contact-inner {
    justify-content: center;
    text-align: center;
  }
  .contact-copy,
  .contact-list {
    align-items: center;
  }
}
</style>
