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
                <input class="input" v-model="username" type="text" required />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  v-model="password"
                  type="password"
                  required
                />
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
import router from "@/router";
import { useAuthStore } from "@/store/auth";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push("/create-project");
        alert("Login successful!");
      } catch (error) {
        alert("Invalid credentials!");
      }
    };

    return { username, password, login };
  },
});
</script>
