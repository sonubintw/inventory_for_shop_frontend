import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "./productService";
import { toast } from "react-toastify";
//createAsyncThunk is used for sending async http request from the store

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: []
}

//create new product using thunk
export const createProduct = createAsyncThunk(
    //just a name check documentation
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await createNewProduct(formData)
        } catch (error) {
            console.log(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


//get All product
export const getAllProduct = createAsyncThunk(
    //just a name check documentation
    "products/get",
    async (_, thunkAPI) => {
        try {
            return await getProducts()
        } catch (error) {
            // console.log(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

//delete a product
export const delete_A_product = createAsyncThunk(
    "product/delete",
    async (id, thunkAPI) => {
        // console.log(typeof (id));
        try {
            return await deleteProduct(id)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

//get single product
export const getSingleProductOnly = createAsyncThunk(
    "product/onlySingleProduct",
    async (id, thunkAPI) => {
        try {
            return await getSingleProduct(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


//update product
export const updateSingleProduct = createAsyncThunk(
    "product/update",
    async ({ id, formData }, thunkAPI) => {
        // console.log(id);
        try {
            return await updateProduct(id, formData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        //actions = capitalized
        CALC_STORE_VALUE(state, action) {
            const products = action.payload
            const arr = [];
            products.map((elem) => {
                const { price, quantity } = elem;
                const productValue = price * quantity
                return arr.push(productValue)
            })
            const totalValue = arr.reduce((a, b) => {
                return a + b;
            }, 0)//initital value
            state.totalStoreValue = totalValue;

        },

        CALC_OUTOFSTOCK(state, action) {
            const products = action.payload
            const arr = [];
            products.map((elem) => {
                const { quantity } = elem;
                return arr.push(quantity)
            })
            let count = 0;
            arr.forEach((elem) => {
                if (elem === 0 || elem === "0") {
                    count++
                }
            })
            state.outOfStock = count;
        },

        CALC_CATEGORY(state, action) {
            const products = action.payload
            const arr = []
            products.map((elem) => {
                const { category } = elem;
                return arr.push(category);
            })
            const uniqueCategory = [...new Set(arr)]//to have unique data inside it
            state.category = uniqueCategory
        }
    },

    //here the response is store from the request made from asyncthunk
    //https://redux-toolkit.js.org/api/createAsyncThunk documentation for my future reference
    extraReducers: (builder) => {
        builder
            ///////////////add product

            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // console.log(action.payload)
                state.products.push(action.payload)
                toast.success("Product added sucsexfully")
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                toast.error(action.payload)
            })


            ////////////getAllProduct
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                // console.log(action.payload)
                state.products = action.payload;

            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                toast.error(action.payload)
            })


            ////////////deleteProduct
            .addCase(delete_A_product.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delete_A_product.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product deleted successfully")

            })
            .addCase(delete_A_product.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                toast.error(action.payload)
            })

            //getSingleProduct
            .addCase(getSingleProductOnly.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProductOnly.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getSingleProductOnly.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //updateSingleProduct
            .addCase(updateSingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("product updated successfully")
            })
            .addCase(updateSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
    }
})

export const { CALC_STORE_VALUE } = productSlice.actions

export const { CALC_OUTOFSTOCK } = productSlice.actions

export const { CALC_CATEGORY } = productSlice.actions
//to access individual state anywhere in the project

//state.product.ANYTHING that product is the name given to product ini store.js therefore product is also typed
export const selectIsLoading = (state) => state.product.isLoading

export const selectTotalStoreValue = (state) => state.product.totalStoreValue

export const selectOutOfStock = (state) => state.product.outOfStock

export const selectCategory = (state) => state.product.category

export const selectProduct = (state) => state.product.product

export default productSlice.reducer