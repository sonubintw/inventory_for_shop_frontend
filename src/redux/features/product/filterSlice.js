import { createSlice } from "@reduxjs/toolkit";

//this file is for filter the product that the user have added to the state 
const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {
            const { products, search } = action.payload
            // console.log(products)
            const tempProducts = products.filter((elem) => {
                return elem.name.toLowerCase().includes(search.toLowerCase()) ||
                    elem.category.toLowerCase().includes(search.toLowerCase())
            })
            // console.log(tempProducts)

            state.filteredProducts = tempProducts//setting the filtered value to the state i.e state.filteredProducts

        }
    }
})

export const { FILTER_PRODUCTS } = filterSlice.actions;//The filterSlice.actions object will contain an action creator function called filterProducts. You can then import and use it to dispatch the corresponding action

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer