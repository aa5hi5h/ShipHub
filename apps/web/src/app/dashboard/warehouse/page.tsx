"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const DashboardWarehousesPage = () => {

    const router = useRouter()

    return (
        <div className="p-2 w-full">
            <div className=" flex justify-end"><Button onClick={() => router.push("/warehouse/new")} className="bg-[#b87d8a]/50 hover:bg-[#cba0be]">New</Button></div>
            <div className="text-white pt-5">Ware houses are coool Baby !!! All the ware housess will be 
                Shown HEre ..... HAHAHAHHAHAHh  </div>
        </div>
    )
}

export default DashboardWarehousesPage