const e = require("express");
const { queryResult } = require("./../config/mysql");

const createUser = async (req, res) => {
  const { names, lastNames, email, password } = req.body;
  try {
    const query = await queryResult(
      `INSERT INTO usuarios (nombres,apellidos,correo,contrasena) VALUES ('${names}','${lastNames}','${email}','${password}')`,
      [null]
    );
    console.log("::::::::::::CREATED USER::::::::::::\n", {
      ...req.body,
      password: "****",
    });
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      Error: error,
      Status: 400,
    });
  }
};

const validatePassword = async (req, res) => {
  const { idUser, password } = req.params;
  try {
    const query = await queryResult(
      `SELECT COUNT(*) FROM usuarios WHERE correo = ? AND contrasena = ?`,
      [idUser, password]
    );

    if (query[0]["COUNT(*)"] != 1) {
      throw new Error("INVALID USER");
    }
    console.log("::::::::::::VALID USER::::::::::::\n");
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      Error: error.message,
      Status: 400,
    });
  }
};

const userData = async (req, res) => {
  const { idUser } = req.params;

  try {
    const query = await queryResult(
      `SELECT nombres,apellidos FROM usuarios WHERE correo = ?`,
      [idUser]
    );
    if (query[0] === undefined) throw new Error("INVALID USER");
    console.log("::::::::::::DATA USER::::::::::::\n", query[0]);
    res.status(200).send(query[0]);
  } catch (error) {
    res.status(400).send({
      Error: error.message,
      Status: 400,
    });
  }
};

module.exports = { createUser, validatePassword, userData };
