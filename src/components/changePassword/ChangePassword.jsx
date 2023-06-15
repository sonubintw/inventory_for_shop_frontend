import React from 'react'
import "./changepassword.scss"
import { useState } from 'react'
import { toast } from 'react-toastify'
import { changeUserPassword } from '../../services/authService'
import Card from '../card/Card'

const ChangePassword = () => {
    const [formData, setFormdata] = useState({
        oldPassword:"",
        newPassword:"",
        password2:"",
    })
    const {newPassword,oldPassword,password2}=formData;

    const handleInputChange=(event)=>{
        const {name,value}=event.target;
        setFormdata({
            ...formData,[name]:value
        })
    }

    const changePassword = async(event)=>{
        event.preventDefault();
        if(newPassword !== password2){
            return toast.error("new Password do not match")
        }
        const formData={oldPassword,newPassword};
        const resp=await changeUserPassword(formData)
        toast.success(resp)
    }

  return (
    <div className='change-password'>
        <Card cardClass={'password-card'}>
            <h3>Change Password</h3>
            <form onSubmit={changePassword} className='--form-control'>
                <input type="password" placeholder='Old Password' name='oldPassword' value={oldPassword} onChange={handleInputChange}/>
                <input type="password" placeholder=' new Password' name='newPassword' value={newPassword} onChange={handleInputChange}/>
                <input type="password" placeholder=' confirm new Password' name='password2' value={password2} onChange={handleInputChange}/>
            <button type='submit' className='--btn --btn-primary'>Change Password</button>
            </form>
        </Card>
    </div>
  )
}

export default ChangePassword