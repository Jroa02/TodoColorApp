const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWhithOuthExt = removeExtension(file);
  const skipRoute = ["index"].includes(fileWhithOuthExt);
  if (!skipRoute) {
    console.log("------>", fileWhithOuthExt);
    router.use(`/${fileWhithOuthExt}`, require(`./${fileWhithOuthExt}.router`));
  }
});

router.get("*", (req, res) => {
  res.status(404).send({ error: "Route Not Found" });
});

module.exports = router;
