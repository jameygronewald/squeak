import pg, { Client } from 'pg';
import { config } from 'dotenv';
config();

let postgres: any;

if (process.env.DATABASE_URL) {
  postgres = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  postgres = new pg.Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_DATABASE,
  });
}

postgres.connect();

export default postgres;
