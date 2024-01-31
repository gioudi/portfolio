<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <!-- Personal Information -->
        <div class="column">
          <h3 class="title is-5">{{ t("footer.personalInfo") }}</h3>
          <p>{{ t("footer.name") }}</p>
          <p>{{ t("footer.location") }}</p>
        </div>

        <!-- Social Media Links -->
        <div class="column">
          <h3 class="title is-5">{{ t("footer.socialMedia") }}</h3>
          <a
            href="https://www.linkedin.com/in/analyst-sergio-penagos/"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t("footer.linkedIn") }}</a
          >
          <a href="#" target="_blank" rel="noopener noreferrer">{{
            t("footer.twitter")
          }}</a>
        </div>

        <!-- Contact Information -->
        <div class="column">
          <h3 class="title is-5">{{ t("footer.contact") }}</h3>
          <p>{{ t("footer.email") }}: sergiopenagos881@gmail.com</p>
        </div>

        <!-- Portfolio Info -->
        <div class="column">
          <h3 class="title is-5">{{ t("footer.portfolio") }}</h3>
          <p>{{ t("footer.frontendDeveloper") }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>
