import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export async function GET(request:Request,{params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:"user not logged in"},{status:401})
        }

        const {id} = params

        const product = await prisma.product.findUnique({
            where:{id}
        })

        if(!product){
            return NextResponse.json({message:"no such product exist"},{status:401})
        }

        const transaction = await prisma.transaction.findMany({
            where:{
                productId:product.id
            },
            include:{
                product:true,
                toWarehouse:true,
                fromWarehouse:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return NextResponse.json(transaction,{status:201})

    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:"internal server error"},{status:500})
    }
}