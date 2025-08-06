
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
        
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
