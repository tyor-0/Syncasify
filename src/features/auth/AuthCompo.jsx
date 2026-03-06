import React from 'react'
import { Outlet } from 'react-router-dom'
// import { useGetCurrentUser } from '../dashboard/useGetCurrentUser'

const AuthCompo = () => {
    // const user = useGetCurrentUser()


  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthCompo
