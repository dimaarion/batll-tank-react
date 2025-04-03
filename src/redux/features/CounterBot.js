import { createSlice } from '@reduxjs/toolkit'

export const counterBot = createSlice({
    name: 'countBot',
    initialState: {
        value: 0,
    },
    reducers: {
        countBot: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {countBot} = counterBot.actions

export default counterBot.reducer