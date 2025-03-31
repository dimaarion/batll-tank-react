import { createSlice } from '@reduxjs/toolkit'

export const liveBasePlayer = createSlice({
    name: 'liveBasePlayer',
    initialState: {
        value: "0",
    },
    reducers: {

        live: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {live} = liveBasePlayer.actions

export default liveBasePlayer.reducer