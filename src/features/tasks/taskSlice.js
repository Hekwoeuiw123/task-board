import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: []
    },
    reducers: {
        addTask: (state, action) => {
            state.items.push({
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                status: 'todo'
            })
        },

        editTask : (state , action) => {
            const { id, updatedData } = action.payload
            const item = state.items.find(item => item.id === id)

            if(item){
                Object.assign(item , updatedData) // just merging our updated values
            }
        },

        updateTaskStatus: (state, action) => {
            const { id, newStatus } = action.payload
            const item = state.items.find(item => item.id === id)

            if(item) {
                item.status = newStatus  // setting new state after drag and drop
            }
        },

        deleteTask : (state , action) => {
            const {id} = action.payload
            state.items = state.items.filter(item => item.id !== id)
        },

        resetBoard : (state) => {
            state.items = []
        }
    }
})

export const {addTask , resetBoard , deleteTask , updateTaskStatus , editTask} = taskSlice.actions 
export default taskSlice.reducer