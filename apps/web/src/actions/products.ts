import axios from "axios"


export const fetchProducts = async() => {
    
    const response = await axios.get("/api/product")

    return response.data
}


export const fetchProductById = async(id:string) => {

    const response = await axios.get(`/api/product/${id}`)

    console.log("RESPONSE_DATA::::",response.data)

    return response.data
}


export const fetchWarehouses = async() => {

    const response = await axios.get("/api/warehouse")

    return response.data
}

export const fetchWarehouseById = async(id:string) => {

    const response = await axios.get(`/api/warehouse/${id}`)

    return response.data
}