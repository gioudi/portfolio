<template>
  <section id="projects" class="py-4" data-aos="fade-left">
    <h2 class="title is-2 has-text-centered">
      {{ t("projects.recentHeading") }}
    </h2>
    <div
      class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-multiline mb-5"
    >
      <article
        class="column is-half-tablet is-one-quarter-desktop"
        v-for="project in projects"
        :key="project.id"
      >
        <div class="card container-image" data-aos="fade-right">
          <figure class="container-image__background">
            <img
              class="container-image__background--image"
              :src="project.image"
              :alt="`${project.title} project screenshot`"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="card-content">
            <p class="title is-6 has-text-weight-bold">{{ project.title }}</p>
            <p class="is-size-7 mb-2 description">
              {{ descriptionOf(project) }}
            </p>
            <button
              class="button is-hoverable is-small"
              @click="viewProjectDetails(project.id)"
            >
              {{ t("projects.viewDetails") }}
            </button>
          </div>
        </div>
      </article>
    </div>
    <h2 class="title is-2 has-text-centered">
      {{ t("projects.otherHeading") }}
    </h2>
    <div
      class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-multiline"
    >
      <article
        class="column is-half-tablet is-one-quarter-desktop"
        v-for="project in otherProjects"
        :key="project.title"
      >
        <div class="card container-image" data-aos="fade-right">
          <figure class="container-image__background">
            <div
              class="drop-down-window px-3 is-flex is-align-items-center is-justify-content-center has-small-text has-text-black"
            >
              {{ project.techStack }}
            </div>
            <img
              class="container-image__background--image"
              :src="project.image"
              :alt="project.image_alt"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="card-content">
            <p class="title is-6 has-text-weight-bold">{{ project.title }}</p>
            <p class="is-size-7 mb-2 description">
              {{ otherDescriptionOf(project) }}
            </p>
            <a
              class="button is-hoverable is-small"
              :href="project?.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t("projects.goToWeb") }}
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useProjectStore } from "../store/projects";
import router from "@/router";

const { t, te } = useI18n();
const store = useProjectStore();
const otherProjects = store.otherProjects;
const projects = store.projects;

const descriptionOf = (project: { key?: string; description: string }) =>
  project.key && te(`projects.items.${project.key}.description`)
    ? t(`projects.items.${project.key}.description`)
    : project.description;

const otherDescriptionOf = (project: { key?: string; description: string }) =>
  project.key && te(`projects.other.${project.key}.description`)
    ? t(`projects.other.${project.key}.description`)
    : project.description;

const viewProjectDetails = (id: string) => {
  router.push(`/project/${id}`);
};
</script>

<style lang="scss" scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.column > .card {
  display: flex;
  flex-direction: column;
  height: 100%;

  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .button {
      margin-top: auto;
      align-self: flex-start;
    }
  }
}
</style>
