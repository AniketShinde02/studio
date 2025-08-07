
import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error('Auth Error: Missing credentials');
          return null;
        }
        
        try {
          await dbConnect();
          console.log('Auth: DB connected.');
        } catch (error) {
          console.error('Auth Error: DB connection failed.', error);
          return null;
        }


        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          console.error('Auth Error: User not found for email:', credentials.email);
          return null;
        }

        if (!user.password) {
            console.error('Auth Error: User found but password hash is missing for email:', credentials.email);
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          console.error('Auth Error: Password mismatch for user:', credentials.email);
          return null;
        }
        
        console.log('Auth success for:', credentials.email);
        
        // Convert to a plain object to ensure it's serializable
        const userObject = user.toObject();
        // IMPORTANT: Never return the password hash
        delete userObject.password;
        
        return userObject;
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/api/auth/error', // This is a default error page, we can customize it
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // This is called first, on sign-in user is passed.
      if (user) {
        token.id = (user as any)._id.toString();
        token.email = user.email;
        token.createdAt = (user as any).createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      // The session callback is called whenever a session is checked.
      // We transfer the id from the token to the session object.
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        (session.user as any).createdAt = token.createdAt;
      }
      return session;
    },
  },
};
