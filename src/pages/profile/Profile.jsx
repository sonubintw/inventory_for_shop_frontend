import React from 'react'
import "./Profile.scss"
import { useRedirectLoggedOutUser } from '../../customHook/useRedirectLoggedOutUser'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../services/authService'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'


const Profile = () => {
    useRedirectLoggedOutUser("/login")

    const dispatch = useDispatch()

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
       
        setIsLoading(true)
        async function getUserData(){
            const data = await getUser()
            // console.log(data);
            setProfile(data)
            setIsLoading(false)
            dispatch(SET_USER(data))
            dispatch(SET_NAME(data.name))
        }
        getUserData()
    }, [dispatch]);
    

  return (
    <div className='profile --my2'>
        {isLoading && <SpinnerImg/>}
        <div>
            {!isLoading && profile===null ? (
                <p>Something went wrong, pls reload </p>
            ):(
                <Card cardClass="card --flex-dir-column">
                    <span className='profile-photo'>
                        <img src={profile?.image} alt="profilepic" />
                    </span>
                    <span className='profile-data'>
                        <p>
                            <b>Name : </b>{profile?.name}
                        </p>
                        <p>
                            <b>Email : </b>{profile?.email}
                        </p>
                        <p>
                            <b>Phone : </b>{profile?.phoneNo}
                        </p>
                        <p>
                            <b>Bio: </b>{profile?.bio}
                        </p>
                        
                            <span>
                                <button className='--btn --btn-primary'>
                                <Link to="/edit-profile" className='--p'>Edit Profile</Link>
                                </button>
                            </span>
                            
                       
                    </span>
                </Card>
            )}
        </div>
    </div>
  )
}

export default Profile