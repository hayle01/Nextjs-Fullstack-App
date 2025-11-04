import { NextAuthOptions } from "next-auth";
import prisma from "../../../../prisma/client";
import  GoogleProvider  from 'next-auth/providers/google'
import  GithubProvider  from 'next-auth/providers/github'
import  FacebookProvider  from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
export const AuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId : process.env.GOOGLE_Client_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId : process.env.GOOGLE_Client_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
        FacebookProvider({
            clientId : process.env.GOOGLE_Client_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    adapter: PrismaAdapter(prisma)
}