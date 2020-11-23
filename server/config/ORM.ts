import pool from "./db";

const ORM = {
  selectAll: async function (table: string) {
    const queryString: string = "SELECT * FROM $1;";
    try {
      const result = await pool.query(queryString, [table]);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  selectAllBelongingToUser: async function (table: string, id: number) {
    const queryString: string = `SELECT * FROM ${table} WHERE user_id = $1;`;
    try {
      const result = await pool.query(queryString, [id]);
      return result.rows;
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },

  selectOne: async function (table: string, column: string, value: string) {
    const queryString: string = `SELECT * FROM ${table} WHERE ${column} = $1;`;
    try {
      const result = await pool.query(queryString, [value]);
      return result.rows[0];
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },

  insertOne: async function (table: string, columns: any, values: any) {
    let placeholderString = '';
    columns.forEach((column, index) => index === columns.length - 1 ? placeholderString += `$${index + 1}` : placeholderString += `$${index + 1}, `);
    const queryString: string = `INSERT INTO ${table}(${columns}) VALUES(${placeholderString}) RETURNING *;`;
    try {
      const result = await pool.query(queryString, [...values]);
      return result.rows[0];
    } catch (err) {
      console.error("ORM: " + err.message);
    }
  },

  deleteOneById: async function (table: string, id: string) {
    const idType = `${table}_id`
    const queryString: string = `DELETE FROM ${table} WHERE ${idType} = ${id}`;
    try {
      await pool.query(queryString/* , [table, id] */);
      return {message: 'Success'};
    } catch (err) {
      console.error("ORM: ", err.message);
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

export default ORM;