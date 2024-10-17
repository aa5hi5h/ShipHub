"use client"

import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


const Navbar = () => {

    const session = useSession()
    const router  = useRouter()

    return (
        <div className="flex justify-between items-center p-4">
            < div onClick={() => router.push("/")} className="text-4xl font-bold tracking-tight">
                Inventory
            </div>
            <div className="flex gap-4">
                <Button variant={"ghost"}>About</Button>
                <Button variant={"ghost"}>Start your Inventory</Button>
                {session?.data?.user ? <Button>SignOut</Button> : <Button onClick={() => router.push("/auth")}>SignIn</Button>}
            </div>
        </div>
    )
}

export default Navbar