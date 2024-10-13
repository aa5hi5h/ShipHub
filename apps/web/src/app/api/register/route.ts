import { prisma } from "../../../lib/db"
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt"


export async function POST (request: Request){
    try{
        const {email,username,password} = await request.json()

        if(!email || !username || ! password){
            throw new Error("Please fill in all the details")
        }

        const ExitedUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        
        if(ExitedUser){
            return NextResponse.json({message:"USer with this email already exist"},{status:409})
        }

        const ExistedUsername = await prisma.user.findUnique({
            where:{
                username
            }
        })

        if(ExistedUsername){
            return NextResponse.json({message:"user with this username already existed"},{status:409})
        }

        const hashedPass = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                email,
                username,
                password: hashedPass
            }
        })

        return NextResponse.json({user:newUser,message:"User created succesfully"},{status:200})
    }catch(error){
        console.log("REGISTER_ROUTE_ERROR",error)
        return NextResponse.json({message:"Internal server errorr"},{status:500})
    }
}