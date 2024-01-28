import { defineStore } from "pinia";

export const useLanguageStore = defineStore({
  id: "language",
  state: () => ({
    currentLanguage: "en",
  }),
  actions: {
    setCurrentLanguage(newLanguage: string) {
      this.currentLanguage = newLanguage;
    },
  },
});
