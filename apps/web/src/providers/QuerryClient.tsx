"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"



const QueryProvider = ({children}:{children:React.ReactNode}) => {

    const queryClinet = new QueryClient()
    return (
        <QueryClientProvider client={queryClinet}>
            {children}
        </QueryClientProvider>
    )
} 

export default QueryProvider