<template>
  <section id="contact" class="contact py-4" data-aos="fade-down">
    <h2 class="title is-2 has-text-centered mb-3">
      {{ t("contact.heading") }}
    </h2>
    <p class="has-text-centered mb-4">{{ t("contact.lead") }}</p>
    <nav
      class="contact-options is-flex is-justify-content-center is-align-items-center"
      data-aos="fade-left"
    >
      <a
        :href="'mailto:' + email"
        :title="t('contact.email')"
        :aria-label="t('contact.email')"
        class="contact-link"
      >
        <span class="icon is-large"><i class="fa fa-envelope"></i></span>
      </a>
      <a
        href="https://www.linkedin.com/in/analyst-sergio-penagos/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        aria-label="LinkedIn"
        class="contact-link"
      >
        <span class="icon is-large"><i class="fab fa-linkedin"></i></span>
      </a>
      <a
        :href="github"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub — gioudi"
        aria-label="GitHub gioudi"
        class="contact-link"
      >
        <span class="icon is-large"><i class="fab fa-github"></i></span>
      </a>
      <a
        :href="github2"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub — SergioVass"
        aria-label="GitHub SergioVass"
        class="contact-link"
      >
        <span class="icon is-large"><i class="fab fa-github"></i></span>
      </a>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const email = "sergiopenagos881@gmail.com";
const github = "https://github.com/gioudi";
const github2 = "https://github.com/SergioVass";
</script>

<style scoped lang="scss">
.contact-options {
  gap: 1.75rem;
}

.contact-link {
  color: #000;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  &:hover {
    text-decoration: none;
    transform: translateY(-3px);
    opacity: 0.75;
  }
}
</style>
