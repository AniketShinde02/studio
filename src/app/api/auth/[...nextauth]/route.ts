
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials.password) {
          return null;
        }

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
        
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      if (account?.provider === 'google') {
        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            email: user.email,
            name: user.name,
            // Create a random hashed password for Google users as it's required by schema
            password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
          });
        }
        user.id = dbUser._id.toString();
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
