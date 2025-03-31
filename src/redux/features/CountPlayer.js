import { createSlice } from '@reduxjs/toolkit'

export const countPlayer = createSlice({
    name: 'countPlayer',
    initialState: {
        value: "0",
    },
    reducers: {

        count: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {count} = countPlayer.actions

export default countPlayer.reducer