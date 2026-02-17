import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
    name : 'activity' , 
    initialState : {
        logs : []
    },
    reducers : {
        addLogs : (state , action) => {
            // action.payload should be a string like "Task 'Fix Bug' moved to Done"
            state.logs.unshift({
                id : Date.now().toString(),
                message : action.payload,
                timestamp : new Date().toISOString()
            })
            // Keep only 20 in logs 
            if (state.logs.length > 20) state.logs.pop()
        },
        clearLogs : (state) => {
            state.logs = []
        }
    }
})

export const { addLogs, clearLogs } = activitySlice.actions;
export default activitySlice.reducer;