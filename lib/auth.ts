import GoogleProvider from 'next-auth/providers/google';
import { db } from '@lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter'; // se debe instalar el paquete de manera independiente
import { nanoid } from 'nanoid';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db), //Esta db es boilerplate code va en la ruta lib/db.ts para que prisma no se instancia varias veces
  session: {
    strategy: 'jwt', // ya que se le especifico un adapter la strategy cambia a database, por eso hay que hardcodear la strategy a jwt nuevamente
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // que va a pasar cuando una session se cree
      // crear los types en types/next-auth.d.ts
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        //Cuando el usuario aun no esta en la database
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10), // genera automaticamente una string aleatoria
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect() {
      return '/';
    },
  },
};
