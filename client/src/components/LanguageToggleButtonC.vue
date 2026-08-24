<template>
  <button
    @click="toggleLanguage"
    class="language-toggle-button button is-small"
    :title="
      currentLanguage === 'en' ? 'Switch to Español' : 'Cambiar a English'
    "
  >
    <span class="icon-text">
      <span class="icon">
        <i v-if="currentLanguage === 'en'" class="fas fa-language"></i>
        <i v-else class="fas fa-language"></i>
      </span>
      <span>{{ currentLanguage === "en" ? "ES" : "EN" }}</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "../store/language";

const i18n = useI18n();
const languageStore = useLanguageStore();

const currentLanguage = computed(() => languageStore.currentLanguage as string);

const toggleLanguage = () => {
  const newLanguage = currentLanguage.value === "en" ? "es" : "en";
  languageStore.setCurrentLanguage(newLanguage);
  i18n.locale.value = newLanguage;
  localStorage.setItem("locale", newLanguage);
  document.documentElement.setAttribute("lang", newLanguage);
};
</script>

<style scoped lang="scss">
.language-toggle-button {
  .icon-text {
    font-weight: 700;
    letter-spacing: 0.03em;
  }
}
</style>
