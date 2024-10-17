"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"



const LandingPage = () => {

    const router = useRouter()

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-6xl font-medium text-center pt-[7rem] tracking-tighter flex flex-col">
                Build. Analyise.
                <span className="text-center">Track.</span>
            </div>
            <p className="text-center pt-3 text-purple-900 font-medium">
                " We are determined to help you track your every Product detail with our product wheter you are a retailer , manufacturer or a distributer."
            </p>
            <div className="flex justify-center space-x-4 pt-8 ">
                <Button onClick={() => router.push("/dashboard/inventory")} className="bg-indigo-900 hover:bg-indigo-900/80">New Inventory</Button>
                <Button onClick={() => router.push("/dashboard")} className="bg-purple-800 hover:bg-purple-800/80">Go to dashboard</Button>
            </div>
        </div>
    )
}

export default LandingPage