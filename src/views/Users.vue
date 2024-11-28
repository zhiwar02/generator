<template>
  <!-- main page content -->
  <div class="main-container container">
    <!-- Header -->
    <header class="container-fluid header">
      <div class="row">
        <div class="col pl-0">
          <div class="form-group search-header">
            <!-- Search Icon (initially visible) -->
            <button
              v-if="!isSearchVisible"
              class="btn btn-link tooltip-btn my-3"
              @click="toggleSearch"
            >
              <i
                class="bi bi-search bg-dark text-white px-3 py-2"
                style="border-radius: 5px"
              ></i>
            </button>

            <!-- Search Input (appears when isSearchVisible is true) -->
            <div v-if="isSearchVisible" class="search-container">
              <input
                class="form-control border-0 my-3"
                v-model="searchQuery"
                placeholder="گەڕان"
                @input="handleSearch"
              />
              <button
                type="button"
                class="btn btn-link tooltip-btn"
                @click="handleSearch"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Header ends -->

    <form @submit.prevent="saveUser" class="mt-20">
      <!-- add edit address form -->
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              type="text"
              class="form-control"
              required
              v-model="userForm.name"
              id="address1"
              placeholder="ناو"
            />
            <label class="form-control-label" for="address1">ناو</label>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              type="text"
              class="form-control"
              required
              v-model="userForm.phone"
              id="address2"
              placeholder="ژمارەی مۆبایل"
            />
            <label class="form-control-label" for="address2"
              >ژمارەی مۆبایل</label
            >
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              class="form-control"
              v-model="userForm.amps"
              required
              type="number"
              id="address3"
              placeholder="ژمارەی ئەمپێر"
            />
            <label class="form-control-label" for="address3"
              >ژمارەی ئەمپێر</label
            >
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="col-12 col-md-3 col-lg-3 mx-auto d-grid">
        <div class="d-flex">
          <button
            type="submit"
            class="btn-success btn mb-3 px-4 py-3 rounded-md"
          >
            {{ editing ? "نوێکردنەوەی بەژداربوان" : "زیادکردنی بەژداربوان" }}
          </button>
          <button
            class="btn-danger btn mb-3 px-4 rounded-md mx-2"
            type="button"
            @click="clearForm"
          >
            پاکردنەوە
          </button>
        </div>
      </div>
      <br />
    </form>
  </div>
  <!-- main page content ends -->

  <div>
    <!-- Users List -->
    <div>
      <h2 class="text-center">لیستی بەژداربوان</h2>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          پێشتر
        </button>
        <span class="pagination-info">پەڕە {{ currentPage }}</span>
        <button class="pagination-button" @click="nextPage">دواتر</button>
      </div>

      <table
        class="user-table"
        style="font-family: 'nrt', 'Courier New', Courier, monospace"
      >
        <thead>
          <tr>
            <th>زنجیرە</th>
            <th>ناوی بەژداربوو</th>
            <th>ژمارەی مۆبایل</th>
            <th>ژمارەی ئەمپێر</th>
            <th>کردارەکان</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="overflow-auto">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.amps }}</td>
            <td class="text-end">
              <!-- Dropdown for actions -->
              <div class="dropdown">
                <button
                  class="btn btn-dark dropdown-toggle"
                  type="button"
                  id="invoiceActionsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ⚙️
                </button>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="invoiceActionsDropdown"
                >
                  <li>
                    <button class="dropdown-item mb-3" @click="editUser(user)">
                      نوێکردنەوە
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-danger"
                      @click="destroyUser(user.id)"
                    >
                      سرینەوە
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <AppToast />
  <Footer />
</template>

<script setup>
import AppToast from "@/layouts/AppToast.vue";
import Footer from "@/layouts/Footer.vue";
import { ref, onMounted } from "vue";
import {
  addUser,
  updateUser,
  deleteUser,
  fetchUsersWithPagination,
} from "@/tables/users";
import Swal from "sweetalert2"; // Import SweetAlert2
const isSearchVisible = ref(false); // State to control visibility of search input
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};
const users = ref([]);
const userForm = ref({ id: null, name: "", phone: "", amps: 1 });
const editing = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref("");

const fetchUsers = async (page) => {
  users.value = await fetchUsersWithPagination(
    page,
    itemsPerPage,
    searchQuery.value
  );
};

const saveUser = async () => {
  if (editing.value) {
    await updateUser(userForm.value.id, {
      name: userForm.value.name,
      phone: userForm.value.phone,
      amps: userForm.value.amps,
    });
  } else {
    await addUser({
      name: userForm.value.name,
      phone: userForm.value.phone,
      amps: userForm.value.amps,
    });
  }
  clearForm();
  fetchUsers(currentPage.value);
};

const editUser = (user) => {
  userForm.value = { ...user };
  editing.value = true;
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchUsers(currentPage.value);
};

const destroyUser = async (id) => {
  const result = await Swal.fire({
    title: "آیا دڵنیایت؟",
    text: "بە سرینەوەی ئەم دەیتایە ناتوانیت دووبارە ئەم زانیاریە بگەڕێنیتەوە!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "بەڵێ",
    cancelButtonText: "نەخێر",
  });

  if (result.isConfirmed) {
    await deleteUser(id);
    Swal.fire("سەرکەوتوو!", " دەیتاکەت سریەوە.", "success");
    fetchUsers(currentPage.value);
  }
};

const clearForm = () => {
  userForm.value = { id: null, name: "", phone: "", amps: 0 };
  editing.value = false;
};

const nextPage = () => {
  currentPage.value++;
  fetchUsers(currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchUsers(currentPage.value);
  }
};

onMounted(() => {
  fetchUsers(currentPage.value);
});
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

.user-table th,
.user-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #4caf50;
  color: white;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.edit-button,
.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

/* Pagination Styles */
.pagination {
  display: flex;
  align-items: center;
  margin: 10px 0 30px;
}

.pagination-button {
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 0.9rem;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination-info {
  margin: 0 10px;
  font-size: 1rem;
}
</style>
