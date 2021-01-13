import pg from 'pg';

const postgres = new pg.Pool({
  user: 'postgres',
  password: 'ferial08',
  host: 'localhost',
  port: 5432,
  database: 'squeak',
});

export default postgres;
