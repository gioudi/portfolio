<!-- ToggleButton.vue -->

<template>
  <button @click="toggleTheme" class="toggle-button">
    <span class="icon">
      <i v-if="isDarkTheme" class="fas fa-sun"></i>
      <i v-else class="fas fa-moon"></i>
    </span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { usePinia } from "pinia";

const pinia = usePinia();
const isDarkTheme = pinia.state.theme.isDarkTheme;

const toggleTheme = () => {
  pinia.state.theme.toggleTheme();
};
</script>

<style scoped lang="scss">
.toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;

  .icon {
    font-size: 1.5rem;
    color: #333;
    transition: color 0.3s ease-in-out;
  }

  &:hover .icon {
    color: #ff9800;
  }
}
</style>
