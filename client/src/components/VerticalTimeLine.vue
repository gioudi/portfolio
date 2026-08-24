<template>
  <h2
    id="about"
    class="title is-2 has-text-centered mb-2"
    data-aos="fade-right"
  >
    {{ t("timeline.heading") }}
  </h2>
  <p class="has-text-centered timeline-hint mb-3">
    <span class="icon is-small mr-1"><i class="fas fa-arrows-alt-v"></i></span>
    {{ t("timeline.scrollHint") }}
  </p>
  <section class="container timeline-wrap">
    <div class="timeline-scroll">
      <article
        v-for="(key, index) in eventKeys"
        :key="key"
        class="timeline-block"
        :class="{
          'timeline-block-right': index % 2 !== 0,
          'timeline-block-left': index % 2 === 0,
        }"
      >
        <div class="marker"></div>
        <div class="timeline-content" data-aos="fade-up">
          <i :class="eventIcon(key)"></i>
          <p class="has-text-weight-bold">
            {{ t(`timeline.events.${key}.title`) }}
            <small>{{ t(`timeline.events.${key}.date`) }}</small>
          </p>
          <span>{{ t(`timeline.events.${key}.subtitle`) }}</span>
          <p>{{ t(`timeline.events.${key}.description`) }}</p>
        </div>
      </article>
    </div>
    <div class="timeline-fade" aria-hidden="true"></div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const eventIcons: Record<string, string> = {
  degree2026: "fas fa-graduation-cap",
  ba: "fas fa-plane",
  helitours: "fas fa-helicopter",
  mha: "fas fa-heartbeat",
  medellin: "fas fa-city",
  vass: "fas fa-briefcase",
  senaAnalyst: "fas fa-graduation-cap",
  dolphin: "fas fa-oil-can",
  qoopa: "fas fa-mobile-alt",
  soul: "fas fa-laptop-code",
  senaTech: "fas fa-graduation-cap",
  conex: "fas fa-globe-americas",
};

const eventKeys = [
  "degree2026",
  "ba",
  "helitours",
  "mha",
  "medellin",
  "vass",
  "senaAnalyst",
  "dolphin",
  "qoopa",
  "soul",
  "senaTech",
  "conex",
];

const eventIcon = (key: string) => eventIcons[key] ?? "fas fa-circle";
</script>

<style lang="scss">
@import "../styles/variables";

.timeline-wrap {
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.timeline-scroll {
  max-height: 32rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(51, 51, 51, 0.35) transparent;
  mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(51, 51, 51, 0.35);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.timeline-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  background: linear-gradient(to bottom, rgba(242, 242, 242, 0), #f2f2f2 85%);
  pointer-events: none;
}

.timeline {
  width: 100%;
  padding: 1.5rem 0;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.timeline:before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -0.0625rem;
  height: 100%;
  border: 0.0625rem dashed $info;
  z-index: 1;
}

.timeline-block {
  width: calc(50% + 0.5rem);
  display: flex;
  justify-content: space-between;
  clear: both;
}

.timeline-block-right {
  float: right;
}

.timeline-block-left {
  float: left;
  direction: rtl;
}

.marker {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px dotted $background;
  background: $primary;
  margin-top: 0.625rem;
  z-index: 9999;
  flex-shrink: 0;
}

.timeline-content {
  width: 95%;
  padding: 0.25rem 0.9375rem;
  color: $primary;

  i {
    color: $info;
    margin-right: 0.375rem;
  }
}

.timeline-content span {
  font-size: 0.9375rem;
  color: $info;
}

.timeline-content p {
  font-size: 0.875rem;
  line-height: 1.5em;
  word-spacing: 0.0625rem;
  color: $primary;
  margin-top: 0.25rem;
}

@media screen and (max-width: 768px) {
  .timeline-wrap {
    width: 100%;
    padding-left: 0.75rem;
  }
  .timeline:before {
    left: 0.5rem;
    margin-left: 0;
  }
  .timeline-block {
    width: 100%;
    margin-bottom: 1.25rem;
  }
  .marker {
    margin-right: 0.5rem;
  }
  .timeline-block-right {
    float: none;
  }
  .timeline-block-left {
    float: none;
    direction: ltr;
  }
}
</style>
