import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"



export async function GET(request:Request,{params}:{params :{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:"User is not Authenticated"},{status:409})
        }

        const {id} = params


        const WareHouse = await prisma.warehouse.findUnique({
            where:{
                id,
            },
            include: {
                location: true
            }
        })

        return NextResponse.json({message:"Success",data:WareHouse},{status:201})

    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:"Internal server Error"},{status:500})
    }
}


export async function PATCH(request:Request,{params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        

        if(!session?.user){
            return NextResponse.json({message:"user not Registerd"},{status:409})
        }

        const {id} = params

        const {name,longitude,latitude,address,manufacturerId} = await request.json()

        const warehouse = await prisma.warehouse.findUnique({
            where:{
                id
            },
            select: {manufacturerId : true}
        })

        console.log("MANUFACTURE_ID",manufacturerId)
        console.log("WAREHOUS_ID",warehouse?.manufacturerId)

        if(!warehouse || warehouse.manufacturerId !== manufacturerId ){
            return NextResponse.json({message:"You are not authorized to edit this warehouse"},{status:412})
        }

        const updatedWareHouse = await prisma.warehouse.update({
            where:{
                id
            },
            data:{
                name,
                location:{
                    update:{
                        longitude,
                        latitude,
                        address
                    }
                }
            }
        })

        return NextResponse.json({message:"Success in updating the warehouse",data:updatedWareHouse},{status:201})

    }catch(error){
        console.log("ERROR::::",error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}


export async function DELETE(request:Request,{params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:'You are not registered to perform this task'},{status:409})
        }

        const { id } = params

        console.log("PARAMS",id)

        const warehouse = await prisma.warehouse.findUnique({
            where:{
                id
            },
            select: {manufacturerId: true}
        })

        const removeWarehouse = await prisma.warehouse.delete({
            where:{
                id
            }
        })

        return NextResponse.json({message:'Success in deleting the warehouse'},{status:201})

    }catch(error){
        console.log("ERROROR:::::",error)
        return NextResponse.json({message:"internal server errorr"},{status:500})
    }
}