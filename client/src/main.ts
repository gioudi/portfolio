import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import en from "./i18n/en";
import es from "./i18n/es";
import "./styles/main.scss";

import { register } from "register-service-worker";

const app = createApp(App);

app.use(router);

const savedLocale = localStorage.getItem("locale");

const i18n = createI18n({
  locale: savedLocale === "es" ? "es" : "en",
  fallbackLocale: "en",
  allowComposition: true,
  messages: { en, es },
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
