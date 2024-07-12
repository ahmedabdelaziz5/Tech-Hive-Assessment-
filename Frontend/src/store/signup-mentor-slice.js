import { createSlice } from '@reduxjs/toolkit';
import { signUpInitialValues } from '../pages/Guest/SignUp/signUpInputsData';

const initialMentorState = {
    userData: !!localStorage.getItem("mentorUserData") ? JSON.parse(localStorage.getItem("mentorUserData")) : signUpInitialValues,
    lastSignupStep: localStorage.getItem("lastSignupStep") ?
        Number(JSON.parse(localStorage.getItem("lastSignupStep"))) :
        -1,
}

const signupMentorSlice = createSlice({
    name: 'signupMentor',
    initialState: initialMentorState,
    reducers: {
        updateData(state, action)
        {
            state.userData = action.payload.userData;
            state.lastSignupStep = action.payload.lastSignupStep;

            localStorage.setItem("mentorUserData", JSON.stringify(state.userData))
            localStorage.setItem("lastSignupStep", JSON.stringify(state.lastSignupStep))
        },
    }
})


export const signupMentorActions = signupMentorSlice.actions

export default signupMentorSlice.reducer;