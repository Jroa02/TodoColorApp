const express = require("express");
const router = express.Router();
const {
  createUser,
  validatePassword,
  userData,
} = require("./../controllers/users.controller");

router.post("/createUser", createUser);
router.get("/validatePassword/:idUser/:password", validatePassword);
router.get("/userData/:idUser", userData);

module.exports = router;
