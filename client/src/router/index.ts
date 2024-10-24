import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectDetailView from "../views/ProjectDetailView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/store/auth";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/project/:id",
    name: "projectDetail",
    component: ProjectDetailView,
  },
  {
    path: "/create-project",
    name: "projectDetail",
    component: ProjectDetailView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
