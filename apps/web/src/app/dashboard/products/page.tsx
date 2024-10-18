"use client"
import { fetchProducts } from "@/actions/products"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const DashboardProductPage = () => {

    const router = useRouter()

    const {status,isLoading,isError,data:products,error} = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts
    })

    if(isLoading){
        return <div>Loading.....</div>
    }

    if(isError){
        return <span>Error::::{error.message}</span>
    }

    if(!products){
        return "loading...."
    }

    console.log("DATA::::",products.data)

    

    return (
        <div className="p-2 pb-16 w-full">
            <div className=" flex justify-end"><Button onClick={() => router.push("/dashboard/products/new")} className="bg-[#b87d8a]/50 hover:bg-[#cba0be]">New</Button></div>
            <div className="text-white pt-5">Here all the different products will be</div>
            <div className="grid grid-cols-3 pt-4 gap-8">
            {products.data.map((product:any) => (
                 <div onClick={() => router.push(`products/${product.id}`)} key={product.id} className="p-4 relative cursor-pointer text-white rounded-md border-2 max-h-[280px] overflow-hidden border-white ">
                 <h2>{product.name}</h2>
                 <p>{product.description}</p>
                 <img src={product.image} alt={product.name} className="product-image" />
                 <p>Manufacturer ID: {product.manufacturerId}</p>
                 <p>Created at: {new Date(product.createdAt).toLocaleString()}</p>
                 <p>Updated at: {new Date(product.updatedAt).toLocaleString()}</p>
                 <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white"></div>
             </div>
            ))}
            </div>
        </div>
    )
}

export default DashboardProductPage