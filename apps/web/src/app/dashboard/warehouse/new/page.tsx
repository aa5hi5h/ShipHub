"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import z from "zod"

const CreateWareHouse = () => {

    const formSchema = z.object({
        name: z.string().min(1,{
            message:'You must specifies the name to the Warehouse'
        }),
        location: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            location: "",
        }
    })

    const {mutate: CreateWarehouse } = useMutation({
        mutationFn: async(payload : z.infer<typeof formSchema>) => {
            
            const data = await axios.post('/api/warehouse',payload)

        },
        onError: (error) => {
            console.log("ERROROR IN THE CLINET SIDE::::",error)
        },
        onSuccess : (data) => {
            console.log("SUCCESS IN Adding the warehouse")
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        
        const payload = {
            name: data.name,
            location: data.location ,
            manufacturerId: "670b3dfc10abfd963a4abff5",
            longitude: 2344.344,
            latitude: 832332.2
        }

        console.log("this is the data i am sending to the backend::::",payload)

        CreateWarehouse(payload)

    
    }

    return (
        <Card className="w-[420px]">
            <CardHeader>
                <CardTitle>Add Warehouse</CardTitle>
                <CardDescription>Create warehouses to mark and track the movement of products.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="max-w-[420]px rounded-lg ">
                            <FormField 
                            name="name"
                            control={form.control}
                            render ={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} />
                                    <FormDescription>To avoid any confusions please provide a generic name to your warehouse.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                            name="location"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit">Add</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div>the card footoer goes here...</div>
            </CardFooter>
        </Card>
    )
}

export default CreateWareHouse