<template>
  <!-- Footer -->
  <footer class="footer bg-dark" style="margin-top: 300px">
    <div class="container">
      <ul class="nav nav-pills nav-justified">
        <li class="nav-item">
          <router-link
            activeClass="active"
            extractActiveClass=""
            :to="{ name: 'dashboard' }"
            class="nav-link"
          >
            <span>
              <i class="nav-icon bi bi-house"></i>
              <span class="nav-text">ماڵەوە</span>
            </span>
          </router-link>
        </li>

        <li class="nav-item" v-if="admin">
          <router-link
            activeClass="active"
            extractActiveClass=""
            :to="{ name: 'admins' }"
            class="nav-link"
          >
            <span>
              <i class="nav-icon bi bi-person"></i>
              <span class="nav-text">ئەدمینەکان</span>
            </span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            activeClass="active"
            extractActiveClass=""
            :to="{ name: 'users' }"
            class="nav-link"
          >
            <span>
              <i class="nav-icon bi bi-people"></i>
              <span class="nav-text">بەژداربوان</span>
            </span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            activeClass="active"
            extractActiveClass=""
            :to="{ name: 'invoices' }"
            class="nav-link"
          >
            <span>
              <i class="nav-icon bi bi-pen"></i>
              <span class="nav-text">پسوڵەکان</span>
            </span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
                     <button type="button" @click.prevent="logout" class="nav-link" >
                        <span>
                            <i class="nav-icon bi bi-box-arrow-left"></i>
                            <span class="nav-text">چوونەدەرەوە</span>
                        </span>
                    </button >
                </li>
                -->
      </ul>
    </div>
  </footer>
  <!-- Footer ends-->
</template>
<script setup>
import { useRouter } from "vue-router"; // To navigate after successful login
import { useAuthStore } from "@/stores/auth";
import { computed, watch } from "vue";

const router = useRouter();
const store = useAuthStore();
const admin = computed(() => store.admin.is_super_admin === "super_admin");

const logout = () => {
  store.logout();
  router.push("/");
};
</script>
<style>
footer {
  position: relative; /* Make sure it doesn't overlap content */
  width: 100%;
  background-color: #f8f9fa;
  text-align: center;
  padding: 10px 0;
  margin-top: 100px;
}
</style>
