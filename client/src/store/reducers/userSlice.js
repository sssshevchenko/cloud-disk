import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, registration, removeAvatar, uploadAvatar } from "../asyncThunk/authThunk";

const initialState = {
    user: {},
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        }
    },
    extraReducers: (builder) => 
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(removeAvatar.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuth = true
            })
})

export default userSlice.reducer;
export const {setIsAuth, setUser} = userSlice.actions;