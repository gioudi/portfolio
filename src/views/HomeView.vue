<template>
  <div>
    <h1 class="title">Highly motivated and result-oriented developer...</h1>
    <VerticalTimeLine :timelineItems="professionalTimeline" />
    <ProjectsLine />
    <ContactForm />
    <FooterLine />
  </div>
</template>

<script setup lang="ts">
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";
import ProjectsLine from "@/components/ProjectsLine.vue";
import ContactForm from "@/components/ContactForm.vue";
import FooterLine from "@/components/FooterLine.vue";
import { ref } from "vue";
const professionalTimeline = ref([
  {
    date: "2022 - Present",
    description: "Work at Company A as a Developer",
  },
  {
    date: "2019 - 2022",
    description: "Completed Bachelor's Degree in Computer Science",
  },
]);
</script>
