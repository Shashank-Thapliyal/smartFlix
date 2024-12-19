import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
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


  return (
   <>
      <RouterProvider router={appRouter} />
   </>
  )
}

export default Body