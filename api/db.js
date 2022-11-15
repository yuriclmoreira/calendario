import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0A1b2c3d4e",
  database: "crud",
});
