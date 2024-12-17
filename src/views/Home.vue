<template>
  <!-- Begin page -->
  <main class="h-100 has-header has-footer">
    <div class="main-container container" style="min-height: 184px">
      <!-- carousel category -->
      <div class="row">
        <div class="col-12">
          <h1 class="text-center text-3xl mb-1">مۆلیدەی خەلەکان</h1>
          <!-- category carousel -->
          <div class="row">
            <div class="container my-5">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="gradient-card py-5">
                    <h1 class="text-center text-3xl mb-4">ئامارەکان</h1>
                    <div class="row">
                      <h3 class="col-6 mt-2">کۆی داهاتی مانگ:</h3>
                      <p
                        class="col-6 bg-success py-2 text-center"
                        style="border-radius: 10px"
                      >
                        {{ price }} د.ع
                      </p>
                    </div>
                    <div class="row mt-2">
                      <h3 class="col-6 mt-2">کۆی بەژداربوان:</h3>
                      <p
                        class="col-6 bg-info py-2 text-center"
                        style="border-radius: 10px"
                      >
                        {{ users }}
                      </p>
                    </div>
                    <div class="row mt-2">
                      <h3 class="col-6 mt-2">کۆی بەکارهێنەر:</h3>
                      <p
                        class="col-6 bg-dark py-2 text-white text-center"
                        style="border-radius: 10px"
                      >
                        {{ admins }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container px-0" style="margin-bottom: 100px">
              <div
                class="swiper-wrapper"
                id="swiper-wrapper-136d4dad92255549"
                aria-live="polite"
                style="
                  transition-duration: 0ms;
                  transform: translate3d(0px, 0px, 0px);
                "
              >
                <router-link :to="{ name: 'dashboard' }">
                  <div class="text-center" role="group" aria-label="1 / 10">
                    <!-- add active class when item category need active need to show -->

                    <div class="card shadow-sm mb-2">
                      <div class="card-body">
                        <div class="h2 mb-0">
                          <i class="bi bi-house"></i>
                        </div>
                        <p class="small">ماڵەوە</p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <router-link
                  v-if="store.admin.is_super_admin === 'super_admin'"
                  :to="{ name: 'admins' }"
                >
                  <div
                    class="swiper-slide text-center swiper-slide-next"
                    role="group"
                    aria-label="2 / 10"
                  >
                    <div class="card shadow-sm mb-2">
                      <div class="card-body">
                        <div class="h2 mb-0">
                          <i class="bi bi-person"></i>
                        </div>
                        <p class="small">ئەدمینەکان</p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <router-link :to="{ name: 'users' }">
                  <div
                    class="swiper-slide text-center"
                    role="group"
                    aria-label="3 / 10"
                  >
                    <div class="card shadow-sm mb-2">
                      <div class="card-body">
                        <div class="h2 mb-0">
                          <i class="bi bi-people"></i>
                        </div>
                        <p class="small">بەژداربوان</p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <router-link :to="{ name: 'invoices' }">
                  <div
                    class="swiper-slide text-center"
                    role="group"
                    aria-label="4 / 10"
                  >
                    <div class="card shadow-sm mb-2">
                      <div class="card-body">
                        <div class="h2 mb-0">
                          <i class="bi bi-pen"></i>
                        </div>
                        <p class="small">پسوڵەکان</p>
                      </div>
                    </div>
                  </div>
                </router-link>
                <div
                  class="swiper-slide text-center"
                  role="group"
                  aria-label="4 / 10"
                  @click.prevent="logout"
                >
                  <div class="card shadow-sm mb-2">
                    <div class="card-body">
                      <div class="h2 mb-0">
                        <i class="bi bi-box-arrow-left"></i>
                      </div>
                      <p class="small">چوونە دەرەوە</p>
                    </div>
                  </div>
                </div>
              </div>
              <span
                class="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <AppToast />
  <Footer />
</template>
<script setup>
import AppToast from "@/layouts/AppToast.vue";
import Footer from "@/layouts/Footer.vue";
import { getDashboardStats } from "@/tables/home";
import { ref, onMounted, computed } from "vue";
let admins = ref(0);
let users = ref(0);
let price = ref(0);

// Fetch dashboard stats
const fetchDashboardStats = async () => {
  try {
    const stats = await getDashboardStats();
    admins.value = stats.admins || 0;
    users.value = stats.users || 0;
    price.value = stats.price || 0;
    console.log("Dashboard Stats:", admins.value, users.value, price.value);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }
};

// Call fetchDashboardStats when the component is mounted
// Computed Property for Total Amount
// Call fetchDashboardStats when the component is mounted
onMounted(() => {
  fetchDashboardStats();
});

import { useRouter } from "vue-router"; // To navigate after successful login
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const store = useAuthStore();
const logout = () => {
  store.logout();
  router.push("/");
};
</script>
<style scoped>
.gradient-card {
  border-radius: 15px;
  background-image: url("/assets/img/cover.jpg"); /* Gradient colors */
  color: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.gradient-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}
</style>
