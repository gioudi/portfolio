import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectDetailView from "../views/ProjectDetailView.vue";
import LoginView from "@/views/LoginView.vue";
import CreateProjectView from "@/views/CreateProjectView.vue";
import { useAuthStore } from "@/store/auth";

const BASE_TITLE = "Sergio Penagos — Software Engineer | Portfolio";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: BASE_TITLE,
      description:
        "Software Engineer specializing in scalable web applications, design systems, and component-driven development. View my projects, skills, and experience.",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: `Login — ${BASE_TITLE}`,
      description: "Login to manage portfolio projects.",
      requiresAuth: false,
    },
  },
  {
    path: "/project/:id",
    name: "projectDetail",
    component: ProjectDetailView,
    meta: {
      title: `Project — ${BASE_TITLE}`,
      description:
        "Detailed view of a portfolio project — technologies, responsibilities, and evidence.",
    },
  },
  {
    path: "/create-project",
    name: "createProject",
    component: CreateProjectView,
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
  } else {
    next();
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
