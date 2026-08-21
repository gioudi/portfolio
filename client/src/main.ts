import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import "./styles/main.scss";

import { register } from "register-service-worker";

const app = createApp(App);

app.use(router);

const i18n = createI18n({
  locale: "en",
  allowComposition: true,
  messages: {
    en: {
      footer: {
        name: "Sergio Penagos",
      },
    },
    es: {
      footer: {
        name: "Sergio Penagos",
      },
    },
    de: {
      footer: {
        name: "Sergio Penagos",
      },
    },
  },
});

app.use(i18n);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}

import("aos").then(({ default: AOS }) => {
  AOS.init({
    offset: 100,
    duration: 800,
    easing: "ease-in-out",
    delay: 0,
    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
  });
});
