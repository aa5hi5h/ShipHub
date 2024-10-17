"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import Sidebar from "./_components/Sidebar"

const Dashboard = () => {

    const session = useSession()

    const router = useRouter()

    if(!session.data?.user){
        return <div>YOu are not logged in</div>
    }
    return (
        <div>here something should come like this si the root dashboard page </div>
    )
}

export default Dashboard