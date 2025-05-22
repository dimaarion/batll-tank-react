import { createSlice } from '@reduxjs/toolkit'

export const dialogView = createSlice({
    name: 'dialogView',
    initialState: {
        value: true,
    },
    reducers: {

        dialogOpen: (state) => {
            state.value = true
        },
        dialogClose: (state) => {
            state.value = false
        },
        dialogOpenClose: (state,action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {dialogOpen,dialogClose,dialogOpenClose} = dialogView.actions

export default dialogView.reducer