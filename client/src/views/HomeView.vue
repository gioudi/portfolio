<template>
  <main class="container pt-3">
    <section class="hero-section mb-4">
      <h1 class="title is-1 has-text-weight-bold">{{ t("hero.name") }}</h1>
      <h2 class="subtitle has-text-weight-medium">{{ t("hero.role") }}</h2>
      <p class="hero-bio mb-4">{{ t("hero.bio") }}</p>
      <div class="buttons">
        <button
          @click="openPdfPreview"
          class="button"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span class="icon"><i class="far fa-file-pdf"></i></span>
          <span>{{ t("hero.seeCv") }}</span>
        </button>
        <button
          @click="scrollTo('projects')"
          class="button"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {{ t("hero.viewWork") }}
        </button>
        <button
          @click="scrollTo('contact')"
          class="button"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {{ t("hero.hireMe") }}
        </button>
      </div>
    </section>
    <section>
      <VerticalTimeLine />
      <ProjectsLine />
      <SkillsLine />
      <ServicesOffer />
      <ContactStep />
    </section>
  </main>
  <FooterLine />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";
import ProjectsLine from "@/components/ProjectsLine.vue";
import SkillsLine from "@/components/SkillsLine.vue";
import ContactStep from "@/components/ContactStep.vue";
import FooterLine from "@/components/FooterLine.vue";
import ServicesOffer from "@/components/ServicesOffer.vue";
import pdfUrl from "@/assets/CV-2024.pdf";

const { t } = useI18n();

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const openPdfPreview = () => {
  window.open(pdfUrl, "_blank", "width=600,height=800");
};
</script>

<style scoped lang="scss">
.hero-section {
  padding-top: 1.5rem;
}

.hero-bio {
  max-width: 62ch;
}

.buttons .button {
  margin-right: 0.25rem;
}
</style>
