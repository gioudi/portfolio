<template>
  <div>
    <VerticalTimeline>
      <!-- Professional Experience -->
      <VerticalTimelineItem
        v-for="(experience, index) in professionalExperiences"
        :key="index"
        :date="experience.date"
        :icon="experience.icon"
        :color="experience.color"
      >
        <h3>{{ experience.enterprise }}</h3>
        <p>{{ experience.description }}</p>

        <router-link :to="'/experience/' + index">Details</router-link>
      </VerticalTimelineItem>

      <!-- Degrees -->
      <VerticalTimelineItem
        v-for="(degree, index) in degrees"
        :key="'degree' + index"
        :date="degree.date"
        :icon="degree.icon"
        :color="degree.color"
      >
        <h3>{{ degree.degree }}</h3>
        <p>{{ degree.description }}</p>
        <router-link :to="'/degree/' + index">Details</router-link>
      </VerticalTimelineItem>
    </VerticalTimeline>
  </div>
</template>

<script setup>
import VerticalTimeline from "vue-vertical-timeline";
import VerticalTimelineItem from "vue-vertical-timeline-item";
import ScrollReveal from "vue-scroll-reveal";

const professionalExperiences = [
  {
    enterprise: "Company A",
    date: "2018 - Present",
    icon: "mdi-briefcase",
    color: "#3498db",
    description: "Description of responsibilities at Company A.",
  },
];

const degrees = [
  {
    degree: "Bachelor of Science",
    date: "2014 - 2018",
    icon: "mdi-school",
    color: "#2ecc71",
    description: "Description of the Bachelor of Science degree.",
  },
];
</script>

<style scoped>
/* Add custom styles for the timeline */
</style>
