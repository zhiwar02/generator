// Import Dexie
import Dexie from "dexie";

// Initialize Dexie database
const db = new Dexie("PowerManagementSystem");
db.version(1).stores({
  users: "++id, name,amps", // Users schema
  invoices: "++id, user_id,price, date", // Invoices schema
  settings: "key, value", // Use key-value pairs for settings
});

// Add a new invoice
export const addInvoice = async (invoice) => {
  return await db.invoices.add(invoice);
};
// Fetch all invoices
export const getAllInvoices = async () => {
  return await db.invoices.toArray();
};

// Fetch invoices by filters (e.g., by month and year)
export const getInvoicesByDate = async (year, month) => {
  return await db.invoices
    .where("date")
    .between(new Date(year, month - 1, 1), new Date(year, month, 0))
    .toArray();
};

// Search invoices by user
export const searchInvoicesByUser = async (userId) => {
  return await db.invoices.where("user_id").equals(userId).toArray();
};

// Update an existing invoice
export const updateInvoice = async (id, updatedInvoice) => {
  return await db.invoices.update(id, updatedInvoice);
};

// Delete invoice
export const deleteInvoice = async (id) => {
  return await db.invoices.delete(id);
};

// Fetch all invoices with user information
export const getInvoicesWithUsers = async () => {
  const invoices = await db.invoices.toArray();
  const users = await db.users.toArray();

  // Map user IDs to user objects for easy lookup
  const userMap = Object.fromEntries(users.map((user) => [user.id, user]));

  return invoices.map((invoice) => ({
    ...invoice,
    user: userMap[invoice.user_id], // Add user object to invoice
  }));
};
export const fetchInvoicesWithPagination = async (
  page = 1,
  itemsPerPage = 100,
  searchQuery = { month: null, year: null, invoice_user: "" }
) => {
  const offset = (page - 1) * itemsPerPage;

  const paginatedInvoices = await db.invoices
    .orderBy("id") // Order by 'id'
    .reverse() // Reverse the order to get descending order
    .filter((invoice) => {
      let matches = true;
      if (searchQuery.month !== null) {
        const invoiceMonth = new Date(invoice.date).getMonth() + 1;
        matches = matches && invoiceMonth === searchQuery.month;
      }
      if (searchQuery.year !== null) {
        const invoiceYear = new Date(invoice.date).getFullYear();
        matches = matches && invoiceYear === searchQuery.year;
      }
      if (searchQuery.invoice_user) {
        matches = matches && invoice.user_id === searchQuery.invoice_user;
      }
      return matches;
    })
    .offset(offset)
    .limit(itemsPerPage)
    .toArray();

  const users = await db.users.toArray();
  const userMap = Object.fromEntries(users.map((user) => [user.id, user]));

  return paginatedInvoices.map((invoice) => ({
    ...invoice,
    user: userMap[invoice.user_id],
  }));
};
let cachedPrice = null;

export const savePrice = async (price) => {
  if (typeof price !== "number" || price < 0) {
    throw new Error("Price must be a positive number");
  }
  try {
    await db.settings.put({ key: "price", value: price });
    cachedPrice = price; // Update cache
  } catch (error) {
    console.error("Failed to save price:", error);
    throw new Error("Could not save price");
  }
};

export const getPrice = async () => {
  if (cachedPrice !== null) {
    return cachedPrice; // Return cached value
  }
  const setting = await db.settings.get("price");
  cachedPrice = setting ? setting.value : 0;
  return cachedPrice;
};
export const seedInvoice = async () => {
  const invoices = [
    {
      id: 1,
      user_id: 1,
      price: 5000,
      date: Date.now(),
      is_super_admin: "super_admin",
    },
  ];

  // Check if invoices already exist
  const existingInvoices = await db.invoices.toArray();
  if (existingInvoices.length === 0) {
    await db.invoices.bulkAdd(invoices);
  }
};
