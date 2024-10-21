import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export async function GET(request:Request,{params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(session?.user){
            return NextResponse.json({message:"user not loggged in "},{status:401})
        }

        const {id} = params

        const warehouse = await prisma.warehouse.findUnique({
            where:{id}
        })

        if(!warehouse){
            return NextResponse.json({message:'Warheouse not found'},{status:404})
        }

        const transaction = await prisma.transaction.findMany({
            where:{
                OR:[
                    { fromWarehouseId :warehouse.id},
                    {toWarehouseId : warehouse.id}
                ]
            },
            include:{
                toWarehouse:true,
                fromWarehouse:true,
                product:true
            },
            orderBy:{
                createdAt: "desc"
            }
        })

        return NextResponse.json(transaction,{status:201})

    }catch(error){
        console.log("ERROR:::::",error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}