import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
    isPopMenuOpened: {},
    isModalOpened: {},
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        openPopMenu(state, action)
        {
            state.isPopMenuOpened[action.payload] = true;
        },
        closePopMenu(state, action)
        {
            state.isPopMenuOpened[action.payload] = false;
        },
        openModal(state, action)
        {
            state.isModalOpened[action.payload] = true;
        },
        closeModal(state, action)
        {
            state.isModalOpened[action.payload] = false;
        },
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer;