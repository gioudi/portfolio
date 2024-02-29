<template>
  <div class="container pt-5">
    <div class="column mb-5">
      <h1 class="title is-1 has-text-weight-bold">Sergio Penagos</h1>
      <h2 class="subtitle has-text-weight-medium">
        Front-end Developer / Web Developer / Willing Relocate
      </h2>
      <p class="subtitle-6 mb-3">
        I come from a small place called Asgård, Since 2017 I've been a Frontend
        developer and currently I am looking for a new challenge in my career,
        besides I am willing to relocate. I've developed a few accessible and
        usability's websites and apps with different international and national
        teams. I also have knowledge in English or well I can have a good
        conversation.
      </p>
      <button
        @click="openPdfPreview"
        class="is-inline-flex is-align-items-center mb-6 is-justify-content-center is-clickable button"
      >
        See CV
      </button>
      <VerticalTimeLine />
      <ProjectsLine />
      <SkillsLine />
      <ContactStep />
    </div>
  </div>
  <FooterLine />
</template>

<script setup lang="ts">
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";
import ProjectsLine from "@/components/ProjectsLine.vue";
import SkillsLine from "@/components/SkillsLine.vue";
import ContactStep from "@/components/ContactStep.vue";
import FooterLine from "@/components/FooterLine.vue";
import pdfUrl from "@/assets/CV-2024.pdf";

const openPdfPreview = () => {
  window.open(pdfUrl, "_blank", "width=600,height=800");
};
</script>
