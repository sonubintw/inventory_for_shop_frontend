import React, { useState } from 'react'
import styles from "./auth.module.scss"
import {GrMail} from "react-icons/gr"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgotPassword, validateEmail } from '../../services/authService'

const Forgot = () => {

  const [email,setEmail] = useState("")

  const handleInputChange=(event)=>{
    const {value}=event.target
    setEmail(value)
  }
  

  const forgot=async(event)=>{
    event.preventDefault()
    if(!email){
      return toast.error("Please enter an email")
    }

    if(!validateEmail(email)){
      return toast.error("Please enter a valid email")
    }


    const userData={
      email
    };//because we need object 
   
      try {
        await forgotPassword(userData)
        setEmail("")
        
      } catch (error) {
        console.log(error);
      }
   

  }


  return (
    <div className={`constainer ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <GrMail size={35} color='#999'/>
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input type="email" placeholder='Email'  name='email' value={email} onChange={handleInputChange}/>
            <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
          </form>

        </div>
      </Card>
    </div>
  )
}

export default Forgot