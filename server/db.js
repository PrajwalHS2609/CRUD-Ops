const mySql = require("mysql2");

const db = mySql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Prajwalhs@9880386637",
  database: "project2",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from("Prajwalhs@9880386637"),
  },
});
module.exports = db;
