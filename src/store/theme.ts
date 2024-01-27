import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    isDarkTheme: false,
  }),
  actions: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
  },
});
