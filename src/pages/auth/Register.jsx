import React,{useState} from 'react'
import styles from "./auth.module.scss"//import the auth.module.css
import {TiUserAddOutline} from "react-icons/ti"
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import {useDispatch} from "react-redux"
import {SET_LOGIN, SET_NAME}from "../../redux/features/auth/authSlice"
import Loader from '../../components/loader/Loader'

const initialState={
  name:"",
  email:"",
  password:"", 
  password2:""
}


const Register =() => {


  const dispatch=useDispatch()//to dispatch action from redux
  const navigate=useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const {name,email,password,password2}=formData// data from inputFields

  //to handle Data inside input field
  const handleInputChange=(event)=>{
    // console.log(event.target);
    const {name,value}=event.target; //to get the name and value of each inputField

    setformData({
      ...formData,
      [name]:value //Computed property names
    })
  }

  const register= async (event)=>{

    event.preventDefault()

    if(!email || !name || !password || !password2){
      return toast.error("All fields are required")
    }
    //this validateEmail if from authServices 
    if(!validateEmail(email)){
      return toast.error("Please enter a valid email")
    }
    


    if(password.length < 6){
      return toast.error("Password must be up to 6 char")
    }

    if(password !== password2){
      return toast.error("Password do not match")
    }
   
    const userData={
      name,
      email,
      password
    }
    // console.log(userData)

    setisLoading(true)
    try{
      const data=await registerUser(userData)
      // console.log(data.name);
      dispatch(SET_LOGIN(true))//sending payload to authSlice which handles the global state
      dispatch(SET_NAME(data.name))//sending payload to authSlice which handles the global state
      navigate("/dashboard")//as soon as we successfully create an account or get registered we will be sent to the dashboard
      setisLoading(false)
    }catch(error){
      setisLoading(false)
    }

  }

  return (
    <div className={`constainer ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color='#999'/>
          </div>
          <h2>Register</h2>

          <form onSubmit={register}>
            <input type="text" placeholder='Name'  name='name' value={name} onChange={handleInputChange}/>
            <input type="email" placeholder='Email' name='email'  value={email} onChange={handleInputChange}/>
            <input type="password" placeholder='Password' name='password' value={password} onChange={handleInputChange}/>
            <input type="password" placeholder='Confirm Passowrd' name='password2' value={password2} onChange={handleInputChange}/>
            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
          </form>

        <span className={styles.register}>
          <Link to="/" style={{backgroundColor:"black",color:"white",padding:"5px"}}>Home</Link>
          <p>&nbsp;Already an account? &nbsp;</p>
          <Link to="/login" style={{backgroundColor:"black",color:"white",padding:"5px"}}>Login</Link>
        </span>
        </div>
      </Card>
    </div>
  )
}

export default Register