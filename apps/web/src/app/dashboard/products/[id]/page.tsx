"use client"
import { fetchProductById } from "@/actions/products"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"


const ProductPage = ({params}:{params:{id:string}}) => {

    const {id} = params

    const router = useRouter()

    const {isError,isLoading,error,data:product} = useQuery({
        queryKey: ["Product"],
        queryFn: () => fetchProductById(id)
    }) 

    const {mutate:DeleteProduct,isError:DeletionError,error:DeletionErrorMesaage,isSuccess} = useMutation({
        mutationFn: async() =>{
            const response = await axios.delete(`/api/product/${id}`)
            return response.data
        },
        onError: (error) => {
            console.log("ERROR_WHILE_DELETING_PRODUCT::::",error)
        },
        onSuccess: (data) => {
            console.log("SuccessFULLY_DELETED_THE_PRODUCT")
            router.push("/dashboard/products")
        }
    })

    
    if(isError){
        return <span>ERROR::::,{error.message}</span>
    }

    if(isLoading){
        return <div>Loading.....</div>
    }

    return (
        <div>
            This is the Product Data will be Shown
            <div className="flex gap-4 justify-end">
                <Button onClick={() => router.push(`/dashboard/products/update/${product.data.id}`)} className="bg-[#b87d8a] hover:bg-[#cba0be]/80" >Edit</Button>
                <Button onClick={() => DeleteProduct()} className="bg-red-500 hover:bg-red-500/80">Delete</Button>
            </div>
            <div className="text-white">
            <h2>{product.data.name}</h2>
                 <p>{product.data.description}</p>
                 <img src={product.data.image} alt={product.data.name} className="product-image" />
                 <p>Manufacturer ID: {product.data.manufacturerId}</p>
                 <p>Created at: {new Date(product.data.createdAt).toLocaleString()}</p>
                 <p>Updated at: {new Date(product.data.updatedAt).toLocaleString()}</p>
                </div> 
        </div>
    )
}

export default ProductPage