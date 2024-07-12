import {  createSlice } from '@reduxjs/toolkit';

import { mergeToUnique } from '../helpers/mergeToUnique';
import { taskInitialValues } from '../pages/User/Tasks/Tasks/taskData/taskInputs';


const initialTasksState = {
    tasks: {
        "all": [],
        "toDo": [],
        "inProgress": [],
        "done": [],
    },
    totalPages: {
        "all": 1,
        "toDo": 1,
        "inProgress": 1,
        "done": 1,
    },
    totalLength: {
        "all": 0,
        "toDo": 0,
        "inProgress": 0,
        "done": 0,
    },
    openedTask: localStorage.getItem("openedTask") ?
        JSON.parse(localStorage.getItem("openedTask")) : taskInitialValues
}



const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        addTask(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.tasks[isForCalender ? "all" : action.payload.taskStatus].unshift(action.payload)
            state.totalLength[isForCalender ? "all" : action.payload.taskStatus] += 1;
        },
        mergeTasks(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.tasks[isForCalender ? "all" : action.payload.taskStatus] = mergeToUnique(state.tasks[isForCalender ? "all" : action.payload.taskStatus], action.payload.tasks);
        },
        setTasks(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.tasks[isForCalender ? "all" : action.payload.taskStatus] = action.payload.tasks;
        },
        removeTask(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.tasks[isForCalender ? "all" : action.payload.taskStatus] =
                state.tasks[isForCalender ? "all" : action.payload.taskStatus].filter(ele => ele._id !== action.payload._id)

            state.totalLength[isForCalender ? "all" : action.payload.taskStatus] -= 1;
        },
        removeAllTasksType(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            console.log("action.payload", action.payload)
            state.tasks[isForCalender ? "all" : action.payload] = []
            state.totalLength[isForCalender ? "all" : action.payload] = 0;
        },
        updateTask(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.tasks[isForCalender ? "all" : action.payload.taskStatus] = state.tasks[isForCalender ? "all" : action.payload.taskStatus].map(ele =>
            {
                if (ele._id === action.payload._id)
                {
                    return { ...ele, ...action.payload }
                }
                else return ele;
            })
        },
        updateTotalPages(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            // to update TotalPages when receive it from server
            state.totalPages[isForCalender ? "all" : action.payload.taskStatus] = action.payload.totalPages;
        },
        updateTotalLength(state, action)
        {
            const isForCalender = window.location.pathname.includes("calender");
            state.totalLength[isForCalender ? "all" : action.payload.taskStatus] = action.payload.totalLength;
        },
        updateOpenedTask(state, action)
        {
            state.openedTask = action.payload;
            localStorage.setItem("openedTask", JSON.stringify(action.payload))
        },
    },
})

export const tasksActions = tasksSlice.actions

export default tasksSlice.reducer;