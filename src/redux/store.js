import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "../redux/features/auth/authSlice"//The naming of import is completely independent in default export and we can use any name we like
import productReducer from "../redux/features/product/productSlice"//The naming of import is completely independent in default export and we can use any name we like
import filterReducer from "../redux/features/product/filterSlice"

export const Store = configureStore({
    reducer: {
        auth: authSliceReducer,//this auth can be anything like what ever is valid in js eg _red or red or RED
        product: productReducer,
        filter: filterReducer
    }
})