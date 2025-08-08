
import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect, { clientPromise } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
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
          console.error('Auth Error: Missing credentials');
          return null;
        }
        
        try {
          await dbConnect();
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
        
        // Return a plain object, not a Mongoose document.
        return {
          id: user._id.toString(),
          email: user.email,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, user object is passed.
      if (user) {
        token.id = user.id;
        token.createdAt = (user as any).createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the user ID from the token to the session object
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).createdAt = token.createdAt;
      }
      return session;
    },
  },
};
