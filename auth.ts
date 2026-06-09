import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const validPassword =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!validPassword) {
          return null;
        }
        if (!user.isVerified) {
          throw new Error(
            "Please verify your email first"
          );
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,

        };
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },


    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;

      return session;
    },
  },
});