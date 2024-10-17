import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function Get(request:Request, {params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:"Not Authenticated"},{status:409})
        }

        const {id} = params

        const product = await prisma.product.findUnique({
            where:{
                id
            }
        })

        return NextResponse.json({message:'Success , get the single product from the db'},{status:201})

    }catch(error){

        return NextResponse.json({message:'Internal server error '},{status:500})

    }
}

export async function PATCH( request: Request , {params}:{params:{id:string}}) {

    try{
        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:"Not authenticated "},{status:409})
        }

        const {id} = params
        const {name , description , image} = await  request.json()

        const editProduct = await prisma.product.update({
            where:{
                id
            },
            data:{
                name,
                description,
                image,
            }
        })

        return NextResponse.json({message:"Sucess , while updating the product "}, {status:201})
    }catch(error){

        return NextResponse.json({message:"Internal server error "},{status:500})
    }
}


export async function DELETE({params}:{params:{id:string}}){
    try{

        const session = await getServerSession()

        if(!session?.user){
            return NextResponse.json({message:'User NOt authenticated'},{status:409})
        }

        const {id} = params

        const deleteProduct = await prisma.product.delete({
            where:{
                id
            }
        })

        return NextResponse.json({message:"Success , while deleteing the prodcut "},{status:201})

    }catch(error){
        console.log("ERORORORO", error)
        return NextResponse.json({message:'Internal Server error '},{status:500})
    }
}