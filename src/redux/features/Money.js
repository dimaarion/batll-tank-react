import { createSlice } from '@reduxjs/toolkit'
import InitializeGameData from "../../json/InitializeGameData.json"
export const money = createSlice({
    name: 'money',
    initialState: {
        value: InitializeGameData.money,
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