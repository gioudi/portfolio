import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const i18n = createI18n({
  locale: "en", // Default locale
  messages: {
    en: {
      // Add your English translations
    },
    es: {
      // Add your Spanish translations
    },
  },
});

app.use(i18n);

app.mount("#app");
