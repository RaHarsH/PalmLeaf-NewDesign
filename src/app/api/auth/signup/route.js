import bcrypt from 'bcrypt';
import { pool, testConnection } from '@/utils/db';

export async function POST(request) {
  try {
    const { username, password, role, email } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ message: 'Password must be at least 8 characters long' }),
        { status: 400 }
      );
    }

    console.log('====================================');
    console.log('Username:', username);
    console.log('Role:', role);
    console.log('Email:', email);
    console.log('Password', password);
    console.log('====================================');

    const connection = await testConnection();
    console.log('Database Connected:', connection);

    if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      return new Response(
        JSON.stringify({ message: 'Password must include at least one uppercase letter, one number, and one special character' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('====================================');
    console.log('Hashed password:', hashedPassword);
    console.log('====================================');

    const client = await pool.connect();
    ``
    const query = await client.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', ['useraccount']);
    console.log('Table structure:', query.rows);

    const userExists = await client.query('SELECT * FROM useraccount WHERE username = $1 OR email = $2', [username, email]);

    if (userExists.rows.length > 0) {
      client.release();
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      );
    }

    // Corrected INSERT query
    const result = await client.query(
      'INSERT INTO useraccount (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, role || 'user', email]
    );
    client.release();

    return new Response(
      JSON.stringify({ message: 'User registered successfully', user: result.rows[0] }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error signing up:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
