const express = require("express");
const router = express.Router();
const { ordersByUser } = require("./../controllers/orders.controller");

router.get("/ordersByUser/:idUser", ordersByUser);

module.exports = router;
