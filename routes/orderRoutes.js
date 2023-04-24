const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
/* const AdminAuthenticate = require('../middlewares/adminAuthenticate'); */
const orderController = require("../controllers/orderController");

router.use(
  checkJwt({
    secret: process.env.SESSION_SECRET,
    algorithms: ["HS256"],
  })
);

router.get("/", orderController.index);
router.get("/last", orderController.lastOrders);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = router;
