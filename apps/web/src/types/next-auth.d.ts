import NextAuth from "next-auth";

declare module "next-auth"{
    interface User{
        id: string
        username: string
    }
    interface session{
        username : User,

        token:{
            id:string
            username: string
        }
    }
}