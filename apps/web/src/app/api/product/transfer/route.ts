import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:Request){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:"not logged in "},{status:401})
        }

        const { productId , fromWarehouseId ,toWarehouseId , quantity} = await request.json()

        const product = await prisma.product.findUnique({
            where:{
                id: productId
            }
        })

        if(!product){
            return NextResponse.json({message:"NO such prodcut exist"},{status:403})
        }

        const fromWarehouse = await prisma.warehouse.findFirst({where:{id:fromWarehouseId}})
        const toWarehouse = await prisma.warehouse.findUnique({where:{id:toWarehouseId}})

        if(!fromWarehouse || !toWarehouse){
            return NextResponse.json({message:"No such Warehouse exists"},{status:403})
        }

        const inventory = await prisma.inventory.findFirst({
            where:{
                productId,
                warehouseId: fromWarehouseId
            }
        })

        if(!inventory || inventory.Amt < quantity){
            return NextResponse.json({message:'Not enough prodict in the source warehouse'})
        }

        await prisma.inventory.update({
            where:{
                id:inventory.id
            },
            data:{
                Amt: inventory.Amt - quantity
            }
        })

        const destInventory = await prisma.inventory.findFirst({
            where:{
                productId,
                warehouseId:toWarehouseId
            }
        })

        if(destInventory){
            await prisma.inventory.update({
                where:{
                    id: destInventory.id
                },
                data:{
                    Amt: destInventory.Amt + quantity,
                }
            })
        }else{
            await prisma.inventory.create({
                data:{
                    productId,
                    warehouseId:toWarehouseId,
                    Amt: quantity
                }
            })
        }

        const transaction = await prisma.transaction.create({
            data:{
                productId,
                fromWarehouseId,
                toWarehouseId,
                Amt: quantity
            }
        })


        return NextResponse.json({message:'Prodcut transfered successfully'},{status:201})

    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:'Internal server error'},{status:500})
    }
}