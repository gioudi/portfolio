<template>
  <div class="skills py-5" data-aos="fade-up">
    <h2 class="title is-2 has-text-centered">Skills</h2>
    <div class="columns is-multiline">
      <!-- Backend Section -->
      <div
        class="skills-section column"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h3 class="subtitle is-3">Backend</h3>

        <div
          v-for="skill in backendSkills"
          :key="skill.name"
          class="is-flex is-justify-content-space-between"
          data-aos="fade-up"
          :data-aos-delay="skill.delay"
        >
          <div class="container-icon is-flex is-align-items-center">
            <i
              :class="` mr-3 colored ${skill.icon}`"
              alt="Skill Icon"
              class=""
            ></i
            >{{ skill.name }}
          </div>
        </div>
      </div>

      <!-- Frontend Section -->
      <div
        class="skills-section column"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 class="subtitle is-3">Frontend</h3>

        <div
          v-for="skill in frontendSkills"
          :key="skill.name"
          class="is-flex is-justify-content-space-between"
          data-aos="fade-up"
          :data-aos-delay="skill.delay"
        >
          <div class="container-icon is-flex is-align-items-center">
            <i
              :class="`mr-3 colored ${skill.icon}`"
              alt="Skill Icon"
              class=""
            ></i>
            {{ skill.name }}
          </div>
        </div>
      </div>

      <!-- Tools Section -->
      <div
        class="skills-section column"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h3 class="subtitle is-3">Tools</h3>
        <div
          v-for="tool in tools"
          :key="tool.name"
          class="is-flex is-justify-content-space-between"
          data-aos="fade-up"
          :data-aos-delay="tool.delay"
        >
          <div class="container-icon is-flex is-align-items-center">
            <i
              :class="`mr-3 colored ${tool.icon}`"
              alt="Tool Icon"
              class=""
            ></i>
            {{ tool.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const backendSkills = [
  { name: "Laravel", icon: "devicon-laravel-plain", delay: 100 },
  { name: "MySQL", icon: "devicon-mysql-plain", delay: 200 },
];

const frontendSkills = [
  { name: "Vue.js", icon: "devicon-vuejs-plain", delay: 100 },
  { name: "React", icon: "devicon-react-original", delay: 200 },
  { name: "React Native", icon: "devicon-react-original", delay: 300 },
  { name: "JavaScript", icon: "devicon-javascript-plain", delay: 400 },
  { name: "TypeScript", icon: "devicon-typescript-plain", delay: 500 },
  { name: "Bulma", icon: "devicon-bulma-plain", delay: 600 },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain", delay: 700 },
  { name: "Sass", icon: "devicon-sass-original", delay: 800 },
];

const tools = [
  { name: "Git", icon: "devicon-git-plain", delay: 100 },
  { name: "GitHub", icon: "devicon-github-original", delay: 200 },
  { name: "Eslint", icon: "devicon-eslint-original", delay: 300 },
  { name: "Jira", icon: "devicon-jira-plain", delay: 400 },
  { name: "Figma", icon: "devicon-figma-plain", delay: 500 },
  { name: "Trello", icon: "devicon-trello-plain", delay: 600 },
  { name: "Slack", icon: "devicon-slack-plain", delay: 700 },
  { name: "Bitbucket", icon: "devicon-bitbucket-original", delay: 800 },
];
</script>

<style lang="scss">
.container-icon {
  filter: grayscale(100);
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: grayscale(0) !important;
  }
}
</style>
