const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.index);
router.post("/", categoryController.create);
router.post("/", categoryController.store);
router.get("/:name", categoryController.show);
router.patch("/:id/editar", categoryController.edit);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;