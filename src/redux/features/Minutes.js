import { createSlice } from '@reduxjs/toolkit'

export const minutes = createSlice({
    name: 'minutes',
    initialState: {
        value: "0",
    },
    reducers: {

        minute: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {minute} = minutes.actions

export default minutes.reducer