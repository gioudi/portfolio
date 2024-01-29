<template>
  <div class="container-fluid py-5 has-text-centered">
    <h2 class="title is-2">My Career</h2>
    <div class="columns">
      <div class="column is-xl-10 is-offset-1 col-sm-8 col-sm-offset-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps(["timelineItems"]);
const isHovered = ref(false);

const handleMouseOver = (index: any) => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};
</script>
