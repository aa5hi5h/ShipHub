"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const DashboardProductPage = () => {

    const router = useRouter()

    return (
        <div className="p-2 w-full">
            <div className=" flex justify-end"><Button onClick={() => router.push("/dashboard/products/new")} className="bg-[#b87d8a]/50 hover:bg-[#cba0be]">New</Button></div>
            <div className="text-white pt-5">Here all the different products will be shown </div>
        </div>
    )
}

export default DashboardProductPage