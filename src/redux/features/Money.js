import { createSlice } from '@reduxjs/toolkit'

export const money = createSlice({
    name: 'money',
    initialState: {
        value: 50000,
    },
    reducers: {

        setMoney:(state, action) => {
            state.value = action.payload
        },
        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment,decrement,setMoney} = money.actions

export default money.reducer