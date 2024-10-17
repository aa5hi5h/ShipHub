import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function Get(request:Request){
    try{
    const session = await getServerSession()

    if(!session?.user){
        return NextResponse.json({message:"Not Authenticated "},{status:409})
    }

    const product = await prisma.product.findMany({
        orderBy: [
            {createdAt: "desc"}
        ]
    })

    return NextResponse.json({message:"Success",data:product},{status:201})
}catch(error){
    return NextResponse.json({message:'Internal Server Error'},{status:500})
}
}


export async function POST(request:Request){
    try{
        const session = await getServerSession()

        const user = await prisma.user.findUnique({
            where:{
                email: "cat@gmail.com"
            }
        })

        console.log("USER:::::",user)

        if(!session?.user){
            return NextResponse.json({message:'User not authenticated'},{status:409})
        }
        const {name, description , image , manufacturer} = await request.json()

        if(!name || !description || !image || !manufacturer){
            return NextResponse.json({message:"Incomplete Data"},{status:422})
        }

        console.log("DATA:::::::",name,description,image,manufacturer)

        const newProduct = await prisma.product.create({
            data:{
                name,
                description,
                image,
                manufacturer
            }
        })

        return NextResponse.json({message:"Success, Created a new Product",data:newProduct},{status:201})
    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:'Internal server Error'},{status:500})
    }
}