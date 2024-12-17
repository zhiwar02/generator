import Dexie from "dexie";
const db = new Dexie("PowerManagementSystem");
db.version(1).stores({
  admins: "++id, name, username, password , is_super_admin", // Make sure only these fields are saved
});
// Add a new admin
export const addAdmin = async (admin) => {
  return await db.admins.add(admin);
};

// Fetch all admins
export const getAdmins = async () => {
  return await db.admins.toArray();
};

// Update admin
export const updateAdmin = async (id, updatedAdmin) => {
  return await db.admins.update(id, updatedAdmin);
};

// Delete admin
export const deleteAdmin = async (id) => {
  return await db.admins.delete(id);
};
// Fetch admins with pagination
export const fetchAdminsWithPagination = async (
  page = 1,
  itemsPerPage = 10
) => {
  const offset = (page - 1) * itemsPerPage;
  return await db.admins
    .orderBy("id") // Order by 'id'
    .reverse() // Reverse the order to get descending order
    .offset(offset)
    .limit(itemsPerPage)
    .toArray();
};
// Check if the admin exists and the password matches
export const adminLogin = async (username, password) => {
  const admin = await db.admins.where("username").equals(username).first();

  if (admin && admin.password === password) {
    return admin; // Login success, return admin data
  } else {
    throw new Error("Invalid username or password"); // Login failed
  }
};
// Seed function to add default admins
export const seedAdmins = async () => {
  const admins = [
    {
      name: "admin",
      username: "admin",
      password: "admin",
      is_super_admin: "super_admin",
    },
  ];

  // Check if admins already exist
  const existingAdmins = await db.admins.toArray();
  if (existingAdmins.length === 0) {
    await db.admins.bulkAdd(admins);
  }
};
