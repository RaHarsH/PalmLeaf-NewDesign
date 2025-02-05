import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { pool, testConnection } from "@/utils/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const isConnected = await testConnection();
          console.log('Database Connected:', isConnected);
          
          const client = await pool.connect();
          try {
            const { username, password } = credentials;
            const res = await client.query('SELECT * FROM useraccount WHERE username = $1', [username]);
            const user = res.rows[0];

            if (!user) {
              console.log('User not found');
              return null;
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              console.log('Invalid password');
              return null;
            }

            return { id: user.user_id, username: user.username, role: user.role };
          } finally {
            client.release(); // Release the connection
          }
        } catch (error) {
          console.error('Error in authentication:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
