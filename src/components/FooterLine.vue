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
