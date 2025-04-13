import { createSlice } from '@reduxjs/toolkit'

export const load = createSlice({
    name: 'load',
    initialState: {
        value: 0,
    },
    reducers: {

        setLoad: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setLoad} = load.actions

export default load.reducer