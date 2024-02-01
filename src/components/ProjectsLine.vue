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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const projects = ref([
  {
    title: "WEB DANDO",
    description:
      "Website that offers release credits for military, police and pensioners.",
    image: "DANDO.png",
    techStack: "Html5, Sass, Vue, TypeScript, Github",
  },
  {
    title: "ONBOARDING WEB DANDO",
    description:
      "Onboarding website that allows customers to ask for a loan, upload documents and sign the application via keycloak.",
    image: "DANDO_ONBOARDING.png",
    techStack: "Html5, Sass, Vue, TypeScript, Github",
  },
  {
    title: "PRIVATE WEB DANDO",
    techStack: "Html5, Sass, Vue, TypeScript, Github",
    image_alt: "dando_private",
    description:
      "Private website that allows analysts to check for a client loan, upload or delete documents and authorize the client's applications.",
    image: "DANDO_PRIVATE.png",
  },
  {
    title: "DEONE",
    techStack: "React native, Sass, Laravel, JavaScript, Bitbucket",
    image: "DEONE.png",
    image_alt: "deOne",
    description:
      "Mobile application that offers you Express Courier service, such as sending packages or any type of service you request.",
    kind: "Work",
    site: "https://play.google.com/store/apps/details?id=com.qoopa.deone",
  },
  {
    title: "WEB BBC",
    image: "BBC.png",
    kind: "Work",
    techStack: "Html5, Sass, TypeScript, Github, Php",
    description:
      "Bogota Beer Company website where every client could see and get information about company products, offers, services and office.",
    image_alt: "bbc",
    site: "https://www.bbccerveceria.com/",
  },
  {
    title: "WEB STELLA ARTOIS",
    image: "STELLA.png",
    techStack: "Html5, Sass, TypeScript, Github, Php",
    kind: "Work",
    site: "https://www.stellaartois.co/",
    image_alt: "google",
    description:
      "Stella artois colombian website where every client could see and get information about company products, offers, services and office.",
  },
  {
    title: "PRIVATE WEB MIFEL",
    image: "MIFEL.png",
    techStack: "Html5, Sass, TypeScript, Github, Vue",
    kind: "Work",
    site: "https://mifel-banca.modyo.build/",
    image_alt: "mifelweb",
    description:
      "Multi-language mexican bank private site and public site.This website permits management that clients' cards, checkbooks and clarifications.",
  },
  {
    title: "FAKE GOOGLE",
    image: "GOOGLE.png",
    techStack: "Html5, Sass, JavaScript, Github, Vue",
    kind: "Personal",
    site: "https://gioudi.github.io/landing-page-google/",
    image_alt: "google",
    description:
      "Template about Google's landing page, where you can see a dropdown tools and a landing page mobile version,  built using vue.",
  },
  {
    title: "WEATHER FORECAST",
    image: "WEATHER.png",
    techStack: "React, Css3, JavaScript, TypeScript, Github",
    kind: "Personal",
    site: "https://gioudi.github.io/react-app-weather/",
    image_alt: "weather",
    description:
      "Weather website where a person would check a specific city information, this information is getting from a free Api weather using axios and typescript.",
  },
]);
</script>
