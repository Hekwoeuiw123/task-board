import React, { useMemo, useState } from 'react'
import TaskColumn from '../components/board/TaskColomn'
import Modal from '../components/board/Modal'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/board/Navbar'
import TaskForm from '../components/board/TaskForm'
import { DragDropContext } from '@hello-pangea/dnd'
import { updateTaskStatus } from '../features/tasks/taskSlice'
import { addLogs } from '../features/activity/activitySlice'
const Board = () => {

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.items)

  const [isModelOpen, setIsModelOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("asc");

  // Return Filtered Task that will Display
  const processedTask = useMemo(() => {
    let filterTask = [...tasks]

    // Search by title
    if (searchTerm.trim() !== "") {
      filterTask = filterTask.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by priority
    if (priorityFilter !== 'All') {
      filterTask = filterTask.filter(task => task.priority === priorityFilter)
    }

    // Sort by due date
    filterTask.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      return sortOrder === 'asc' ?
        new Date(a.dueDate) - new Date(b.dueDate) :
        new Date(b.dueDate) - new Date(a.dueDate)
    })

    return filterTask
  }, [tasks, searchTerm, priorityFilter, sortOrder])

  // For Rendering Tasks Based on Status
  const getTaskByStatus = (status) => {
    return processedTask.filter((task) => task.status === status);
  }

  // For Modals 
  const openModalToAdd = () => {
    setTaskToEdit(null)
    setIsModelOpen(true)
  }

  const openModalToEdit = (task) => {
    setTaskToEdit(task)
    setIsModelOpen(true)
  }

  // Function that runs when you let go of a dragged card
  const onDragEnd = (result) => {

    const {source , destination , draggableId} = result

    // if u drop it in invalid zone 
    if(!destination) return

    // if drop on same position
    if(source.droppableId === destination.droppableId) return

    dispatch(updateTaskStatus({id : draggableId , newStatus: destination.droppableId}))

    const movedTask = tasks.find(task => task.id === draggableId)
    dispatch(addLogs(`Task '${movedTask?.title}' moved to ${destination.droppableId}`))

  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />

      <div className="p-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-baseline flex-wrap gap-3">

          <h2 className='flex'>
            Filter By :
          </h2>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title..."
            className="border px-3 py-2 rounded-lg hover:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Priority Filter */}
          <select
            className="border px-3 py-2 rounded-lg hover:border-blue-500"
            onChange={(e) => setPriorityFilter(e.target.value)}
            value={priorityFilter}
            name="priorityFilter"
          >
            <option value="All">All Priorities</option>
            <option >Low</option>
            <option >Medium</option>
            <option >High</option>
          </select>

          {/* Sort */}
          <select
            className="border px-3 py-2 rounded-lg hover:border-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Due Date ↑</option>
            <option value="desc">Due Date ↓</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openModalToAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>
      </div>
      
      {/* <DragDropContext> as the radar system for our Board , it can watch everything */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn status="todo" tasks={getTaskByStatus('todo')} title="Todo" openModalToEdit={openModalToEdit} />
          <TaskColumn status="doing" tasks={getTaskByStatus("doing")} title="Doing" openModalToEdit={openModalToEdit} />
          <TaskColumn status="done" tasks={getTaskByStatus("done")} title="Done" openModalToEdit={openModalToEdit} />
        </div>
      </DragDropContext>

      {/* Modal */}
      {
        isModelOpen && <Modal onClose={() => setIsModelOpen(false)}>
          <TaskForm existingTask={taskToEdit} onClose={() => setIsModelOpen(false)} />
        </Modal>
      }
    </div>
  )
}

export default Board
