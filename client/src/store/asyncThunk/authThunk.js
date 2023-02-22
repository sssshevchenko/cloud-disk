import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import { CHECK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        const response = await $api.post(`/auth${LOGIN_ROUTE}`, {email, password})
        localStorage.setItem('token', response.data.token)
        return response.data
    }
)
export const registration = createAsyncThunk(
    'auth/registration',
    async ({email, password}, thunkApi) => {
        const response = await $api.post(`/auth${REGISTRATION_ROUTE}`, {email, password})
        localStorage.setItem('token', response.data.token)
        return response.data
    }
)
export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_, thunkApi) => {
        const response = await $api.get(`/auth${CHECK_ROUTE}`)
        localStorage.setItem('token', response.data.token)
        return response.data
    }
)

export const uploadAvatar = createAsyncThunk(
    'avatar/upload',
    async (file, thunkApi) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await $api.post('/files/avatar', formData)
        return response.data
    }
)

export const removeAvatar = createAsyncThunk(
    'avatar/remove',
    async (_, thunkApi) => {
        const response = await $api.delete('/files/avatar')
        return response.data
    }
)