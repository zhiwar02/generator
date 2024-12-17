<template>
  <div class="main-container container">
    <form @submit.prevent="saveInvoice" class="mt-10">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              type="number"
              class="form-control"
              required
              v-model="globalPrice.price"
              @change="insertPrice"
              id="invoicePrice"
              placeholder="نرخ"
            />
            <label class="form-control-label" for="invoicePrice">نرخ</label>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input
              type="date"
              class="form-control"
              required
              v-model="invoiceForm.date"
              id="invoiceDate"
            />
            <label class="form-control-label" for="invoiceDate">بەروار</label>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <Dropdown
              filter
              v-model="invoiceForm.user_id"
              :options="users"
              optionLabel="name"
              optionValue="id"
              placeholder="بەژداربوو هەڵبژێرە"
              class="custom-dropdown w-full py-3 bg-white md:w-14rem"
            >
              <!-- Customize the display of each option in the dropdown -->
              <template #option="slotProps">
                <div class="flex align-items-center justify-content-start">
                  <div>
                    {{ slotProps.option.amps }} | {{ slotProps.option.name }}
                  </div>
                </div>
              </template>

              <!-- Display the selected user in the dropdown value -->
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>
                    {{
                      users.find((user) => user.id === slotProps.value)?.amps
                    }}
                    |
                    {{
                      users.find((user) => user.id === slotProps.value)?.name
                    }}
                  </div>
                </div>
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3 col-lg-3 mx-auto d-grid">
        <div class="d-flex">
          <button
            type="submit"
            class="btn-success btn mb-3 px-4 py-3 rounded-md"
          >
            {{ editing ? "نوێکردنەوەی پسوڵە" : "زیادکردنی پسوڵە" }}
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
    </form>

    <div>
      <div
        class="search-header d-flex flex-col justify-content-center items-center mt-1"
      >
        <input
          v-model="searchQuery.month"
          type="number"
          placeholder="مانگ"
          class="search-input"
          @input="searchInvoices"
        />
        <input
          v-model="searchQuery.year"
          type="number"
          placeholder="ساڵ"
          class="search-input"
          @input="searchInvoices"
        />
        <button @click="resetSearch" class="delete-button">
          پاکردنەوەی گەڕان
        </button>
      </div>

      <h2 class="text-center my-10">لیستی پسوڵەکان</h2>
      <div class="print-button-container mt-5 text-center">
        <button
          class="btn btn-primary py-2 rounded-md"
          @click="printSelectedInvoices"
          :disabled="selectedInvoices.length === 0"
        >
          پسوڵە دیاریکراوەکان چاپبکە
        </button>
      </div>

      <div class="pagination d-flex justify-content-between align-items-center">
        <!-- Pagination Controls -->
        <div>
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

        <!-- Display Total Money -->
        <div
          class="total-amount border-2 p-2 border-solid border-success"
          style="border-radius: 10px"
        >
          <span class="font-bold text-lg"
            >کۆی گشتی نرخ: {{ totalAmount }} د.ع
          </span>
        </div>
      </div>

      <table class="admin-table" style="font-family: 'NRT'">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change="toggleSelectAll"
                :checked="allSelected"
              />

              <span
                class="select-all-label"
                :class="{ 'text-gray-400': !allSelected }"
              >
              </span>
            </th>
            <th>زنجیرە</th>
            <th>مانگی</th>
            <th>نرخ</th>
            <th>کۆی گشتی</th>
            <th>بەکارھێنەر</th>
            <th>کردارەکان</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>
              <input
                type="checkbox"
                v-model="selectedInvoices"
                :value="invoice.id"
              />
            </td>
            <td>{{ invoice.id }}</td>
            <td>
              {{
                new Date(invoice.date).getMonth() +
                1 +
                " بۆ " +
                (new Date(invoice.date).getMonth() + 2 > 12
                  ? 1
                  : new Date(invoice.date).getMonth() + 2)
              }}
            </td>

            <td>{{ globalPrice.price }}</td>
            <td>{{ globalPrice.price * (invoice.user?.amps || 1) }}</td>
            <td>{{ invoice.user?.name || "نەناسراوە" }}</td>
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
                    <button class="dropdown-item" @click="showInvoice(invoice)">
                      بینینی پسوڵە
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="editInvoice(invoice)">
                      نوێکردنەوە
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item text-danger"
                      @click="destroyInvoice(invoice.id)"
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

    <AppToast />
    <Footer />
  </div>
</template>

<script setup>
import Dropdown from "primevue/dropdown";
import Swal from "sweetalert2"; // Import SweetAlert2

import AppToast from "@/layouts/AppToast.vue";
import Footer from "@/layouts/Footer.vue";
import { ref, onMounted, computed } from "vue";
import {
  addInvoice,
  updateInvoice,
  deleteInvoice,
  fetchInvoicesWithPagination,
  getPrice,
  savePrice,
} from "@/tables/invoices";
import { getUsers } from "@/tables/users";
import { useRouter } from "vue-router";

const searchQuery = ref({
  month: null,
  year: null,
  invoice_user: "",
});
const selectedInvoices = ref([]);
const globalPrice = ref({
  price: 0,
});

const fetchInvoices = async () => {
  invoices.value = await fetchInvoicesWithPagination(
    currentPage.value,
    itemsPerPage,
    searchQuery.value
  );
  console.log(invoices.value);
};
const allSelected = computed({
  get() {
    return (
      invoices.value.length > 0 &&
      selectedInvoices.value.length === invoices.value.length
    );
  },
  set(value) {
    selectedInvoices.value = value
      ? invoices.value.map((invoice) => invoice.id)
      : [];
  },
});
const fetchGlobalPrice = async () => {
  try {
    const fetchedPrice = await getPrice();
    globalPrice.value.price = fetchedPrice || 10000; // Default to 10,000
  } catch (error) {
    console.error("Error fetching global price:", error);
    globalPrice.value.price = 10000; // Fallback to default
  }
};

