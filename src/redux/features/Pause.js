import { createSlice } from '@reduxjs/toolkit'

export const pause = createSlice({
    name: 'pause',
    initialState: {
        value: false,
    },
    reducers: {

        increment: (state) => {
            state.value = true;
        },
        decrement: (state) => {
            state.value = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment,decrement} = pause.actions

export default pause.reducer