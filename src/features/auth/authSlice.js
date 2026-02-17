import { createSlice } from "@reduxjs/toolkit";
import { loadAuthFromStorage } from "./authUtils";

// check at Time of app load is user already there in localstorage if there then take data from it and login
const authUser = loadAuthFromStorage()
const parsedUser = authUser ? JSON.parse(authUser) : null;

const initialState = {
    user : parsedUser ,
    isAuthenticated : !!authUser, // if userAuth have user => true else => false
    rememberMe : false
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        loginSuccess : (state , action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.rememberMe = action.payload.rememberMe
        },
        logOut : (state) => {
            state.user = null
            state.isAuthenticated = false
            state.rememberMe = false
        }
    }
})

export const {loginSuccess , logOut} = authSlice.actions
export default authSlice.reducer