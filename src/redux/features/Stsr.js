import { createSlice } from '@reduxjs/toolkit'

export const star = createSlice({
    name: 'star',
    initialState: {
        value: 3,
    },
    reducers: {

        none: (state) => {
            state.value = 0
        },
        one: (state) => {
            state.value = 1
        },
        two: (state) => {
            state.value = 2
        },
        three: (state) => {
            state.value = 3
        },
    },
})


export const {none,one,two,three} = star.actions

export default star.reducer