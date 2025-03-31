import { createSlice } from '@reduxjs/toolkit'

export const battle = createSlice({
    name: 'battle',
    initialState: {
        value: [],
    },
    reducers: {
        addBattle: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        removeBattle: (state) => {
            state.value.splice(0,state.value.length)
        }
    },
})

export const {addBattle,removeBattle} = battle.actions

export default battle.reducer