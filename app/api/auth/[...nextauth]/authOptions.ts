import { NextAuthOptions } from "next-auth";
import prisma from "../../../../prisma/client";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const AuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_Client_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GOOGLE_Client_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.GOOGLE_Client_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        return user;
      },
    }),
  ],
  callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.type !== 'credentials' && user.email) {
                
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { emailVerified: true }
                });
                const isGoogleVerified = (profile as any)?.email_verified === true; 

                if (existingUser?.emailVerified === null && isGoogleVerified) {
                     await prisma.user.update({
                        where: { email: user.email },
                        data: { emailVerified: new Date() },
                     });
                     
                }
            }
            
            return true;
        },


        async jwt({ token, user, account }) {
            if (user) {
                if (user.email) {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email as string },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            emailVerified: true,
                            image: true,
                            role: true,
                            credit: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    });

                    token.user = existingUser; 
                }
            }
            
            return token;
        },

        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as any; 
            }
            
            return session;
        },
    },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
};
