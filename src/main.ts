import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import "./styles/main.scss";
import { useThemeStore } from "./store/theme";
import { useLanguageStore } from "./store/language";

import "aos/dist/aos.css";
import AOS, { AosOptions } from "aos";

const app = createApp(App);

app.use(router);

const i18n = createI18n({
  locale: "en",
  allowComposition: true,
  messages: {
    en: {
      footer: {
        personalInfo: "Personal Information",
        name: "Sergio Penagos",
        location: "Colombia",
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
        name: "Sergio Penagos",
        location: "Colombia",
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
AOS.init({
  offset: 100,
  duration: 800,
  easing: "ease-in-out",
  delay: 0,
  once: true,
  mirror: false,
  anchorPlacement: "top-bottom",
} as AosOptions);
const pinia = createPinia();
app.use(pinia);

const themeStore = useThemeStore();
app.provide("themeStore", themeStore);

const languageStore = useLanguageStore();
app.provide("languageStore", languageStore);

app.mount("#app");
