import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
    userData: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearchState,
    reducers: {
        setUserData(state, action)
        {
            state.userData = action.payload ;
        },
        updateUserData(state, action)
        {
            state.userData = { ...state.userData, ...action.payload };
        },
    }
})

export const searchActions = searchSlice.actions

export default searchSlice.reducer;