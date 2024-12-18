import React from 'react'
import { useSelector } from 'react-redux'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { Navigate, useNavigate } from 'react-router-dom';


const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();

  const handleSignOUt = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error")
      console.log(error)
    });
    
  }

  return (
    <div className='flex justify-between  w-[90vw] absolute z-10' >
        <div className='m-4 w-36 bg-gradient-to-b from-black'>
          <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Netflix" />
        </div>
        <div className='m-4' >
        { user &&    <button className=' text-white bg-red-600 shadow-lg rounded-md p-1 m-2' onClick={handleSignOUt}>
              sign out
            </button>}
        </div>
    </div>

  )
}

export default Header