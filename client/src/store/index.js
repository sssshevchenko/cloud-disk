import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filesSlice from './reducers/filesSlice';
import uploaderSlice from './reducers/uploaderSlice';
import userSlice from './reducers/userSlice';
 
const rootReducer = combineReducers({
    user: userSlice,
    files: filesSlice,
    uploader: uploaderSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}