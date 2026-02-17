import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTaskStatus } from '../../features/tasks/taskSlice'
import { addLogs } from '../../features/activity/activitySlice'
import { Draggable } from '@hello-pangea/dnd'

const TaskCard = ({ task, openModalToEdit, index }) => {

  const priorityColor = {
    "High": 'bg-red-100 text-red-600',
    "Medium": 'bg-yellow-100 text-yellow-600',
    "Low": 'bg-green-100 text-green-600'
  }

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id }))
    dispatch(addLogs(`Task '${task.title}' deleted`))
  }

  return (

    // Wrap All the cards into Draggable compo that allow them to be dragged
    <Draggable draggableId={task.id} index={index} >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-3 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 text-lg">
              {task.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-gray-500">
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <p className="text-xs text-gray-400">
              Due: {task.dueDate}
            </p>
          )}

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {
              task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))
            }
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-3">
              <button
                onClick={() => openModalToEdit(task)}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>)}
    </Draggable>
  )
}

export default TaskCard