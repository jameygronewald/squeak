import { pool } from "./db";

export const ORM = {
  
  selectAll: async function (table: string) {
    const queryString: string = "SELECT * FROM $1;";
    try {
      const result = await pool.query(queryString, [table]);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },
  
  selectOne: async function (table: string, id: string) {
    const queryString: string = "SELECT * FROM $1 WHERE id = $2;";
    try {
      const result = await pool.query(queryString, [table, id]);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  insertOne: async function (table: string, columns: any, values: any) {
    // const queryString: string = "INSERT INTO $1 ($2) VALUES($3)";
    const queryString: string = `INSERT INTO ${table} (${columns})
      VALUES(${values});`;
      console.log('ORM query: ', queryString);
      const testString = "INSERT INTO users (email, password) VALUES ('test', '1234')"
    try {
      // const result = await pool.query(queryString, [table, columns, values]);
      const result = await pool.query(testString);
      console.log(result);
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },
  
  deleteOne: async function (table: string, condition: string) {
    const queryString: string = "DELETE FROM $1 WHERE id = $2";
    try {
      const result = await pool.query(queryString, [table, condition]);
    } catch (err) {
      console.error(err.message);
    }
  },
  
  updateOne: async function (
    table: string,
    column: string,
    value: string,
    id: string
  ) {
    const queryString: string = "UPDATE $1 SET $2 = $3 WHERE id = $4";
    try {
      const result = await pool.query(queryString, [table, column, value, id]);
    } catch (err) {
      console.error(err.message);
    }
  },
};
