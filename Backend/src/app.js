const express = require("express");
const router = require("./routes/index");
const app = express();
const PORT = 9098;

app.use(express.json());

app.use("/V1/api", router);

app.get("/health", (req, res) => {
  res.status(200).send("UP ✅");
});

app.listen(PORT, console.log(`APP LISTENING ON PORT ${PORT}`));
