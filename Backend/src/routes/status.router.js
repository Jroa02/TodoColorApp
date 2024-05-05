const express = require("express");
const router = express.Router();
const { statusOrder } = require("./../controllers/status.controller");

router.get("/statusOrder/:idUser/:numero_orden", statusOrder);

module.exports = router;
