<template>
  <div class="vertical-timeline py-5">
    <div class="timeline-section">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        class="timeline-item"
      >
        <div
          class="timeline-decoration mr-5"
          @mouseover="handleMouseOver(index)"
          @mouseleave="handleMouseLeave"
        >
          <i class="fa-solid timeline-decoration-item fa-circle"></i>
        </div>
        <div class="timeline-content">
          <span class="date">{{ item.date }}</span>
          <p class="description">{{ item.description }}</p>
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

<style scoped lang="scss">
@import "../styles/variables";
.timeline-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-content: flex-start;
}

.timeline-item {
  display: flex;
  padding: 1.5625rem 0;
  align-items: center;
}

.timeline-decoration {
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 100%;
  box-sizing: border-box;
  padding: 0.125rem;
  border: 1px solid $info;
  justify-content: center;
  align-items: center;

  .timeline-decoration-icon {
    font-size: 1.5rem;
    color: $info;
  }

  &::after {
    content: "";
    height: 3.125rem;
    position: absolute;
    bottom: -3.125rem;
    right: 0.9375rem;
    background: $info;
    border-left: 1px dashed $info;
  }
}

.timeline-content {
  max-width: 15.625rem;

  .date {
    font-size: 14px;
    font-weight: 700;
  }

  .description {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
