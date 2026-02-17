import React, { use, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, editTask } from '../../features/tasks/taskSlice'
import { addLogs } from '../../features/activity/activitySlice'

const TaskForm = ({ existingTask, onClose }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [tags, setTags] = useState('')
  const [priority, setPriority] = useState("Low")

  const dispatch = useDispatch()

  // prefill the Task if we edit the same
  useEffect(() => {
    if (existingTask) {
      setDescription(existingTask.description || "")
      setPriority(existingTask.priority)
      setTags(existingTask.tags?.join(',') || "")
      setTitle(existingTask.title)
      setDueDate(existingTask.dueDate || "")
    } else {
      setDescription("")
      setTitle("")
      setPriority("Low");
      setDueDate("")
      setTags("")
    }
  }, [existingTask])


  const handleSubmit = (e) => {
    e.preventDefault()

    // Storing Comma Seperated Tags into Array Format
    const formattedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")

    // if existing is present then edit that else create new 
    if (existingTask) {
      dispatch(
        editTask({
          id: existingTask.id, updatedData: {
            title,
            description,
            priority,
            dueDate,
            tags: formattedTags
          }
        })
      )
      dispatch(addLogs(`Task '${title}' updated`))
    }else{
      dispatch(
        addTask({
          title,
          description,
          priority,
          dueDate,
          tags: formattedTags,
          status: "Todo"
        })
      )
      dispatch(addLogs(`Task '${title}' created`));
    }
    onClose()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        {existingTask ? "Update Task" : "Create Task"}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Title*
          </label>
          <input type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Enter Title'
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={description}
            placeholder='Enter Description ....'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* PRIORITY */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Priority
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* DUE DATE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Due Date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="frontend, urgent, client"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {existingTask ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form >
    </div >

  )
}

export default TaskForm