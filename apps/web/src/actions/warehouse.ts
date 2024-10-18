import axios from "axios"

export const fetchWarehouses = async() => {

    const response = await axios.get("/api/warehouse")

    return response.data
}

export const fetchWarehouseById = async(id:string) => {

    const response = await axios.get(`/api/warehouse/${id}`)

    return response.data
}