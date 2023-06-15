//Info about user is stored here 

import { createSlice } from "@reduxjs/toolkit"
//to store the username because its gonna get use in someparts of the 
const name = JSON.parse(localStorage.getItem("name"))

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",//from localstorage
    user: {
        name: "",
        email: "",
        phoneNo: "",
        bio: "",
        image: "",
    },
}

const authSlice = createSlice({
    name: "auths",
    initialState,
    // state should be updated in response to different actions.
    reducers: {
        //accessing the initial state
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action) {
            localStorage.setItem("name", JSON.stringify(action.payload));
            state.name = action.payload
        },
        SET_USER(state, action) {
            const profile = action.payload;//getting data from form 
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phoneNo = profile.phoneNo;
            state.user.bio = profile.bio;
            state.user.image = profile.image;
        }
    }
})

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

//
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn // syntax: state.name_given_at_store.js.variable or function to export individually
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user


export default authSlice.reducer;// can be imported as anyName eg tmkc,TAG anything which is valid in js