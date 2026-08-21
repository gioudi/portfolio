<template>
  <main class="container pt-5">
    <section class="column">
      <h1 class="title is-1 has-text-weight-bold has-text-centered">
        About "{{ project?.title }}"
      </h1>
      <article class="project-detail">
        <div class="project-info mb-3">
          <h2 class="subtitle is-2 has-text-weight-medium">
            {{ project?.title }}
          </h2>
          <p class="subtitle is-4">{{ project?.description }}</p>
          <p class="subtitle is-6">
            <strong>Tech Stack:</strong> {{ project?.techStack }}
          </p>
          <a :href="project?.site" class="button is-hoverable is-small mr-3"
            >Go to site</a
          >
          <router-link to="/" class="button is-hoverable is-small"
            >Go Home</router-link
          >
        </div>
        <div class="project-media mb-5">
          <h2 class="subtitle is-2 has-text-weight-medium">Evidence:</h2>
          <Carousel :items-to-show="1">
            <Slide v-for="(media, index) in project?.media" :key="index">
              <figure>
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  :alt="`${project?.title} project screenshot ${index + 1}`"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>

        <h2 class="subtitle is-2 has-text-weight-medium mb-5">
          More details..
        </h2>
        <div class="columns is-multiline">
          <article class="column" data-aos="fade-right">
            <div class="card">
              <div class="card-content">
                <h3 class="title is-4 has-text-weight-bold">
                  Responsibilities
                </h3>
                <ul>
                  <li
                    v-for="responsibility in project?.responsibilities"
                    :key="responsibility"
                  >
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article class="column" data-aos="fade-left">
            <div class="card">
              <div class="card-content">
                <h3 class="title is-4 has-text-weight-bold">Topics</h3>
                <ul>
                  <li v-for="topic in project?.topics" :key="topic">
                    {{ topic }}
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useProjectStore, LocalProject } from "../store/projects";
import { useRouter } from "vue-router";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const store = useProjectStore();
const router = useRouter();

const projectId = router.currentRoute.value.params.id;

const project = store.projects.find((p: LocalProject) => p.id === projectId);
</script>
<style lang="scss">
.project-media {
  img,
  video {
    height: 26.875rem;
    object-fit: cover;
  }
}
</style>
