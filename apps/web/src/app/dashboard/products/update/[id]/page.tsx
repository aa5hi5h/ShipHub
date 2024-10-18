"use client"
import { fetchProductById } from "@/actions/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"


const updateProdcutListing = ({ params }: { params: { id: string } }) => {

    const { id } = params


    const router = useRouter()

    const { isError, data: product, isLoading, error } = useQuery({
        queryKey: ["PRODUCT"],
        queryFn: () => fetchProductById(id)
    })

    const formSchema = z.object({
        name: z.string().min(1, {
            message: 'You must give name to the product'
        }),
        description: z.string().optional(),
        image: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product?.data?.name || "",
            description: product?.data?.description || "",
            image: product?.data?.image || ""
        }
    })

    const { mutate: UpdateProduct } = useMutation({
        mutationFn: async (payload: z.infer<typeof formSchema>) => {
            const response = await axios.patch(`/api/product/${id}`, payload)
            return response.data
        },
        onError: (error) => {
            console.log("ERROR_WHILE_UPDATING", error)
        },
        onSuccess: (data) => {
            console.log("SUCCESSFULLY_UPDATED_THE_PROJECT")
            router.push("/dashboard/products")
        }
    })

    const onSubmit = (data: z.infer<typeof  formSchema>) => {
        const payload = {
            name: data.name,
            description: data.description,
            image: data.image,
            manufacturerId: "670b3dfc10abfd963a4abff5"
        }

        console.log("THIS_IS_THE_DATA_I_AM_SENDING",payload)

        UpdateProduct(payload)
    }

    console.log("PRODUCT:::::", product)

    if (isLoading) {
        return <div>Loading.....</div>
    }

    if (isError) {
        return <span className="bg-red-500">ERROR:::{error.message}</span>
    }

    return (
        <Card className="w-[420px]">
            <CardHeader>
                <CardTitle>Update Product Listing</CardTitle>
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
                                <Input placeholder={product.data.name} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField 
                        name="description"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder={product.data.description} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField 
                        name="image"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Image url:</FormLabel>
                                <Input placeholder={product.data.image} {...field}/>
                                <img src={field.value || product.data.image}  alt="Image preview" className="w-48 h-48" />
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

export default updateProdcutListing