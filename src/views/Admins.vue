<template>
  <!-- main page content -->
  <div class="main-container container">
    <form @submit.prevent="saveAdmin" class="mt-10">
      <!-- add edit address form -->
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              type="text"
              required
              class="form-control text-right"
              v-model="adminForm.name"
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
              v-model="adminForm.username"
              id="address2"
              placeholder="ناوی بەکارهێنەر"
            />
            <label class="form-control-label" for="address2"
              >ناوی بەکارهێنەر</label
            >
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              class="form-control"
              required
              v-model="adminForm.password"
              type="password"
              id="address3"
              placeholder="تێپەڕە وشە"
            />
            <label class="form-control-label" for="address3">تێپەڕە وشە</label>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="form-group form-floating">
          <input
            type="text"
            list="datalistOptions"
            class="form-control"
            v-model="adminForm.is_super_admin"
            id="address4"
          />
          <datalist id="datalistOptions">
            <option value="admin">ئەدمین</option>
            <option value="super_admin">سوپەر ئەدمین</option>
          </datalist>
          <label class="form-control-label" for="address4">ئەدمین</label>
        </div>
      </div>
      <!-- Button-->
      <div class="col-12 col-md-3 col-lg-3 mx-auto d-grid">
        <div class="d-flex">
          <button
            type="submit"
            class="btn-success btn mb-3 px-4 py-3 rounded-md"
          >
            {{ editing ? "نوێکردنەوەی ئەدمین" : "زیادکردنی ئەدمین" }}
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
    <!-- Admins List -->
    <div>
      <h2 class="text-center">لیستی ئەدمینەکان</h2>
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
      <table class="admin-table">
        <thead>
          <tr>
            <th>زنجیرە</th>
            <th>ناو</th>
            <th>ناوی بەکارهێنەر</th>
            <th>جۆری ئەدمین</th>
            <th>کردارەکان</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.id }}</td>
            <td>{{ admin.name }}</td>
            <td>{{ admin.username }}</td>
            <td>{{ admin.is_super_admin }}</td>
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
                    <button
                      class="dropdown-item mb-3"
                      @click="editAdmin(admin)"
                    >
                      نوێکردنەوە
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-danger"
                      v-if="admin.is_super_admin !== 'super_admin'"
                      @click="destroyAdmin(admin.id)"
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
  addAdmin,
  updateAdmin,
  deleteAdmin,
  fetchAdminsWithPagination,
} from "@/tables/admins";
import Swal from "sweetalert2"; // Import SweetAlert2

const admins = ref([]);
const adminForm = ref({
  id: null,
  name: "",
  username: "",
  password: "",
  is_super_admin: "admin",
});
const editing = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const fetchAdmins = async (page) => {
  admins.value = await fetchAdminsWithPagination(page, itemsPerPage);
};

const saveAdmin = async () => {
  if (editing.value) {
    await updateAdmin(adminForm.value.id, {
      name: adminForm.value.name,
      username: adminForm.value.username,
      password: adminForm.value.password,
      is_super_admin: adminForm.value.is_super_admin,
    });
  } else {
    await addAdmin({
      name: adminForm.value.name,
      username: adminForm.value.username,
      password: adminForm.value.password,
      is_super_admin: adminForm.value.is_super_admin,
    });
  }
  clearForm();
  fetchAdmins(currentPage.value);
};

const editAdmin = (admin) => {
  adminForm.value = { ...admin }; // Pre-fill the form
  editing.value = true;
};
const clearForm = () => {
  adminForm.value = {
    id: null,
    name: "",
    username: "",
    password: "",
    is_super_admin: "admin",
  };
  editing.value = false;
};

const nextPage = () => {
  currentPage.value++;
  fetchAdmins(currentPage.value);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchAdmins(currentPage.value);
  }
};

onMounted(() => {
  fetchAdmins(currentPage.value);
});
const destroyAdmin = async (id) => {
  const result = await Swal.fire({
    title: "ئایا دڵنیایت؟",
    text: "بە سرینەوەی ئەم دەیتایە ناتوانیت دووبارە ئەم زانیاریە بگەڕێنیتەوە!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "بەڵێ",
    cancelButtonText: "نەخێر",
  });

  if (result.isConfirmed) {
    await deleteAdmin(id);
    Swal.fire("سەرکەوتوو!", " دەیتاکەت سریەوە.", "success");
    fetchAdmins(currentPage.value);
  }
};
</script>

<style scoped>
.admin-table {
  overflow: auto;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

.admin-table th,
.admin-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.admin-table th {
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
  margin: 20px 0;
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
