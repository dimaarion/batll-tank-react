import { createSlice } from '@reduxjs/toolkit'

export const sec = createSlice({
    name: 'sec',
    initialState: {
        value: "0",
    },
    reducers: {
        seconds: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {seconds} = sec.actions

export default sec.reducer