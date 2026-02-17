import React from 'react'
import TaskCard from './TaskCard'
import { Droppable } from '@hello-pangea/dnd'

// status prop to this component from the Board so the library knows 
// the exact ID of the drop zone (ex "todo", "doing")
const TaskColomn = ({ title, tasks, openModalToEdit, status }) => {
  return (
    <div className="bg-gray-50 min-h-75 rounded-xl p-4 shadow-inner">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
        {title}
      </h2>

      {/* Wrap All the Colomns into Droppable compo that allow them to be a Drop Zone */}
      <Droppable droppableId={status} >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 space-y-4 h-full">
            {
              tasks.length === 0 ? (
                <p className="text-sm text-gray-400 h-full flex justify-center items-center">
                  No tasks here
                </p>
              ) : (
                tasks.map((task, index) =>
                  <TaskCard index={index} key={task.id} task={task} openModalToEdit={openModalToEdit} />
                )
              )
            }
            {/*This creates empty space when dragging a card over the list */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskColomn