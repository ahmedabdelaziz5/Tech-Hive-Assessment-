import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    token: localStorage.getItem("token"),
    userData: JSON.parse(localStorage.getItem("userData")),
    isLoggedIn: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action)
        {
            state.token = action.payload.token;
            state.userData = action.payload.userData ;
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("userData", JSON.stringify(action.payload.userData))
        },
        logout(state)
        {
            state.token = null;
            state.userData = null;
            state.isLoggedIn = false;
            localStorage.clear()
        },
        updateUserData(state, action)
        {
            let tempUserData = {
                ...state.userData,
                ...action.payload,
            }
            state.userData = tempUserData
            localStorage.setItem("userData", JSON.stringify(tempUserData))
        },
    }
})


export const authActions = authSlice.actions

export default authSlice.reducer;