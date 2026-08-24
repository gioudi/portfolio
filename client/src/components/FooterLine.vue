<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered">
          <p>
            &copy; {{ year }} {{ t("footer.name") }}. {{ t("footer.rights") }}
          </p>
          <p class="is-size-7 has-text-grey mt-1">
            {{ t("footer.builtWith") }}
          </p>
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
    const year = new Date().getFullYear();
    return { t, year };
  },
});
</script>
