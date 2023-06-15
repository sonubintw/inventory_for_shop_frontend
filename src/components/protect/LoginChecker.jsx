//this component is for when the user is loggedIn only then it will get displayed


import {useSelector} from 'react-redux'
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"


export const ShowOnLogin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }else{
        return null;
    }
}


export const ShowOnLogout=({children})=>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
 
    if(!isLoggedIn){
       return children
    }else{
        return null
    }
 }