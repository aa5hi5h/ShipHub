'use client'
import { fetchWarehouseById } from "@/actions/warehouse"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"


const UpdateWarehouseListing = ({params}:{params:{id:string}}) => {

    const {id} = params

    const router = useRouter()

    const {isLoading,isError,data:Warehouse,error} = useQuery({
        queryKey: ["warehouse"],
        queryFn: () => fetchWarehouseById(id)
    })

    console.log("WAREHOUSE",Warehouse)

    const formSchema = z.object({
        name: z.string().min(1,{
            message:'You must specifies the name to the Warehouse'
        }),
        location: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            location: ""
        }
    })

    const { mutate:UpdateWarehouse} = useMutation({
        mutationFn: async(payload: z.infer<typeof formSchema>) => {
            const response = await axios.patch(`/api/warehouse/${id}`,payload)
            
            return response.data
        },
        onError: (error) =>{
            console.log("ERROR_IN_CLIENT_SIDE:::",error)
        },
        onSuccess: () => {
            console.log("successfully updated the Warehouse")
            router.push("/dashboard/warehouse")        
        }
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        
        const payload = {
            name: values.name,
            location: values.location,
            address:values.location,
            manufacturerId: Warehouse.data.manufacturerId,
            longitude: 2344.344,
            latitude: 832332.2
        }

        console.log("Payload",payload)

        UpdateWarehouse(payload)
    }

    

    if(isLoading){
        return <div className="text-white">Loading....</div>
    }

    if(isError){
        return <span className="text-red-500">Error....{error.message}</span>
    }

    return (
        <Card className="w-[480px]">
            <CardHeader>
                Update Warehosue Listing....
            </CardHeader>
            <CardContent>
            <Form {...form}>
                    <form className="rounded-lg space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder={Warehouse.data.name} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField 
                        name="location"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Input placeholder={Warehouse.data.location.address} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex justify-between">
                        <Button>Cancel</Button>
                        <Button type="submit" >Update</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default UpdateWarehouseListing