const insertPrice = async () => {
  try {
    const priceToSave = globalPrice.value.price; // Extract only the price
    await savePrice(priceToSave);
    console.log("Price saved successfully:", priceToSave);
  } catch (error) {
    console.error("Error saving price:", error);
  }
};

const toggleSelectAll = () => {
  allSelected.value = !allSelected.value;
};

const searchInvoices = () => {
  fetchInvoices();
};

const resetSearch = () => {
  searchQuery.value = {
    month: null,
    year: null,
  };
  fetchInvoices();
};

const router = useRouter();
const invoices = ref([]);
const invoiceForm = ref({ id: null, date: "", user_id: null, price: 0 });
const editing = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const users = ref([]);
const selectedInvoice = ref(null);

const fetchUsers = async () => {
  users.value = await getUsers();
};

const saveInvoice = async () => {
  const invoiceData = {
    date: invoiceForm.value.date,
    user_id: invoiceForm.value.user_id,
    price: globalPrice.value.price, // Ensure the price is taken correctly
  };

  if (editing.value) {
    await updateInvoice(invoiceForm.value.id, invoiceData);
  } else {
    await addInvoice(invoiceData);
  }

  clearForm();
  fetchInvoices();
};

const editInvoice = (invoice) => {
  invoiceForm.value = { ...invoice };
  editing.value = true;
};

onMounted(async () => {
  await fetchUsers(); // Fetch users first
  await fetchGlobalPrice();
  await fetchInvoices();
});

const destroyInvoice = async (id) => {
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
    try {
      await deleteInvoice(id); // Call the correct delete function
      Swal.fire("سەرکەوتوو!", " دەیتاکەت سریەوە.", "success");
      fetchInvoices(); // Refresh the invoice list
      fetchUsers(); // Refresh the user list if needed
    } catch (error) {
      Swal.fire("هەڵە!", "ناتوانی بکەیتەوە: " + error.message, "error");
    }
  }
};

const clearForm = () => {
  invoiceForm.value = {
    date: "",
    user_id: null,
  };
  editing.value = false; // Reset editing state
};

const nextPage = () => {
  currentPage.value++;
  fetchInvoices();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchInvoices();
  }
};

const showInvoice = (invoice) => {
  selectedInvoice.value = invoice;
  router.push({ name: "print-invoices", params: { id: invoice.id } });
};

// Computed Property for Total Amount
const totalAmount = computed(() => {
  return invoices.value.reduce(
    (sum, invoice) => sum + globalPrice.value.price * (invoice.user?.amps || 1),
    0
  );
});

const printSelectedInvoices = () => {
  const selected = invoices.value.filter((invoice) =>
    selectedInvoices.value.includes(invoice.id)
  );

  // Build the printable content for each selected invoice
  let printableContent = selected
    .map((invoice) => {
      return `
    <div class="invoice-card" style="border: 2px solid #4CAF50; border-radius: 10px; padding: 20px; margin-bottom: 20px; font-family: 'NRT', sans-serif; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

      <div class="invoice-header" style="display: flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px;">
        <p><strong>ناو:</strong> ${invoice.user.name || "نەناسراوە"}</p>
        <p><strong>بەروار:</strong> ${new Date(
          invoice.date
        ).toLocaleDateString()}</p>
      </div>
      <div class="invoice-details" style="font-size: 18px; line-height: 1.8;">
        <p><strong>نرخی هەر ئەمپێرێک:</strong> ${
          globalPrice.value.price
        } هەزار دینار</p>
        <p><strong>ژمارەی ئەمپێر:</strong> ${invoice.user.amps || 0}</p>
        <p><strong>کۆی گشتی:</strong> ${
          globalPrice.value.price * (invoice.user.amps || 1)
        } هەزار دینار</p>
      </div>

    </div>
    `;
    })
    .join("");

  // Create a new window and print the content
  let printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>چاپکردنی پسوڵەکان</title>
        <style>
          body { font-family: 'NRT', sans-serif; direction: rtl; }
          .invoice-card { border: 1px solid #ddd; padding: 15px; margin-top: 20px; text-align: center; }
          .invoice-header { display: flex; justify-content: space-between; padding: 0 15px; }
          .invoice-details { margin-top: 10px; padding: 0 15px; }
          h1 { font-size: 24px; color: #4f46e5; margin-top: 20px; }
          p { margin: 5px 0; }
        </style>
      </head>
      <body>
      <h1 style="text-align: center; font-size: 28px; color: #4CAF50; margin-bottom: 15px;">پسوڵە</h1>
      <div style="display: flex; justify-content: space-between; font-size: 18px; margin-bottom: 10px;">
        <p><strong>خاوەن مۆلیدە:</strong> سەربەست یاسین</p>
        <p><strong>ژمارەی مۆبایل:</strong> 0750 260 4616</p>
      </div>
        ${printableContent}
        <span class='font-bold text-center text-lg' style='color:red;
        font-size: 24px;
        color: red;
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
      }'
            >کۆی گشتی نرخ: ${totalAmount.value}د.ع
          </span>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};
</script>

<style scoped>
.search-header {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.p-select-option {
  background-color: white !important;
  padding: 10px;
}
.search-input {
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.admin-table {
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
.delete-button,
.download-button,
.show-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}
.download-button {
  background-color: #28a745;
  color: white;
}

.download-button:hover {
  background-color: #218838;
}
.show-button {
  background-color: #ff911c;
  color: white;
}

.show-button:hover {
  background-color: #ee9f18;
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
input {
  color: black;
}
</style>
