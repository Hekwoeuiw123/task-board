import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if(!isAuthenticated) return <Navigate to='/' replace></Navigate>
  
  return (
    <Outlet/>
  )
}

export default PrivateRoute