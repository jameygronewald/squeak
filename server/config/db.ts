const { Pool } = require("pg");

export const pool = new Pool({
  user: "postgres",
  password: "ferial08",
  host: "localhost",
  port: 5432,
  database: "squeak",
});