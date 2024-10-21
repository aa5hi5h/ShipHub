import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextFetchEvent, NextResponse } from "next/server"



export async function POST(request:Request){

    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:'user not logges in'},{status:401})
        }

        const {productId,warehouseId,quantity} = await request.json()

        if(!productId || !warehouseId || !quantity || quantity < 0 ){
            return NextResponse.json({message:'Error or missing required fields'},{status:401})
        }

        const product = await prisma.product.findUnique({where:{id:productId}})

        if(!product){
            return NextResponse.json({message:"Product not found"},{status:404})
        }

        const warehosue = await prisma.warehouse.findUnique({
            where:{id:warehouseId}
        })

        if(!warehosue){
            return NextResponse.json({message:"Warehouse not found"},{status:404})
        }

        const inventory = await prisma.inventory.findFirst({
            where:{
                productId,
                warehouseId
            }
        })

        if(!inventory || inventory.Amt < quantity){
            return NextResponse.json({message:"not enough products in the inventory"},{status:403})
        }

        await prisma.inventory.update({
            where:{
                id:inventory.id
            },
            data:{
                Amt: Math.max(inventory.Amt - quantity,0)
            }
        })

        const transaction = await prisma.transaction.create({
            data:{
                productId,
                toWarehouseId:null,
                fromWarehouseId: warehouseId,
                Amt: quantity
            }
        })

        return NextResponse.json({message:"Product sold to the end customer"},{status:201})

    }catch(error){
        console.log("ERROR:::",error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}