import pg from 'pg';
import { config } from 'dotenv';
config();

const postgres = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
});

export default postgres;
