"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Dashboard from "../page"

const Sidebar = () => {

    const router = useRouter()

    const [selected,setSelected] = useState("dashboard")
    //this is a bad practice wer should fetch from the url to see user is on which page 


    const handleClick  = (slug:string) => {
        setSelected(slug)
        if(slug === "dashboard"){
            router.push(`/${slug}`)
        }else{
            router.push(`/dashboard/${slug}`)
        }
    }

    return (
        <div className="p-2 w-full">
            <div className="flex flex-col  gap-4 px-8 my-8 ">
                <div onClick={() => handleClick("dashboard")} className={`text-2xl p-2  font-semibold cursor-pointer ${selected === "dashboard" ? "text-white": "text-black"} `}>Dashboard</div>
                <div onClick={() => handleClick("products")} className={`text-xl p-2 font-semibold cursor-pointer ${selected === "products" ? "text-white": "text-black"}` }>Products</div>
                <div onClick={() => handleClick("warehouse")} className={`text-xl p-2 font-semibold cursor-pointer ${selected === "warehouse" ? "text-white" : "text-black"} `} >Warehouses</div>
            </div>
        </div>
    )
}

export default Sidebar