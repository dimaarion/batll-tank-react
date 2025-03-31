import { createSlice } from '@reduxjs/toolkit'

export const money = createSlice({
    name: 'money',
    initialState: {
        value: 50000,
    },
    reducers: {

        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment,decrement} = money.actions

export default money.reducer