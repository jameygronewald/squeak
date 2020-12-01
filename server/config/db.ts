const { Pool } = require('pg');
// import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'ferial08',
  host: 'localhost',
  port: 5432,
  database: 'squeak',
});

export default pool;
