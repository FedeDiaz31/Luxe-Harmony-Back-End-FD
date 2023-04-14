const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const statusRoutes = require("./statusRoutes");
const orderRoutes = require("./orderRoutes");
const brandRoutes = require("./brandRoutes");
const billRoutes = require("./billRoutes");

module.exports = (app) => {
  app.use("/categories", categoryRoutes);
  app.use("/admin", adminRoutes);
  app.use("/status", statusRoutes);
  app.use("/brands", brandRoutes);
  app.use("/orders", orderRoutes);
  app.use("/products", productRoutes);
  app.use("/users", userRoutes);
  app.use("/bills", billRoutes);
};
