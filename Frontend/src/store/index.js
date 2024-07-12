
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import tasksReducer from './tasks-slice';
import uiReducer from './ui-slice';
import searchReducer from './search-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        ui: uiReducer,
                search: searchReducer,
    }
});

export default store;