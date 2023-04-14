const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const brandController = require("../controllers/brandController");

router.get("/", brandController.index);
router.get("/:slug", brandController.show);

router.use(
  checkJwt({
    secret: process.env.SESSION_SECRET,
    algorithms: ["HS256"],
  })
);

router.post("/", brandController.create);
router.post("/search", brandController.searchBrand);
router.patch("/:id", brandController.edit);
router.delete("/:id", brandController.destroy);

module.exports = router;
