// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    admin: {
      is_super_admin: localStorage.getItem("super_admin") || false,
      username: "",
      password: "",
      name: "",
      id: null,
    }, // Store admin data if needed
  }),
  actions: {
    login(admin) {
      this.isLoggedIn = true;
      this.admin = admin;
      this.admin.is_super_admin = localStorage.setItem(
        "super_admin",
        admin.is_super_admin
      );
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("auth", JSON.stringify(admin));
    },
    logout() {
      this.isLoggedIn = false;
      this.admin = {
        is_super_admin: false,
        username: "",
        password: "",
        name: "",
        id: null,
      };
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("auth");
      localStorage.removeItem("super_admin");
    },
    initializeAuth() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const adminData = localStorage.getItem("auth");

      if (isLoggedIn && adminData) {
        this.isLoggedIn = true;
        this.admin = JSON.parse(adminData);
        this.admin.is_super_admin = localStorage.getItem("super_admin") || false;
      } else {
        this.isLoggedIn = false;
        this.admin = {
          is_super_admin: false,
          username: "",
          password: "",
          name: "",
          id: null,
        };
      }
    },
  },
});
