import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearLogs } from '../features/activity/activitySlice'

const ActivityLog = ({ isOpen, onClose }) => {
  const logs = useSelector(state => state.activity.logs)
  const dispatch = useDispatch()

  // Function Return HH : MM - DATE
  const formatTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString();
  }

  return (
    <>
      {/* Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Slide-over Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Activity Log</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black font-bold">
              ✕
            </button>
          </div>

          {/* Log List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center mt-10">No activity yet.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="relative pl-4 border-l-2 border-blue-200">
                  <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-1.25 top-1.5"></div>
                  <p className="text-sm text-gray-800 font-medium">{log.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(log.timestamp)}</p>
                </div>
              ))
            )}
          </div>

          {/* Footer / Clear Button */}
          {logs.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => dispatch(clearLogs())}
                className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition border border-red-200"
              >
                Clear History
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ActivityLog