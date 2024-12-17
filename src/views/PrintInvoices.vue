<template>
  <div class="invoice-container" v-if="invoice" dir="rtl">
    <div class="invoice-card" style="position: relative">
      <div class="">
        <div>
          <h1 class="text-2xl ml-4 mb-4 text-center">مۆلیدەی ئەهلی خەلەکان</h1>
          <div class="owner-info">
            <div class="text-xl mb-3">
              <span>خاوەن مۆلیدە:</span> <strong>سەربەست یاسین</strong>
            </div>
            <div class="text-xl mb-3">
              <span>ژمارەی مۆبایل:</span> <strong>0750 260 4616</strong>
            </div>
          </div>
          <div class="d-flex justify-between mb-3">
            <h2 class="text-lg my-1">بەرێز:{{ invoice.user.name }}</h2>
            <p class="text-lg my-1">
              {{ new Date(invoice.date).toLocaleDateString() }}
            </p>

            <div
              class="invoice-id"
              style="position: absolute; left: 1px; top: 3px"
            >
              <span>#{{ invoice.id }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-details">
        <div class="detail-item">
          <span>نرخی هەر ئەمپێرێک:</span>
          <strong>{{ globalPrice }} هەزار دینار</strong>
        </div>
        <div class="detail-item">
          <span>ژمارەی ئەمپێر:</span>
          <strong>{{ invoice.user.amps }}</strong>
        </div>
        <div class="detail-item total">
          <span>کۆی گشتی:</span>
          <strong>{{ globalPrice * invoice.user?.amps }} هەزار دینار</strong>
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="btn print" @click="printInvoices">داگرتنی پسوڵە</button>
      <button class="btn back" @click="goBack">گەڕاندنەوە</button>
    </div>
  </div>
  <div class="loading" v-else>
    <p>بارکردنی پەیوەندیدار...</p>
    <button class="btn back" @click="goBack">گەڕاندنەوە</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getInvoicesWithUsers, getPrice } from "@/tables/invoices";
const router = useRouter();
const route = useRoute();
const invoice = ref(null);
const globalPrice = ref({
  price: 0,
});
const goBack = () => {
  router.go(-1);
};
// Computed Property for Total Amount
const totalAmount = computed(() => {
  return invoices.value.reduce(
    (sum, invoice) => sum + globalPrice.value.price * (invoice.user?.amps || 1),
    0
  );
});
// Fetch and assign the global price
const fetchGlobalPrice = async () => {
  try {
    const fetchedPrice = await getPrice(); // Ensure this is an async function
    globalPrice.value = fetchedPrice !== null ? fetchedPrice : 0; // Default to 0 if no price is set
  } catch (error) {
    console.error("Error fetching global price:", error);
    globalPrice.value = 0; // Set a safe fallback
  }
};
const fetchInvoice = async (id) => {
  const invoicesWithUsers = await getInvoicesWithUsers();
  invoice.value = invoicesWithUsers.find((inv) => inv.id === Number(id));
};

onMounted(async () => {
  const invoiceId = route.params.id;
  await fetchInvoice(invoiceId);
  await fetchGlobalPrice(); // Ensure the price is set before usage
});

const printInvoices = () => {
  window.print();
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.invoice-container {
  background: #f4f6f9;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 100px;
}

.header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #4a47a3;
}

.owner-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.invoice-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.card-header h2 {
  font-size: 20px;
  color: #4a47a3;
}

.invoice-id span {
  background: #4a47a3;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.card-details .detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-details .detail-item.total {
  font-size: 18px;
  font-weight: 700;
  color: #2f855a;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
@media print {
  .actions {
    display: none;
  }
}
.btn {
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease;
}

.btn.print {
  background: #4a47a3;
  color: white;
}

.btn.back {
  background: #e53e3e;
  color: white;
}

.btn:hover {
  transform: scale(1.05);
}

.loading {
  text-align: center;
  padding: 20px;
}

.loading p {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
