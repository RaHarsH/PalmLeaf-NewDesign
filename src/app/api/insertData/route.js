import pool from "@/utils/db"; // Import the pool instance

export async function POST(request) {
  const { username, uid } = await request.json();

  // SQL query to create the table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      uid VARCHAR(255) NOT NULL
    )
  `;

  // SQL query to insert data into the table
  const insertQuery = 'INSERT INTO users (username, uid) VALUES ($1, $2)';

  let client;
  try {
    client = await pool.connect();  // Connect to the database
    await client.query('BEGIN');  // Start a transaction

    // Create the table if it doesn't exist
    await client.query(createTableQuery);

    // Insert the data into the table
    await client.query(insertQuery, [username, uid]);

    await client.query('COMMIT');  // Commit the transaction
    return new Response(JSON.stringify({ message: 'Data inserted successfully!' }), { status: 200 });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');  // Rollback in case of error
    }
    console.error('Error inserting data:', error);
    return new Response(JSON.stringify({ message: 'Error inserting data' }), { status: 500 });
  } finally {
    if (client) {
      client.release();  // Release the client back to the pool
    }
  }
}
