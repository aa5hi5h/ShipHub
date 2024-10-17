"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {useMutation} from "@tanstack/react-query"
import axios from "axios"


const CreateProduct = () => {

    const formSchema = z.object({
        name: z.string().min(1,{
            message:"You must give name to the product"
        }),
        description: z.string().optional(),
        image:z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description:'',
            image: ''
        }
    })

    const {mutate:CreateProduct} = useMutation({
        mutationFn : async(payload:z.infer<typeof formSchema>) => {

            const data = await axios.post("/api/product",payload)
            return data
        },
        onError: (error) => {
            console.log("EROROOROR",error)
        },
        onSuccess: (data) => {
            console.log("Successfully created the Product",data)
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        
        const payload = {
            name : values.name,
            description : values.description,
            image:  values.image,
            manufacturerId: "670b3dfc10abfd963a4abff5"
        }

        console.log("this is the data i am sending to the backend",payload)

        CreateProduct(payload)
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="max-w-[420px] rounded-lg  p-8 space-y-4">
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-white">Product Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                     />
                     <FormField
                     control={form.control}
                     name="description"
                     render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-white">Product Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                     <FormField
                     control={form.control}
                     name="image"
                     render ={({field}) => (
                        <FormItem>
                            <FormLabel className="text-white">Product Image</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                    <Button className=" w-full mt-4 bg-[#b87d8a] hover:bg-[#b87d8a]/80 " type ="submit">Create</Button>

                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateProduct