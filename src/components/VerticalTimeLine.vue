<template>
  <h2 class="title is-2 has-text-centered" data-aos="fade-right">About me</h2>
  <div class="container timeline">
    <div
      v-for="(event, index) in events"
      :key="index"
      class="timeline-block"
      :class="{
        'timeline-block-right': index % 2 !== 0,
        'timeline-block-left': index % 2 === 0,
      }"
    >
      <div class="marker"></div>
      <div class="timeline-content" v-if="index % 2 !== 0" data-aos="fade-left">
        <i :class="event.icon"></i>
        <h5>
          {{ event.title }} <small>{{ event.date }}</small>
        </h5>
        <span>{{ event.subtitle }}</span>
        <p>{{ event.description }}</p>
      </div>
      <div class="timeline-content" v-else data-aos="fade-right">
        <i :class="event.icon"></i>
        <h5>
          {{ event.title }} <small>{{ event.date }}</small>
        </h5>
        <span>{{ event.subtitle }}</span>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    date: "Au2021 - Jan/2024",
    title: "Worked at Vass",
    subtitle: "Position: Web Developer",
    description: "",
    icon: "fas fa-briefcase",
  },
  {
    date: "Abr/2020 - Jul/2022",
    title: "Graduated from Sena",
    subtitle: "Associate's Degree: Technologist Analysis of Information System",
    description: "lorem",
    icon: "fas fa-graduation-cap",
  },
  {
    date: "Dec/2019 - Mar/2021",
    title: "Worked at Intevo",
    subtitle: "Position: Web Developer",
    description: "",
    icon: "fas fa-briefcase",
  },
  {
    date: "Apr/2019 - Nov/2019",
    title: "Worked at Soulmedical",
    subtitle: "Position: Web Developer",
    description: "",
    icon: "fas fa-briefcase",
  },
  {
    date: "Oct/2018 - Nov/2019",
    title: "Graduated from Sena",
    subtitle: "Associate's Degree: Technical Software Developer",
    description: "",
    icon: "fas fa-graduation-cap",
  },
  {
    date: "Oct/2017 - Dec/2018",
    title: "Worked at ConexTravel",
    subtitle: "Position: Web Developer",
    description: "",
    icon: "fas fa-briefcase",
  },
];
</script>

<style lang="scss">
@import "../styles/variables";

.timeline {
  width: 80%;
  padding: 3.125rem 0;
  margin: 3.125rem auto;
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
  width: -webkit-calc(50% + 0.5rem);
  width: -moz-calc(50% + 0.5rem);
  width: calc(50% + 0.5rem);
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
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
}

.timeline-content {
  width: 95%;
  padding: 0 0.9375rem;
  color: $primary;
}

.timeline-content h3 {
  margin-top: 0.3125rem;
  margin-bottom: 0.3125rem;
  font-size: 1.5625rem;
  font-weight: 500;
  color: $primary;
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
}

@media screen and (max-width: 768px) {
  .container:before {
    left: 0.5rem;
  }
  .timeline-block {
    width: 100%;
    margin-bottom: 1.875rem;
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
