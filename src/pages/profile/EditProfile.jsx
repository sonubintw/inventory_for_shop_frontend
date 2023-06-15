import React from 'react'
import "./Profile.scss"
import { useState,useEffect } from 'react';
import { useRedirectLoggedOutUser } from '../../customHook/useRedirectLoggedOutUser';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/authService';
import ChangePassword from '../../components/changePassword/ChangePassword';




const EditProfile = () => {
    useRedirectLoggedOutUser("/login")
    const [isLoading, setIsLoading] = useState(false)
    const navigate= useNavigate()
    const user=useSelector(selectUser)
    const {email}=user

    //onreload the data of user will be gone so redirect the page to /profile
    useEffect(()=>{
        if(!email){
            navigate("/profile")
        }
    },[email,navigate])

    const [profile, setProfile] = useState({
        //getting the data from user which we received from redux wiz selectUser
        name:user?.name,
        email:user?.email,
        phoneNo:user?.phoneNo,
        bio:user?.bio,
        image:user?.image,
    })
     const [profileImage, setProfileImage] = useState("")

    const handleInputChange=(event)=>{
        const {name,value}=event.target
        setProfile({
          ...profile,
          [name]:value //Computed property names
        })
      }

    const handleImageChange=(event)=>{
        setProfileImage(event.target.files[0])
    }

    const saveProfile= async(event)=>{
        event.preventDefault()
        setIsLoading(true)
        try {
            //handleImage upload to cloudinary
            let imageURL;
            if(profileImage && (profileImage.type==="image/jpeg" || profileImage.type==="image/jpg" || profileImage.type==="image/png")){
                const image= new FormData()
                //saving data in cloudinary from frontend check documention of it
                image.append("file",profileImage)
                image.append("cloud_name","dgf99iesa")//dgf99iesa
                image.append("upload_preset","litsgvtd")//litsgvtd
                
                
            
                //first save image to cloudinary
                //why not axios here coz axios sent may request header like content-type and many more search it on google and due to which the server of cloudinary rejects the request and fetch has minimal headers attached to the requset like
                //Accept: "*" and host:api.cloudinary.com by default
                const resp= await fetch("https://api.cloudinary.com/v1_1/dgf99iesa/image/upload",
                {
                    method:"post",
                    body:image,
                })
                const imgData= await resp.json()
                imageURL=imgData.url.toString()
 
            }
    
                setIsLoading(false)

                // save Profile
                const formData={
                    name:profile.name,
                    phoneNo:profile.phoneNo,
                    bio:profile.bio,
                    image:profileImage ? imageURL : profile.image,
                }
                await updateUser(formData)
                
                toast.success("user updated")
                navigate("/profile")
            
            
        } catch (error) {
            // console.log(error);
            setIsLoading(false)
            toast.error(error.message)
        }
    }

  return (
    <div className='profile --my2'>
        {isLoading && <Loader/>}

        <Card cardClass="card --flex-dir-column">
                    <span className='profile-photo'>
                        <img src={user?.image} alt="profilepic" />
                    </span>
                    <form className='--form-control --m' onSubmit={saveProfile}>
                    <span className='profile-data'>
                        <p>
                            <label>Name:</label>
                            <input type="text" name="name" value={profile?.name} onChange={handleInputChange}/>
                        </p>

                        <p>
                        <label>Email:</label>
                            <input type="text" name="email" value={profile?.email} disabled/>
                            <code>Email cannot be changed</code>
                        </p>

                        <p>
                        <label>PhoneNo:</label>
                            <input type="text" name="phoneNo" value={profile?.phoneNo} onChange={handleInputChange}/>
                        </p>

                        <p>
                        <label>Bio:</label>
                            <textarea  name="bio" value={profile?.bio} onChange={handleInputChange} cols="30" rows="10"></textarea>
                        </p>

                        <p>
                        <label>Image:</label>
                            <input type="file" name="image"  onChange={handleImageChange} accept='image/*'/>
                        </p>
                        
                        
                            <span>
                                <button className='--btn --btn-primary'>
                                    Save Changes
                                </button>
                            </span>
                            
                       
                    </span>
                  </form>
                </Card>
                <br />
                <ChangePassword/>
    </div>
  )
}

export default EditProfile