<template>
  <div class="py-5" data-aos="fade-left">
    <h2 class="title is-2 has-text-centered">My Recent Work</h2>
    <div
      class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-multiline"
    >
      <div
        class="column is-half-tablet is-one-quarter-desktop"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="card container-image" data-aos="fade-right">
          <figure class="container-image__background">
            <!--   <div
              class="drop-down-window px-3 is-flex is-align-items-center is-justify-content-center has-small-text has-text-black"
            >
              {{ project.techStack }}
            </div> -->
            <img
              class="container-image__background--image"
              :src="require(`@/assets/${project.image}`)"
              :alt="project.image_alt"
            />
          </figure>

          <div class="card-content">
            <p class="title is-6 has-text-weight-bold">{{ project.title }}</p>
            <p class="is-size-7 mb-2 description">
              {{ project.description }}
            </p>
            <button class="button is-hoverable is-small" @click="viewProjectDetails(project.id)">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../store/projects';
import router from "@/router";

const store = useStore();
const projects = store.projects;

const viewProjectDetails = (id: string) => {
  router.push(`/project/${id}`);
};
</script>

<style lang="scss" scoped>
.description {
  height: 2.5rem;
  overflow: hidden;
  text-wrap: wrap;
}
</style>
