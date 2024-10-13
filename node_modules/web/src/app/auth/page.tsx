"use client"
import { useState } from "react"
import SignInModal from "./_component/SignIn"
import SignUpModal from "./_component/SignUp"
import { AuthPage } from "@/types/auth"

const Auth = () => {

    const [page,setPage] = useState<AuthPage>("signIn")

    return (
        <div className="flex justify-center  items-center h-screen">
            {page === "signIn" ? <SignInModal setPage={setPage} /> : <SignUpModal setPage={setPage} />}
        </div>
    )
}

export default Auth