import { createSlice } from '@reduxjs/toolkit'

export const movementCamera = createSlice({
    name: 'movementCamera',
    initialState: {
        value: "",
    },
    reducers: {

        cameraRight: (state) => {
            state.value = "left"
        },
        cameraLeft: (state) => {
            state.value = "right"
        },
        cameraTop: (state) => {
            state.value = "top"
        },
        cameraBottom: (state) => {
            state.value = "bottom"
        },
    },
})

// Action creators are generated for each case reducer function
export const {cameraRight,cameraLeft,cameraTop,cameraBottom} = movementCamera.actions

export default movementCamera.reducer