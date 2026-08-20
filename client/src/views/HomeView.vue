<template>
  <main class="container pt-5">
    <section class="column mb-5">
      <header
        class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center"
      >
        <h1 class="title is-1 has-text-weight-bold is-inline">
          Sergio Penagos
        </h1>
        <nav>
          <router-link
            class="is-inline-flex is-align-items-center is-justify-content-center is-clickable button"
            to="/login"
          >
            Login
          </router-link>
        </nav>
      </header>
      <h2 class="subtitle has-text-weight-medium">
        Software Engineer / Design Systems / Bilingual (EN/ES)
      </h2>
      <p class="subtitle-6 mb-3">
        Software Engineer with experience building scalable, responsive, and
        accessible web applications. Specializing in modern frontend
        architectures using React, Vue, TypeScript, and design systems.
        Proficient in JavaScript, Node.js, and component-driven development with
        Storybook. Bilingual (English/Spanish) with leadership experience
        coordinating development teams and ensuring high-quality delivery.
      </p>
      <button
        @click="openPdfPreview"
        class="is-inline-flex is-align-items-center mb-6 is-justify-content-center is-clickable button"
      >
        See CV
      </button>
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
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";
import ProjectsLine from "@/components/ProjectsLine.vue";
import SkillsLine from "@/components/SkillsLine.vue";
import ContactStep from "@/components/ContactStep.vue";
import FooterLine from "@/components/FooterLine.vue";
import ServicesOffer from "@/components/ServicesOffer.vue";
import pdfUrl from "@/assets/CV-2024.pdf";

const openPdfPreview = () => {
  window.open(pdfUrl, "_blank", "width=600,height=800");
};
</script>
