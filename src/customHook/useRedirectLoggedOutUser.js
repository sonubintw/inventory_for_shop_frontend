//if you want to create a custom hook in react you should use thr "use" word to its name like this file
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getLoginStatus } from "../services/authService"
import { SET_LOGIN } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify";

//function to redirect user when the cookie expire and user will get logged out to a specific path
export const useRedirectLoggedOutUser = (path) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if (!isLoggedIn) {
                toast.info("session expired, please login to continue")
                navigate(path)
                return
            }
        }
        redirectLoggedOutUser()
    }, [path, dispatch, navigate]);
}

