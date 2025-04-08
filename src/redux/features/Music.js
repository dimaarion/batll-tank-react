import { createSlice } from '@reduxjs/toolkit'

export const music = createSlice({
    name: 'music',
    initialState: {
        value: 0.5,
    },
    reducers: {

        setMusic: (state,action) => {
            state.value = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const {setMusic} = music.actions

export default music.reducer