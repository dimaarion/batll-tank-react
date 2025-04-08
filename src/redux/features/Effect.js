import { createSlice } from '@reduxjs/toolkit'

export const effect = createSlice({
    name: 'effect',
    initialState: {
        value: 0.5,
    },
    reducers: {

        setEffect: (state,action) => {
            state.value = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const {setEffect} = effect.actions

export default effect.reducer