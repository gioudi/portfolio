import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import VueScrollReveal from "vue-scroll-reveal";
import "./styles/main.scss";
import { useThemeStore } from "./store/theme";
import { useLanguageStore } from "./store/language";

import useNotify from "vue3-notify";

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

app.use(VueScrollReveal);
app.use(useNotify);

const pinia = createPinia();
app.use(pinia);

const themeStore = useThemeStore();
app.provide("themeStore", themeStore);

const languageStore = useLanguageStore();
app.provide("languageStore", languageStore);

app.mount("#app");
