import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const Login = () => import("@/views/LoginForm.vue");
const Home = () => import("@/views/Home.vue");
const Users = () => import("@/views/Users.vue");
const Admins = () => import("@/views/Admins.vue");
const Invoices = () => import("@/views/Invoices.vue");
const PrintInvoices = () => import("@/views/PrintInvoices.vue");
const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: "users",
    path: "/users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    name: "admins",
    path: "/admins",
    component: Admins,
    meta: { requiresAuth: true },
  },
  {
    name: "invoices",
    path: "/invoices",
    component: Invoices,
    meta: { requiresAuth: true },
  },
  {
    path: "/print-invoices/:id",
    name: "print-invoices",
    component: PrintInvoices,
    meta: { requiresAuth: true },
  },

  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});
router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();

  // Wait for the store to be ready if necessary
  if (!store.isHydrated) {
    await store.initializeAuth(); // Replace with the actual method to fetch state
  }

  if (
    to.meta.requiresAuth &&
    !localStorage.getItem("isLoggedIn") &&
    !localStorage.getItem("auth")
  ) {
    next("/"); // Redirect to login page
  } else if (
    to.path === "/" &&
    localStorage.getItem("isLoggedIn") &&
    localStorage.getItem("auth") &&
    (store.admin.is_super_admin === "admin" ||
      store.admin.is_super_admin === "super_admin")
  ) {
    next("/dashboard"); // Redirect to dashboard
  } else {
    next(); // Proceed
  }
});

export default router;
