import { createSlice } from '@reduxjs/toolkit'

export const restart = createSlice({
    name: 'restart',
    initialState: {
        value: false,
    },
    reducers: {

        setRestart: (state,action) => {
            state.value = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const {setRestart} = restart.actions

export default restart.reducer