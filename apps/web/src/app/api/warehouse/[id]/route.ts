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

        const {longitude,latitude,address} = await request.json()

        const warehouse = await prisma.warehouse.findUnique({
            where:{
                id
            },
            select: {manufacturerId : true}
        })

        if(!warehouse || warehouse.manufacturerId !== session?.user?.id){
            return NextResponse.json({message:"You are not authorized to edit this warehouse"},{status:412})
        }

        const updatedWareHouse = await prisma.warehouse.update({
            where:{
                id
            },
            data:{
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


export async function DELETE({params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:'You are not registered to perform this task'},{status:409})
        }

        const { id } = params

        const warehouse = await prisma.warehouse.findUnique({
            where:{
                id
            },
            select: {manufacturerId: true}
        })

        if(!warehouse || warehouse.manufacturerId !== session.user.id){
            return NextResponse.json({message:"You are not authorized to make changes to this warehouse "},{status:422})
        }

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