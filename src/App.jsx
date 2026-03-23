import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { route } from './route'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={route()} />
    </>
  )
}

export default App