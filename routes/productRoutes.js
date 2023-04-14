const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/:slug", productController.show);
router.post("/filter", productController.filterProduct);

router.post("/search", productController.searchProduct);

/// rutas privadas ///
router.use(
  checkJwt({
    secret: process.env.SESSION_SECRET,
    algorithms: ["HS256"],
  })
);

router.post("/", productController.create);
router.patch("/:slug", productController.edit);
router.delete("/:id", productController.destroy);

module.exports = router;
