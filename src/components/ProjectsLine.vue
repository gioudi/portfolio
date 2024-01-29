<template>
  <div class="py-5">
    <h2 class="title is-2 has-text-centered">Projects</h2>
    <div v-if="projects.length <= 3" class="columns is-multiline">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="column is-4"
      >
        <div
          @mouseenter="showTech(index)"
          @mouseleave="hideTech(index)"
          class="card"
        >
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="project.image" alt="Project Image" />
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-4">{{ project.title }}</p>
            <p class="subtitle is-6">{{ project.description }}</p>
          </div>
          <div v-if="showTechInfo[index]" class="card-footer">
            <p>{{ project.techStack }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <carousel>
        <slide v-for="(project, index) in projects" :key="index"> </slide>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const projects = ref([
  {
    title: "Project 1",
    description: "Description of Project 1",
    image: "path/to/project1.jpg",
    techStack: "Vue, TypeScript, Bulma",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    image: "path/to/project2.jpg",
    techStack: "React, JavaScript, Tailwind CSS",
  },
  // Add more projects as needed
]);

const showTechInfo = ref(Array(projects.value.length).fill(false));

const showTech = (index) => {
  showTechInfo[index] = true;
};

const hideTech = (index) => {
  showTechInfo[index] = false;
};
</script>
