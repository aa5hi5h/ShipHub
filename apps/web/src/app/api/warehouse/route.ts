import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET(request:Request){
    try{
    const session = await getServerSession()

    if(!session?.user){
        return NextResponse.json({message:'User is not authenticated'},{status:409})
    }

    const Warehouse = await prisma.warehouse.findMany({
        orderBy: [
            {createdAt: "desc"}
        ]
    })

    return NextResponse.json({message:'Successfully in getting the warehouse from db',data:Warehouse},{status:201})
}catch(error){
    console.log("ERRORR::::", error)
    return NextResponse.json({message:'Internal server error'},{status:500})
}
}


export async function POST(request:Request){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:'User not authenticated'},{status:409})
        }

        const {name,manufacturerId,location,longitude,latitude} = await request.json()

        console.log("DATA:::::",name,manufacturerId,location,longitude,latitude)

        if(!name || !manufacturerId || !location || !longitude || !latitude ){
            return NextResponse.json({message:"INcomplete data to create the warehouse"},{status:422})
        }

        const newWarehouse = await prisma.warehouse.create({
            data:{
                name,
                manufacturer:{
                    connect:{
                        id: manufacturerId,
                    }
                },
                location:{
                    create:{
                        longitude,
                        latitude,
                        address: location
                    }
                }
            }
        })

        return NextResponse.json({message:"New Warehouse Created",data:newWarehouse},{status:201})

    }catch(error){

        console.log("ERROR::::",error)
        return NextResponse.json({message:"Internal server erroror"},{status:500})
    }
}