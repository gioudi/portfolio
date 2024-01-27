// src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import ScrollReveal from "vue-scroll-reveal";
import VerticalTimeline from "vue-vertical-timeline";
import VerticalTimelineItem from "vue-vertical-timeline-item";
import ToggleButton from "@/components/ToggleButton.vue";
import "~bulma/bulma.sass";
import VueCarousel from "vue-carousel";

import { useThemeStore } from "./store/theme";

const app = createApp(App);

app.use(router);

const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      footer: {
        personalInfo: "Personal Information",
        name: "Your Name",
        location: "Your Location",
        socialMedia: "Social Media",
        linkedIn: "LinkedIn",
        twitter: "Twitter",
        contact: "Contact Information",
        email: "Email",
        phone: "Phone",
        portfolio: "Portfolio Information",
        frontendDeveloper: "Frontend Developer",
      },
    },
    es: {
      footer: {
        personalInfo: "Personal Information",
        name: "Your Name",
        location: "Your Location",
        socialMedia: "Social Media",
        linkedIn: "LinkedIn",
        twitter: "Twitter",
        contact: "Contact Information",
        email: "Email",
        phone: "Phone",
        portfolio: "Portfolio Information",
        frontendDeveloper: "Frontend Developer",
      },
    },
  },
});

app.use(i18n);

app.use(ScrollReveal());
app.component("VerticalTimeline", VerticalTimeline);
app.component("VerticalTimelineItem", VerticalTimelineItem);

app.directive("scroll-reveal", {
  beforeMount(el, binding) {
    ScrollReveal().reveal(el, binding.value);
  },
});

app.use(VueCarousel);

const pinia = createPinia();
app.use(pinia);

const themeStore = useThemeStore();
app.provide("themeStore", themeStore);

app.component("ToggleButton", ToggleButton);

app.mount("#app");
