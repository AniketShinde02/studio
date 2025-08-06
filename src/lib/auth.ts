
import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials.password) {
          console.log('Missing credentials');
          return null;
        }

        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user || !user.password) {
          console.log('User not found or password missing for email:', credentials.email);
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          console.log('Password mismatch for user:', credentials.email);
          return null;
        }
        
        const userObject = user.toObject();
        delete userObject.password;
        return userObject;
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/api/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.id = user._id.toString();
        token.email = user.email;
        // @ts-ignore
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        // @ts-ignore
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },
};
