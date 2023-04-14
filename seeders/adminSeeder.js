const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const admin = {
    firstname: "Admin",
    lastname: "LuxeHarmony",
    email: "admin@luxeharmony.com",
    password: await bcrypt.hash("1234", 8),
    rol: "Administrador",
    nivel: 500
  };
  await Admin.create(admin);
  console.log("[Database] Se corrió el seeder de Admins.");
};
