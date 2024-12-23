// src/lib/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config();

// Create a connection pool using the DATABASE_URL from the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the connection string from .env.local
});

const testConnection = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
    return true;
  } catch (err) {
    console.error('Database connection error:', err);
    return false;
  } finally {
    client.release();
  }
};

// Export it alongside your pool
export { pool, testConnection };

// export default pool;
