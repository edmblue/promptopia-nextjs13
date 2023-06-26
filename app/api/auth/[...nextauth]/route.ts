import NextAuth from 'next-auth/next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

const handler = NextAuth(authOptions);

export const getAuthSession = () => getServerSession(authOptions);

export { handler as GET, handler as POST };
