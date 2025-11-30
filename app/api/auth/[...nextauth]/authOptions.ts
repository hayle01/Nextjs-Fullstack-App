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
        // Tani waxay xaqiijinaysaa in goobta password-ka aan lagu dhex keydin token-ka
        async jwt({ token, user, account }) {
            
            // Xaaladda 1: User-ku hadda ayuu galay (user object wuu jiraa)
            if (user) {
                
                // Soo qaad user-ka DB-ga oo dhan si loo hubiyo role-ka, xitaa haddii uu yahay OAuth
                // Hubi in user.email uu jiro
                if (user.email) {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email as string },
                    });

                    // Nadiifi Token-ka: Ku dar kaliya xogta muhiimka ah
                    token.id = existingUser?.id;
                    token.role = existingUser?.role || "user"; // Soo qaado role-ka DB-ga
                    
                    // Hubi in email Verified uu sidoo kale ku jiro Token-ka (Muhiim)
                    token.emailVerified = existingUser?.emailVerified;
                }
            }
            
            return token;
        },

        async session({ session, token }) {
            // Ku dar goobaha token-ka ee session-ka
            if (token.id) {
                session?.user?.id = token.id as string;
            }
            if (token.role) {
                session?.user?.role = token.role as string;
            }
            // Hubi in emailVerified uu sidoo kale ku jiro Session-ka
            if (token.emailVerified) {
                session.user.emailVerified = token.emailVerified as Date;
            }
            
            // Tani waxay hubinaysaa in session.user aysan noqon mid buuxa oo leh password iyo waxyaabo kale
            return session;
        },
    },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
};
