import { ReactNode } from "react"
import Sidebar from "./_components/Sidebar"


const DashboardLayout = ({children}:{children:ReactNode}) => {

    return (
        <div className="p-4 w-[95%]">
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 border-2 border-[#cba0be] bg-[#cba0be]   rounded-lg">
                <Sidebar />
            </div>
            <div className="col-span-4 rounded-md border-[#0d1018] bg-[#5a6da5] p-4 ">
                    {children}
            </div>
        </div>
    </div>
    )
}

export default DashboardLayout