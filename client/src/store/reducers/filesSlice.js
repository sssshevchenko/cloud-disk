import { createSlice } from "@reduxjs/toolkit"
import { createNewDir, deleteFile, fetchFiles, searchFiles, uploadFile } from "../asyncThunk/filesThunk"

const initialState = {
    files: [],
    currentDir: null,
    popUpDisplay: 'none',
    dirStack: [],
    dirFromStack: null,
    view: 'list'
}

const filesSlice = createSlice({
    name: 'filesSlice',
    initialState,
    reducers: {
        setCurrentDir(state, action) {
            state.currentDir = action.payload
        },
        setPopUpDiplay(state, action) {
            state.popUpDisplay = action.payload
        },
        pushToDirStack(state, action) {
            state.dirStack = [...state.dirStack, action.payload]
        },
        popFromDirStack(state) {
            state.dirFromStack = state.dirStack.pop()
        },
        setView(state, action) {
            state.view = action.payload
        }
    },
    extraReducers: (builer) => 
        builer
            .addCase(createNewDir.fulfilled, (state, action) => {
                state.files = [...state.files, action.payload]
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.files = action.payload
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.files = [...state.files, action.payload]
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.files = [...state.files.filter(file => file._id !== action.payload)]
            })
            .addCase(searchFiles.fulfilled, (state, action) => {
                state.files = action.payload
            })
})

export default filesSlice.reducer
export const {
    setCurrentDir, 
    setFiles, 
    setPopUpDiplay, 
    pushToDirStack, 
    popFromDirStack, 
    setView
} = filesSlice.actions