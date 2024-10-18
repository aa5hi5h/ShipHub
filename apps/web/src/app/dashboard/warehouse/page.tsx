"use client"
import { fetchWarehouses } from "@/actions/warehouse"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


const DashboardWarehousesPage = () => {

    const router = useRouter()

    const {isError,isLoading,data:warehouses,error} = useQuery({
        queryKey: ["Warehouse"],
        queryFn: fetchWarehouses
    })


    if(isError){
        return <span className="text-red-500">ERROR::::{error.message}</span>
    }

    if(isLoading){
        return <div>Loading....</div>
    }


    console.log("::::",)

    return (
        <div className="p-2 w-full">
            <div className=" flex justify-end"><Button onClick={() => router.push("/dashboard/warehouse/new")} className="bg-[#b87d8a]/50 hover:bg-[#cba0be]">New</Button></div>
            <div className="text-white pt-5">Ware houses are coool Baby !!! All the ware housess will be 
                Shown HEre ..... HAHAHAHHAHAHh  </div>
                <div className="grid grid-cols-3 gap-4">
                    {warehouses.data.map((warehouse:any) => (
                        <div onClick={() => router.push(`/dashboard/warehouse/${warehouse.id}`)} key={warehouse.id} className="p-4 relative cursor-pointer text-white rounded-md border-2 max-h-[280px] overflow-hidden border-white ">
                        <h2>{warehouse.name}</h2>
                        <p>{warehouse.location}</p>
                        <p>Created at: {new Date(warehouse.createdAt).toLocaleString()}</p>
                        <p>Updated at: {new Date(warehouse.updatedAt).toLocaleString()}</p>
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white"></div>
                    </div>
                    ) )}
                </div>
        </div>
    )
}

export default DashboardWarehousesPage