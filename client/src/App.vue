<template>
  <nav class="app-nav" role="navigation" aria-label="main navigation">
    <div class="container app-nav__inner">
      <router-link to="/" class="app-nav__brand has-text-weight-bold">
        Jör<span class="app-nav__brand-dot">.</span>
      </router-link>

      <div class="app-nav__actions">
        <LanguageToggleButtonC />
        <template v-if="authStore.loggedIn">
          <router-link to="/create-project" class="button is-small">
            {{ t("nav.createProject") }}
          </router-link>
          <button class="button is-small is-outlined" @click="logout">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            <span>{{ t("nav.logout") }}</span>
          </button>
        </template>
        <router-link v-else to="/login" class="button is-small is-outlined">
          <span class="icon"><i class="fas fa-sign-in-alt"></i></span>
          <span>{{ t("nav.login") }}</span>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import LanguageToggleButtonC from "@/components/LanguageToggleButtonC.vue";
import { useAuthStore } from "@/store/auth";

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style scoped lang="scss">
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(242, 242, 242, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(51, 51, 51, 0.12);
}

.app-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.25rem;
}

.app-nav__brand {
  font-size: 1.35rem;
  color: #000;

  &:hover {
    text-decoration: none;
  }
}

.app-nav__brand-dot {
  color: rgba(51, 51, 51, 0.55);
}

.app-nav__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
