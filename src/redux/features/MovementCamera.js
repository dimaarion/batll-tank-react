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
        cameraStop: (state) => {
            state.value = ""
        },
        cameraDialog: (state) => {
            state.value = "dialog"
        },
    },
})

// Action creators are generated for each case reducer function
export const {cameraRight,cameraLeft,cameraTop,cameraBottom,cameraStop,cameraDialog} = movementCamera.actions

export default movementCamera.reducer