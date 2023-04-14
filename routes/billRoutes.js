const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const billController = require("../controllers/billController");

router.use(
  checkJwt({
    secret: process.env.SESSION_SECRET,
    algorithms: ["HS256"],
  })
);

router.get("/", billController.index);
router.get("/last", billController.lastBills);
router.get("/:id", billController.show);
router.post("/", billController.store);
router.patch("/:id/edit", billController.edit);
router.delete("/:id", billController.destroy);

module.exports = router;
