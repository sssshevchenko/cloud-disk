import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";
import { addUploadFile, changeUploadFile, setIsVisible } from "../reducers/uploaderSlice";

export const createNewDir = createAsyncThunk(
    'files/createNewDir',
    async ({dirId, name}, thunkApi) => {
        const response = await $api.post('/files', {
            name,
            parent: dirId,
            type: 'dir'
        })
        return response.data
    }
)

export const fetchFiles = createAsyncThunk(
    'files/fetchFiles',
    async ({dirId, sort}, thunkApi) => {
        let url = '/files'

        if(dirId) {
            url = `/files?parent=${dirId}`
        } else if(sort) {
            url = `/files?sort=${sort}`
        } else if(sort && dirId) {
            url = `/files?parent=${dirId}&&sort=${sort}`
        }

        const response = await $api.get(url)
        return response.data
    }
)

export const uploadFile = createAsyncThunk(
    'files/uploadFiles',
    async ({file, dirId}, thunkApi) => {
        const formData = new FormData()
        formData.append('file', file)

        if(dirId) {
            formData.append('parent', dirId)
        }

        const uploadFiles = {name: file.name, progress: 0, id: file.size}
        thunkApi.dispatch(setIsVisible(true))
        thunkApi.dispatch(addUploadFile(uploadFiles))

        const response = await $api.post('/files/upload', formData, {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                if (total) {
                    uploadFiles.progress = Math.floor((loaded * 100) / total);
                    thunkApi.dispatch(changeUploadFile(uploadFiles))
                }
            }
        })
        return response.data
    }
)

export const downloadFile = createAsyncThunk(
    'file/download', 
    async (file, thunkApi) => {
        const response = await fetch('/files/download?id=' + file._id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200) {
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = downloadUrl
            link.download = file.name

            document.body.appendChild(link)
            link.click()
            link.remove()
        } 
    }
)

export const deleteFile = createAsyncThunk(
    'files/delete',
    async (file, thunkApi) => {
        await $api.delete('/files?id=' + file._id)

        return file._id
    }
)

export const searchFiles = createAsyncThunk(
    'files/search',
    async (search, thunkApi) => {
        const response = await $api.get('/files/search?search=' + search)

        return response.data
    }
)