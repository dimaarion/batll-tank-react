import { createSlice } from '@reduxjs/toolkit'

export const settingsOpen = createSlice({
    name: 'settingsOpen',
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


export const {increment,decrement} = settingsOpen.actions

export default settingsOpen.reducer