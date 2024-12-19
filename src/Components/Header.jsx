import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL } from '../utils/constants';
import { PermIdentity } from '@mui/icons-material';


const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse")
        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });

    return () => unsubscribe()

  }
    , [])

  const handleSignOUt = () => {
    signOut(auth).then(() => {
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      navigate("/error")
      console.log(error)
    });

  }


  return (
    <div className='flex justify-between  w-[90vw] absolute z-50' >
      <div className='m-4 w-36 bg-gradient-to-b from-black'>
        <img src={LOGO_URL} alt="Netflix" />
      </div>
      <div className='m-4' >
        {user && <div className=' bg-red-600 shadow-lg rounded-md p-2 m-2 '>
          <PermIdentity className='text-white border-2  mx-2 h-32 rounded-[50%]' />
          <button className='ml-2 text-white  hover:border-white hover:shadow-lg'  onClick={handleSignOUt}>
            sign out
          </button>
        </div>}
      </div>
    </div>

  )
}

export default Header