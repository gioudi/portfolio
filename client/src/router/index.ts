import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/auth";

const BASE_TITLE = "Sergio Penagos — Software Engineer | Portfolio";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: BASE_TITLE,
      description:
        "Software Engineer specializing in scalable web applications, design systems, and component-driven development. View my projects, skills, and experience.",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      title: `Login — ${BASE_TITLE}`,
      description: "Login to manage portfolio projects.",
      requiresAuth: false,
    },
  },
  {
    path: "/project/:id",
    name: "projectDetail",
    component: () => import("../views/ProjectDetailView.vue"),
    meta: {
      title: `Project — ${BASE_TITLE}`,
      description:
        "Detailed view of a portfolio project — technologies, responsibilities, and evidence.",
    },
  },
  {
    path: "/create-project",
    name: "createProject",
    component: () => import("@/views/CreateProjectView.vue"),
    meta: {
      title: `Create Project — ${BASE_TITLE}`,
      description: "Create a new portfolio project.",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.loggedIn) {
    next("/login");
  } else if (to.name === "login" && authStore.loggedIn) {
    next("/create-project");
  } else {
    next();
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
