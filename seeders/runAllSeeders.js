require("dotenv").config();
async function runAllSeeders() {
  const { mongoose } = require("../db");

  /*   await mongoose.connection.dropCollection("admins");
    await mongoose.connection.dropCollection("brands");
    await mongoose.connection.dropCollection("users");
    await mongoose.connection.dropCollection("categories");
    await mongoose.connection.dropCollection("products");
    await mongoose.connection.dropCollection("status");
    await mongoose.connection.dropCollection("orders");
    await mongoose.connection.dropCollection("bills"); */

  await mongoose.connection.dropDatabase();

  await require("./adminSeeder")();
  await require("./brandSeeder")();
  await require("./userSeeder")();
  await require("./categorySeeder")();
  await require("./productSeeder")();
  await require("./statusSeeder")();
  await require("./orderSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();
