<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <!-- Personal Information -->
        <div class="column has-text-centered">
          <p>&copy; {{ t("footer.name") }}. All rights reserved.</p>
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
