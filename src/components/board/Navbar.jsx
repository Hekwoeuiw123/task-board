import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../features/auth/authSlice'
import { clearAuthStorage } from '../../features/auth/authUtils'
import { resetBoard } from '../../features/tasks/taskSlice'
import { addLogs, clearLogs } from '../../features/activity/activitySlice'
import ActivityLog from '../ActivityLog'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isActivityOpen, setIsActivityOpen] = useState(false)

    const user = useSelector(state => state.auth.user.email)

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to Logout?")) {
            dispatch(logOut())
            clearAuthStorage()
            dispatch(clearLogs())
            navigate('/login')
        }
    }

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the board?")) {
            dispatch(resetBoard())
            dispatch(addLogs(`Board Updated`))
        }
    }

    return (
        <>
            <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    Task Board
                </h1>

                <div className="flex items-center gap-6">
                    <span className="text-gray-600 text-sm">
                        {user}
                    </span>

                    <button
                        onClick={() => setIsActivityOpen(true)}
                        className="text-sm cursor-pointer bg-blue-100 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-200 transition font-medium"
                    >
                        Activity Log
                    </button>

                    <button
                        onClick={handleReset}
                        className="text-sm cursor-pointer bg-yellow-500 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {/* ActivityLog */}
            <ActivityLog isOpen={isActivityOpen} onClose={() => setIsActivityOpen(false)}/>
        </>
    )
}

export default Navbar