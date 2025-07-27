import bcrypt from "bcryptjs";

async function createAdmin() {
  const username = "admin";
  const password = "admin@123";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Admin", {
    username,
    password: hashedPassword,
  });
}

createAdmin();