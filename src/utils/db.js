// src/lib/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config();

// Create a connection pool using the DATABASE_URL from the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the connection string from .env.local
});

export default pool;
