//this is for http request for Products
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//create new product
export const createNewProduct = async (formData) => {
    const resp = await axios.post(`${BACKEND_URL}/v1/api/products/`, formData)
    return resp.data
}


//get all products
export const getProducts = async () => {
    const resp = await axios.get(`${BACKEND_URL}/v1/api/products/`)
    return resp.data
}

//delete a product
export const deleteProduct = async (id) => {
    const resp = await axios.delete(`${BACKEND_URL}/v1/api/products/delete/${id}`)
    return resp.data
}

//get only single product to view 
export const getSingleProduct = async (id) => {
    const resp = await axios.get(`${BACKEND_URL}/v1/api/products/${id}`)
    return resp.data
}
//update product
export const updateProduct = async (id, formData) => {
    const resp = await axios.patch(`${BACKEND_URL}/v1/api/products/update/${id}`, formData)
    return resp.data
}