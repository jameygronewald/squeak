import pool from './db';

const ORM = {
  findAll: async (table: string) => {
    const queryString: string = 'SELECT * FROM $1;';

    try {
      const result = await pool.query(queryString, [table]);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  findAllBelongingToUser: async (table: string, id: number) => {
    const queryString: string = `SELECT * FROM ${table} WHERE user_id = $1;`;

    try {
      const result = await pool.query(queryString, [id]);
      return result.rows;
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },

  findOne: async (table: string, column: string, value: string) => {
    const queryString: string = `SELECT * FROM ${table} WHERE ${column} = $1;`;

    try {
      const result = await pool.query(queryString, [value]);
      return result.rows[0];
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },

  insertOne: async (table: string, fieldsToAdd: {}) => {
    let columnPlaceholderString: string = '';
    let valuePlaceholderString: string = '';
    
    for (let key in fieldsToAdd) {
      const column: string = key;
      const value: string | number | boolean = fieldsToAdd[key];
      typeof value !== 'string'
        ? (valuePlaceholderString += `${value}, `)
        : (valuePlaceholderString += `'${value}', `);
      columnPlaceholderString += `${column}, `;
    };

    columnPlaceholderString = columnPlaceholderString.slice(0, -2);
    valuePlaceholderString = valuePlaceholderString.slice(0, -2);

    const queryString: string = `INSERT INTO ${table}(${columnPlaceholderString}) VALUES(${valuePlaceholderString}) RETURNING *;`;
    console.log(queryString)
    try {
      const result = await pool.query(queryString);
      return result.rows[0];
    } catch (err) {
      console.error('ORM: ' + err.message);
    }
  },

  updateOneById: async (table: string, fieldsToUpdate: {}, id: string) => {
    const idType: string = `${table}_id`;

    let placeholderString: string = '';

    for (let column in fieldsToUpdate) {
      const value = fieldsToUpdate[column];
      typeof value !== 'string'
        ? (placeholderString += `${column} = ${value}, `)
        : (placeholderString += `${column} = '${value}', `);
    }

    placeholderString = placeholderString.slice(0, -2);

    const queryString: string = `UPDATE ${table} SET ${placeholderString} WHERE ${idType} = $1`;

    try {
      await pool.query(queryString, [id]);
      return { updatedFields: fieldsToUpdate };
    } catch (err) {
      console.error('ORM: ', err.message);
    }
  },

  deleteOneById: async (table: string, id: string) => {
    const idType: string = `${table}_id`;
    const queryString: string = `DELETE FROM ${table} WHERE ${idType} = ${id}`;
    try {
      await pool.query(queryString);
    } catch (err) {
      console.error('ORM: ', err.message);
    }
  },
};

export default ORM;
