//https request all here;

import axios from "axios";
import {toast} from "react-toastify"


// const BACKEND_URL=`http://localhost:5000`//checking purpose
const BACKEND_URL=process.env.REACT_APP_BACKEND_URL
//custom made function to check whether the email is valid or !valid
export const validateEmail=(email)=>{
    //match() is a regex function
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
}
//registerUser
export const registerUser=async(userData)=>{
    try {
        
        const res = await axios.post(`${BACKEND_URL}v1/api/users/register`,userData)// {withCredentials:true} because as we login we receive a token back from the post request so save it we use withCredentails but no need to write it after every request as we declared it globally in App.js
        toast.success("registered suxsexfully")
        // console.log(res.data)
        return res.data
    } catch (error) {
        // console.log(error.response.data)
        toast.error(error.response.data.message)
        return
    }
}


//login
export const loginUser=async(userData)=>{
    try {

        const res = await axios.post(`${BACKEND_URL}v1/api/users/login`,userData)//because as we register we receive a token back from the post request so save it we use withCredentails
        // console.log(res.data)
        if(res.status==="OK"){
            toast.success("login suxsexfully")
        }
        return res.data
    } catch (error) {
        // console.log(error.response.data)
        toast.error(error.response.data.message)
        
    }
}

//Logout User
export const logoutUser=async()=>{
    try{
        await axios.get(`${BACKEND_URL}v1/api/users/logout`)

    }catch (error){
        toast.error(error.response.data.message);
    }
}


//Forgot password
export const forgotPassword=async(userData)=>{
    try{
        // console.log(userData)
        const res=await axios.post(`${BACKEND_URL}v1/api/users/forgotpassword`,userData)
        // console.log(res)
        toast.success(res.data.message)

    }catch (error){
        console.log(error)
        toast.error(error.response.data.message);
    }
}

//Reset password
export const resetPassword=async(userData, resetToken)=>{
    try{
        const res=await axios.put(`${BACKEND_URL}v1/api/users/resetPassword/${resetToken}`,userData)
        toast.success(res.data.message)
        return res.data

    }catch (error){
        // console.log(error)
        toast.error(error.response.data.message);
    }
}


//get login status
export const getLoginStatus=async()=>{
    try{
        const res=await axios.get(`${BACKEND_URL}v1/api/users/loggedinstatus`)
        toast.success(res.data.message)
        return res.data

    }catch (error){
        // console.log(error)
        toast.error(error.response.data.message);
    }
}


//get userDetails
export const getUser=async()=>{
    try {
        const res= await axios.get(`${BACKEND_URL}v1/api/users/getuser`)
        toast.success(res.data.message)
        return res.data
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
    }
}


//update user Profile
export const updateUser=async(formData)=>{
    try {
        const res= await axios.patch(`${BACKEND_URL}v1/api/users/updateuser`,formData)
        toast.success(res.data.message)
        return res.data
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
    }
}

export const changeUserPassword=async(formData)=>{
    try {
        const res= await axios.patch(`${BACKEND_URL}v1/api/users/changepassword`,formData)
        toast.success(res.data.message)
        return res.data
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
    }
}



