import { createSlice } from '@reduxjs/toolkit'
import InitializeGameData from "../../json/InitializeGameData.json"
export const zoom = createSlice({
    name: 'countBot',
    initialState: {
        value: InitializeGameData.zoom,
    },
    reducers: {
        setZoom: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setZoom} = zoom.actions

export default zoom.reducer