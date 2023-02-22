import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: [],
    isVisible: false
}

const uploaderSlice = createSlice({
    name: 'uploaderSlice',
    initialState,
    reducers: {
        setIsVisible(state, action) {
            state.isVisible = action.payload
        },
        addUploadFile(state, action) {
            state.files = [...state.files, {...action.payload}]
        },
        removeUploadFile(state, action) {
            state.files = [...state.files.filter(file => file.id !== action.payload)]
        },
        changeUploadFile(state, action) {
            state.files = [...state.files.map(file => file.id === action.payload.id
                ? {...file, progress: action.payload.progress}
                : {...file}    
            )]
        }
    }
})

export default uploaderSlice.reducer
export const {addUploadFile, setIsVisible, removeUploadFile, changeUploadFile} = uploaderSlice.actions