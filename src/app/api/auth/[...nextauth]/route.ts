
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect, { clientPromise } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { Adapter } from 'next-auth/adapters';

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        
        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }
        
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/api/auth/error', // This is the default, but explicitly stating it can help debugging
  },
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // The user object here is the one from the database session.
      // We can add the user ID to the session object.
      // @ts-ignore
      session.user.id = user.id;
      return session;
    },
  }
};

const handler =