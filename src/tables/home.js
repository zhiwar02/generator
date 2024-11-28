import Dexie from "dexie";
const db = new Dexie("PowerManagementSystem");
db.version(1).stores({
  admins: "++id, name, username, password, is_super_admin",
  users: "++id, name,amps", // Users schema
  invoices: "++id, user_id, date,price", // Invoices schema
});
export const getDashboardStats = async () => {
  try {
    const adminsCount = await db.admins.count();
    const usersCount = await db.users.count();

    // Fetch users and create a map of user amps
    const users = await db.users.toArray();
    const userAmpsMap = new Map(users.map((user) => [user.id, user.amps]));

    // Fetch invoices and calculate total price
    const invoices = await db.invoices.toArray();
    const totalPrice = invoices.reduce((sum, invoice) => {
      const amps = userAmpsMap.get(invoice.user_id) || 0; // Default amps to 0 if user not found
      return sum + invoice.price * amps;
    }, 0);

    return {
      admins: adminsCount,
      users: usersCount,
      price: totalPrice,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      admins: 0,
      users: 0,
      price: 0,
    };
  }
};
