<template>
  <section class="skills py-4" data-aos="fade-up">
    <h2 id="skills" class="title is-2 has-text-centered">
      {{ t("skills.heading") }}
    </h2>
    <div class="columns is-multiline is-mobile">
      <div
        v-for="group in skillGroups"
        :key="group.titleKey"
        class="skills-section column is-half-mobile is-3-desktop is-half-tablet"
        data-aos="fade-up"
      >
        <h3 class="subtitle is-4">{{ t(group.titleKey) }}</h3>

        <div
          v-for="skill in group.items"
          :key="skill.name"
          class="is-flex is-align-items-center"
          data-aos="fade-up"
          :data-aos-delay="skill.delay"
        >
          <div class="container-icon is-flex is-align-items-center">
            <i :class="`mr-3 colored ${skill.icon}`"></i>{{ skill.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const frontendSkills = [
  { name: "Vue.js", icon: "devicon-vuejs-plain", delay: 100 },
  { name: "React", icon: "devicon-react-original", delay: 200 },
  { name: "Angular", icon: "devicon-angular-plain", delay: 300 },
  { name: "React Native", icon: "devicon-react-original", delay: 400 },
  { name: "JavaScript", icon: "devicon-javascript-plain", delay: 500 },
  { name: "TypeScript", icon: "devicon-typescript-plain", delay: 600 },
  { name: "Sass", icon: "devicon-sass-original", delay: 700 },
  { name: "Bulma", icon: "devicon-bulma-plain", delay: 800 },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain", delay: 900 },
];

const backendSkills = [
  { name: "Node.js", icon: "devicon-nodejs-plain", delay: 100 },
  { name: "Python", icon: "devicon-python-plain", delay: 200 },
  { name: "Laravel", icon: "devicon-laravel-plain", delay: 300 },
  { name: "PHP", icon: "devicon-php-plain", delay: 400 },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain", delay: 500 },
  { name: "MySQL", icon: "devicon-mysql-plain", delay: 600 },
];

const tools = [
  { name: "Git / GitHub", icon: "devicon-github-original", delay: 100 },
  { name: "Storybook", icon: "devicon-storybook-plain", delay: 200 },
  { name: "Jest", icon: "devicon-jest-plain", delay: 300 },
  { name: "ESLint", icon: "devicon-eslint-original", delay: 400 },
  { name: "Datadog", icon: "devicon-datadog-plain", delay: 500 },
  { name: "ServiceNow", icon: "fas fa-headset", delay: 600 },
  { name: "Jira", icon: "devicon-jira-plain", delay: 700 },
  { name: "Figma", icon: "devicon-figma-plain", delay: 800 },
  { name: "Docker", icon: "devicon-docker-plain", delay: 900 },
];

const aiSkills = [
  { name: "Claude Code", icon: "fas fa-robot", delay: 100 },
  { name: "OpenCode", icon: "fas fa-terminal", delay: 200 },
  { name: "GitHub Copilot", icon: "fas fa-magic", delay: 300 },
  { name: "ChatGPT", icon: "fas fa-comments", delay: 400 },
  { name: "Gemini", icon: "fas fa-gem", delay: 500 },
];

const skillGroups = [
  { titleKey: "skills.frontend", items: frontendSkills },
  { titleKey: "skills.backend", items: backendSkills },
  { titleKey: "skills.tools", items: tools },
  { titleKey: "skills.ai", items: aiSkills },
];
</script>

<style lang="scss">
.container-icon {
  filter: grayscale(100%);
  opacity: 0.72;
  transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  cursor: default;

  i {
    font-size: 1.25rem;
    transition: inherit;
  }

  &:hover {
    filter: grayscale(0);
    opacity: 1;
    transform: scale(1.2);

    i {
      text-shadow: 0 0 12px rgba(51, 51, 51, 0.35);
    }
  }
}
</style>
