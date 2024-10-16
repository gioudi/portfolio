<template>
  <button @click="toggleLanguage" class="language-toggle-button">
    <span class="icon">
      <i v-if="currentLanguage === 'en'" class="fas fa-flag-usa"></i>
      <i v-else class="fas fa-flag"></i>
    </span>
  </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { usePinia } from "pinia";

const pinia = usePinia();
const i18n = useI18n();

const currentLanguage = pinia.state.language.currentLanguage;

const toggleLanguage = () => {
  const newLanguage = currentLanguage === "en" ? "es" : "en";
  pinia.state.language.setCurrentLanguage(newLanguage);
  i18n.global.locale = newLanguage;
};
</script>

<style scoped lang="scss">
.language-toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;

  .icon {
    font-size: 1.5rem;
    color: #333; // Adjust the color based on your design
    transition: color 0.3s ease-in-out;
  }

  &:hover .icon {
    color: #ff9800; // Change the color on hover
  }
}
</style>
