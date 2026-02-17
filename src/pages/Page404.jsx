import React from 'react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
    const navigate = useNavigate()
  return (
     <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-gray-600">Page not found</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go Home
            </button>
          </div>
  )
}

export default Page404