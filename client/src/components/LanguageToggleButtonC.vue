<template>
  <button
    @click="toggleLanguage"
    class="language-toggle-button"
    :title="
      currentLanguage === 'en' ? 'Switch to Español' : 'Cambiar a English'
    "
  >
    <span class="icon is-small">
      <i class="fas fa-language"></i>
    </span>
    <span>{{ currentLanguage === "en" ? "ES" : "EN" }}</span>
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
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #000;
  padding: 0.25rem 0.15rem;
  transition: border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;

  &:hover {
    border-bottom-color: rgba(51, 51, 51, 0.6);
    opacity: 0.8;
  }
}
</style>
