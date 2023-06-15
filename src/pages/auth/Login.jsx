import React,{useState} from 'react'
import styles from "./auth.module.scss"
import {BiLogIn} from "react-icons/bi"
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME} from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const Login = () => {

  const [isLoading,setisLoading]=useState(false);
  const [formData,setFormdata]=useState({
    email:"",
    password:""
  })
  const {email,password}=formData
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleInputChange=(event)=>{
    const {name,value}=event.target
    setFormdata({
      ...formData,
      [name]:value //Computed property names
    })
  }
  const login= async (event)=>{
    event.preventDefault()
    
    if(!email || !password){
      return toast.error("All fields are required")
    }
    if(!validateEmail){
      return toast.error("Please enter a valid email")
    }

    // console.log(formData);
    const userData={
      email,
      password
    }
    setisLoading(true)

  try {
      const response =await loginUser(userData)
      // console.log(response);
      await dispatch(SET_LOGIN(true))  //await is not necessary
      await dispatch(SET_NAME(response.name))
      navigate("/dashboard")
      setisLoading(false)  
      
    
  } catch (error) {
      setisLoading(false)
      // console.log(error);
    }

    


  }


  return (
    <div className={`constainer ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color='#999'/>
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input type="email"  placeholder='Email'  name='email' value={email} onChange={handleInputChange} />
            <input type="password" placeholder='Password' name='password' value={password} onChange={handleInputChange} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

        <span className={styles.register}>
          <Link to="/">Home</Link>
          <p>&nbsp;Don't have an account? &nbsp;</p>
          <Link to="/register">Register</Link>
        </span>
        </div>
      </Card>
    </div>
  )
}

export default Login