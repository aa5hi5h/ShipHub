"use client"

import { ChildProcess } from "child_process"
import { SessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"

interface SessionProviderProp{
    children: ReactNode
}

const ClientSessionProvider : FC<SessionProviderProp> = ({children}) => {
    
    return  <SessionProvider>{children}</SessionProvider>
}


export default ClientSessionProvider