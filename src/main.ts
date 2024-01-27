// src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import ScrollReveal from "vue-scroll-reveal";
import VerticalTimeline from "vue-vertical-timeline";
import VerticalTimelineItem from "vue-vertical-timeline-item";
import "./styles/global.scss";
import VueCarousel from "vue-carousel";
const app = createApp(App);

app.use(createPinia());
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

// Configure scroll animation for the timeline
app.directive("scroll-reveal", {
  beforeMount(el, binding) {
    ScrollReveal().reveal(el, binding.value);
  },
});

app.use(VueCarousel);
app.mount("#app");
