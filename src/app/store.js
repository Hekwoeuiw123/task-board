import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import activityReducer from '../features/activity/activitySlice'
import taskReducer from '../features/tasks/taskSlice'

//Helper to load state safely
const loadState = (key) => {
    try {
        const serializedData = localStorage.getItem(key)
        if (serializedData === null) return undefined
        return JSON.parse(serializedData)
    } catch (error) {
        return undefined
    }
}

const store = configureStore({
    reducer: {
        'auth': authReducer,
        'activity': activityReducer,
        'tasks': taskReducer
    },
    preloadedState: {
        tasks: { items: loadState('tasks') || [] },
        activity: { logs: loadState('activityLog') || [] }
    }
})

// So basiccally it will Auto-Save to localStorage whenever state changes
store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem('tasks', JSON.stringify(state.tasks.items))
    localStorage.setItem('activityLog', JSON.stringify(state.activity.logs))
})

export default store  