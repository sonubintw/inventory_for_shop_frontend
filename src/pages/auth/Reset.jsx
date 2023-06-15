import React from 'react'
import styles from "./auth.module.scss"
import {MdPassword} from "react-icons/md"
import Card from '../../components/card/Card'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/authService'

const Reset = () => {

  

  const [formData,setFormdata]=useState({
    password:"",
    password2:""
  })
  const {password,password2}=formData;
  const  {resetToken}=useParams()



  const handleOnChange=(event)=>{
    const {name,value}=event.target;
    // console.log(event)
    setFormdata({
      ...formData,
      [name]:value
    })
  }


  const resetPass=async(event)=>{
    event.preventDefault()
    // console.log(resetToken)
    // console.log(formData);
    if(password.length<6){
      return toast.error("Password length must be atleast 6")
    }

    if(!password || !password2){
      return toast.error("Please enter all the fields")
    }

    if(password !== password2){
      return toast.error("Password do not match")
    }

    const userData={password,password2}

    try {
       await resetPassword(userData,resetToken)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={`constainer ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color='#999'/>
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={resetPass}>
            <input type="password" placeholder='New Password'  name='password' value={password} onChange={handleOnChange} />
            <input type="password" placeholder='Confirm New Password'  name='password2' value={password2} onChange={handleOnChange} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
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

export default Reset