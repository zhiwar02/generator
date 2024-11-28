import { createApp } from "vue";
import { createPinia } from "pinia";
import { seedAdmins } from "./tables/admins"; // Import the seed function

import App from "./App.vue";
import router from "./router";
import { registerSW } from "virtual:pwa-register";
import PrimeVue from "primevue/config";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/base.css";
import "./assets/main.css";

registerSW({ immediate: true });
seedAdmins();
const app = createApp(App);
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.mount("#app");
