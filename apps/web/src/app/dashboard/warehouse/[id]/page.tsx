"use client"
import { fetchWarehouseById } from "@/actions/warehouse"
import { Button } from "@/components/ui/button"
import {useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"


const WareHouseDetail = ({params}:{params:{id:string}}) => {

    const { id} = params

    const router = useRouter()

    const {isError,isLoading,data:warehouse, error} = useQuery({
        queryKey: ["warehouse"],
        queryFn: () => fetchWarehouseById(id)
    })


    const {mutate:RemoveWarehouse} = useMutation({
        mutationFn: async(payload:any) => {
            console.log("HAHHAHAHAHAHAH",payload)
            const response = await axios.delete(`/api/warehouse/${payload.warehouseId}`,payload)

            return response.data
        },
        onError: (error) => {
            console.log("ERROR_CLIENT_SIDE",error)
        },
        onSuccess: () => {
            console.log("success")
            router.push("/dashboard/warehouse")
        }
    })

    const onDelete = () => {

        const payload = {
            warehouseId: warehouse.data.id ,
            manufacturerId: warehouse.data.manufacturerId
        }

        console.log("PAYLOAD::::",payload)

        RemoveWarehouse(payload)
    }


    if(isLoading){
        return <div className="text-white">Loading....</div>
    }

    if(isError){
        return <span className="text-red-500">ERROR::::,{error.message}</span>
    }

    console.log("WAREHOUSE_DATA:::::",warehouse)

    return (
        <div >
            <div className="flex gap-4 justify-end">
                <Button onClick={() => router.push(`/dashboard/warehouse/update/${warehouse.data.id}`)} className="bg-[#b87d8a] hover:bg-[#b87d8a]/80">Edit</Button>
                <Button  onClick={onDelete} className="bg-red-500 hover:bg-red-500/80">Delete</Button>
            </div>
            <div className="text-white">
                <h1>{warehouse.data.name}</h1>
                <div className="flex flex-col space-y-4">
                    <h3>Location</h3>
                    <span>{warehouse.data.location.address}</span></div>
            </div>
        </div>
    )
}

export default  WareHouseDetail