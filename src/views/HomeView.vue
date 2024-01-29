<template>
  <div class="container pt-5">
    <div class="columns is-multiline">
      <div class="column">
        <h1 class="title is-1 has-text-weight-bold">Sergio Penagos</h1>
        <h2 class="subtitle has-text-weight-medium">
          Front-end Developer / Web Developer / Willing Relocate
        </h2>
        <p class="Subtitle 6">
          I come from a small place called Asgård, Since 2017 I've been a
          Frontend developer and currently I am looking for a new challenge in
          my career, besides I am willing to relocate. I've developed a few
          accessible and usability's websites and apps with different
          international and national teams. I also have knowledge in English or
          well I can have a good conversation.
        </p>
        <VerticalTimeLine :timelineItems="professionalTimeline" />
        <ProjectsLine />
        <ContactForm />
      </div>
    </div>
  </div>
  <FooterLine />
</template>

<script setup lang="ts">
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";
import ProjectsLine from "@/components/ProjectsLine.vue";
import ContactForm from "@/components/ContactForm.vue";
import FooterLine from "@/components/FooterLine.vue";
import { ref } from "vue";
const professionalTimeline = ref([
  {
    date: "Au2021 - Jan/2024",
    event: "Vass",
    description: "Worked at company as a V2 Developer",
  },
  {
    date: "Abr/2020 - Jul/2022",
    event: "Technologist Analysis of Information System",
    description: "Completed Associate's Degree",
  },
  {
    date: "Dec/2019 - Mar/2021",
    event: "Intevo",
    description: "Worked at company as a Web Developer",
  },
  {
    date: "Apr/2019 - Nov/2019",
    event: "Soulmedical",
    description: "Worked at company as a Web Developer",
  },
  {
    date: "Oct/2018 - Nov/2019",
    event: "Technical Software Developer",
    description: "Completed Associate's Degree",
  },
  {
    date: "Oct/2017 - Dec/2018",
    event: "ConexTravel ",
    description: "Worked at company as a Web Developer",
  },
]);
</script>
