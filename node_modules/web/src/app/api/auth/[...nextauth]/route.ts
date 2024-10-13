import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from "../../../../lib/db";
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt'


export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) ,
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_URL,
    pages: {
        signIn: "/sign-in"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SCERET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {type:"email", label:"email"},
                username: {type:"text", label:"username"},
                password: {type:"password", label:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password ){
                    return null
                }

                const ExitedUser = await prisma.user.findUnique({
                    where:{
                        email: credentials.email,
                    }
                })

                if(!ExitedUser){
                    return null
                }

                const validPass = await bcrypt.compare(credentials.password, ExitedUser.password!)

                if(!validPass){
                    return null
                }
            return{
               id: ExitedUser.id,
               email: ExitedUser.email,
               username:  ExitedUser.username || ""
            }
            }
        })
    ] ,
    callbacks: {
        async jwt({token,user}){
            if(user){
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({session,token}){

            return {
                ...session,
                user:{
                    ...session.user,
                    username: token.username
                }
            }
        }
    } ,
}

const handler = NextAuth(authOption)

export {handler as GET , handler as POST}