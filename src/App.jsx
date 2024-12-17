import React from 'react'
import Body from './Components/Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from './Components/Browse'

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Body />
    },
    {
      path : "/browse",
      element : <Browse/>
    }
  ])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App