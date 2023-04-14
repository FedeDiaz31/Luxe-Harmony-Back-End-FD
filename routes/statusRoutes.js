const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const statusController = require("../controllers/statusController");

router.get("/", statusController.index);
router.get("/crear", statusController.create);
router.get("/", statusController.store);
router.get("/:id", statusController.show);
router.get("/:id/editar", statusController.edit);
router.get("/:id", statusController.update);
router.get("/:id", statusController.destroy);

module.exports = router;