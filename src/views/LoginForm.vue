<template>
  <div class="body-scroll d-flex flex-column min-h-full dark-bg">
    <!-- Begin page content -->
    <main class="container-fluid h-100 mt-40">
      <div class="row h-100">
        <div
          class="col-10 col-md-6 col-lg-5 col-xl-3 mx-auto mt-auto pt-4 text-center mb-100px d-grid gap-2"
        >
          <h3 class="mb-1">چوونەژووەرەوە</h3>

          <!-- Username input -->
          <div class="form-group form-floating is-valid">
            <input
              type="text"
              class="form-control"
              v-model="username"
              id="username"
              placeholder="ناوی بەکارهێنەر"
              required
            />
            <label class="form-control-label" for="username"
              >ناوی بەکارهێنەر</label
            >
          </div>

          <!-- Password input -->
          <div class="form-group form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="تێپەڕە وشە"
              required
            />
            <label class="form-control-label" for="password">تێپەڕە وشە</label>
          </div>

          <!-- Login button -->
          <button
            type="button"
            @click="login"
            class="btn btn-lg btn-success btn-block mt-3"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            {{ isLoading ? "چوونەژوورەوە..." : "چوونەژوورەوە" }}
          </button>

          <!-- Error message -->
          <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { adminLogin, getAdmins } from "@/tables/admins"; // Import the login and fetch functions from Dexie setup
import { useRouter } from "vue-router"; // To navigate after successful login
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false); // Track loading state
const router = useRouter();
const store = useAuthStore();

const login = async () => {
  errorMessage.value = ""; // Clear previous error message
  isLoading.value = true; // Set loading state

  try {
    const adminData = await adminLogin(username.value, password.value);
    store.login(adminData); // Set the logged-in state in the store
    await fetchAdmins(); // Fetch the admin list after successful login
    // Redirect to the admin dashboard or another page
    router.push("/dashboard").then(() => {
      window.location.reload(); // Force a reload to ensure state is applied
    });
  } catch (error) {
    errorMessage.value = error.message; // Display error message
  } finally {
    isLoading.value = false; // Reset loading state
  }
};

// Fetch all admins after successful login
const fetchAdmins = async () => {
  try {
    const adminsList = await getAdmins(); // Retrieve admins from the database
    console.log("Fetched Admins:", adminsList); // You can handle the list as needed
  } catch (error) {
    console.error("Error fetching admins:", error); // Log any errors
  }
};
</script>

<style scoped>
.body-scroll {
  overflow-y: auto; /* Allow scrolling for longer content */
}
</style>
