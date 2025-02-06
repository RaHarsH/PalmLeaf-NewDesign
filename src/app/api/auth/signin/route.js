import bcrypt from 'bcrypt';
import { pool } from '@/utils/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(username, password);
    
    if (!username || !password) {
      // return res.status(400).json({ message: 'Username and password are required' });
      return NextResponse.json({error: "Username and Password are required!"}, {status: 400})
    }

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM useraccount WHERE username = $1', [username]);

    client.release();

    if (result.rows.length === 0) {
      // return res.status(401).json({ message: 'Invalid username or password' });
      return NextResponse.json({error: "Invalid username or password!"}, {status: 401})
    }

    const user = result.rows[0];

    console.log("User: ", user);
    

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);
    

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // create token
    const tokenData = {
      id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
    }

    // res.status(200).json({ id: user.user_id, username: user.username, role: user.role });

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});

    const response = NextResponse.json({
        message: "Login successfull!",
        success: true,
        user,
    })

    response.cookies.set("token", token, { httpOnly: true });

    return response;

  } catch (error) {
    console.error('Error signing in:', error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
