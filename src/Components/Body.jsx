import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Browse from './Browse'
import Login from './Login'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch(); //redux store dispatch action
  
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Login />
    },
    {
      path : "/browse",
      element : <Browse/>
    }
  ])

  useEffect( ()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName} = user;
        dispatch(addUser({uid, email, displayName}));
      

        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        }
    });
    
  }
    ,[])
  return (
   <>
      <RouterProvider router={appRouter} />
   </>
  )
}

export default Body