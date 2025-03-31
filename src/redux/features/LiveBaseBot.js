import { createSlice } from '@reduxjs/toolkit'

export const liveBaseBot = createSlice({
    name: 'liveBaseBot',
    initialState: {
        value: "0",
    },
    reducers: {

        liveBot: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {liveBot} = liveBaseBot.actions

export default liveBaseBot.reducer