<template>
  <div class="vertical-timeline">
    <div class="timeline-section">
      <div class="container">
        <div class="timeline-block">
          <div
            v-for="(item, index) in timelineItems"
            :key="index"
            class="timeline-item"
          >
            <div
              class="timeline-content"
              @mouseover="handleMouseOver(index)"
              @mouseleave="handleMouseLeave"
            >
              <span class="date">{{ item.date }}</span>
              <div class="timeline-marker"></div>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
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

<style scoped lang="scss"></style>
