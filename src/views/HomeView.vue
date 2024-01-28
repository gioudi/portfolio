<template>
  <div class="container pt-5">
    <div class="columns is-multiline">
      <div class="column">
        <h1 class="title">
          Front-end Developer / Web Developer / Willing Relocate
        </h1>
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
    date: "Au2021 - Present",
    description: "Work at Company A as a Developer",
  },
  {
    date: "2019 - 2022",
    description: "Completed Bachelor's Degree in Computer Science",
  },
]);
</script>
