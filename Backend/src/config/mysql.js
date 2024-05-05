require("dotenv").config();
const mysql = require("mysql2/promise");

const queryResult = async (query, paramsArray) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    let [rows, fields] = await connection.execute(query, paramsArray);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { queryResult };
