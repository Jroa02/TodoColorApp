const { queryResult } = require("../config/mysql");

const ordersByUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const query = await queryResult(
      `SELECT * FROM pedidos WHERE id_usuario = ?`,
      [idUser]
    );
    if (query.length === 0) {
      throw new Error("INVALID USER");
    }
    console.log("::::::::::::VALID USER::::::::::::\n");

    res.status(200).send(query.length === 1 ? query[0] : query);
  } catch (error) {
    console.log("::::::::::::INVALID USER::::::::::::\n");
    res.status(400).send({
      Error: error.message,
      Status: 400,
    });
  }
};

module.exports = { ordersByUser };
