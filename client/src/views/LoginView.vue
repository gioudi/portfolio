<template>
  <section class="section login-section hv-100">
    <div class="container">
      <div class="columns is-centered">
        <article class="column is-5-desktop is-6-tablet is-10-mobile">
          <div class="card login-card" data-aos="fade-up">
            <div class="card-content">
              <h2 class="title is-3 has-text-centered mb-2">
                {{ t("login.welcome") }}
              </h2>
              <p class="has-text-centered has-text-grey mb-4">
                {{ t("login.hint") }}
              </p>

              <form @submit.prevent="login">
                <div class="field">
                  <label class="label" for="username">{{
                    t("login.username")
                  }}</label>
                  <div class="control has-icons-left">
                    <Field
                      id="username"
                      name="username"
                      class="input"
                      v-model="username"
                      type="text"
                      autocomplete="username"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                  <ErrorMessage name="username" class="help is-danger" />
                </div>

                <div class="field">
                  <label class="label" for="password">{{
                    t("login.password")
                  }}</label>
                  <div class="control has-icons-left">
                    <Field
                      id="password"
                      name="password"
                      class="input"
                      v-model="password"
                      type="password"
                      autocomplete="current-password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                  <ErrorMessage name="password" class="help is-danger" />
                </div>

                <p
                  v-if="authError"
                  class="help is-danger has-text-centered mb-2"
                >
                  {{ authError }}
                </p>

                <button
                  class="button login-button is-fullwidth mt-3"
                  type="submit"
                  :disabled="submitting"
                >
                  {{ submitting ? "…" : t("login.submit") }}
                </button>
              </form>

              <div class="has-text-centered mt-4">
                <router-link to="/" class="is-size-7">
                  ← {{ t("login.goBack") }}
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/store/auth";
import router from "@/router";

export default defineComponent({
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const authError = ref("");
    const submitting = ref(false);

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        username: yup.string().required(t("login.username")),
        password: yup.string().required(t("login.password")),
      }),
    });

    const username = ref("");
    const password = ref("");

    const login = handleSubmit(async (values) => {
      authError.value = "";
      submitting.value = true;
      try {
        await authStore.login(values.username, values.password);
        router.push("/create-project");
      } catch {
        authError.value = t("login.invalid");
      } finally {
        submitting.value = false;
      }
    });

    return { username, password, login, authError, submitting };
  },
});
</script>

<style scoped lang="scss">
.login-section {
  display: flex;
  align-items: center;
}

.login-card {
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(51, 51, 51, 0.12);
  border-top: 4px solid #333;
}

.login-button {
  background-color: #333;
  color: #f2f2f2;
  font-weight: 700;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
  }
}
</style>
