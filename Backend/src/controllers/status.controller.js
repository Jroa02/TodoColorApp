const { queryResult } = require("../config/mysql");

const statusOrder = async (req, res) => {
  const { idUser, numero_orden } = req.params;
  try {
    const query = await queryResult(
      `SELECT * FROM procesos WHERE numero_orden = ? AND id_usuario = ?`,
      [numero_orden, idUser]
    );

    if (query.length === 0) {
      throw new Error("INVALID ORDER");
    }
    console.log("::::::::::::VALID ORDER::::::::::::\n");
    res.status(200).send(query[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      Error: error.message,
      Status: 400,
    });
  }
};

module.exports = { statusOrder };
