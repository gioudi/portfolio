<template>
  <section class="container content-baseline pt-6 hv-100">
    <div class="columns px-3">
      <article class="column is-half is-offset-one-quarter">
        <router-link to="/">Go back</router-link>
        <div class="login-form">
          <h2 class="title is-2 has-text-centered mb-6">Hi! Welcome</h2>

          <form class="mt-6" @submit.prevent="login">
            <div class="field">
              <label class="label">Username, Email</label>
              <div class="control">
                <Field
                  name="username"
                  class="input"
                  v-model="username"
                  type="text"
                />
                <ErrorMessage name="username" class="has-text-danger" />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <Field
                  name="password"
                  class="input"
                  v-model="password"
                  type="password"
                />
                <ErrorMessage name="password" class="has-text-danger" />
              </div>
            </div>

            <button class="button is-primary" type="submit">Log In</button>
          </form>
        </div>
        <FooterLine />
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "@/store/auth";
import router from "@/router";

export default defineComponent({
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      }),
    });

    const username = ref("");
    const password = ref("");

    const authStore = useAuthStore();

    const login = handleSubmit(async (values) => {
      try {
        await authStore.login(values.username, values.password);
        router.push("/create-project");
      } catch (error) {
        alert("Invalid credentials!");
      }
    });

    return { username, password, login };
  },
});
</script>
