import { createSlice } from '@reduxjs/toolkit'

export const gameOver = createSlice({
    name: 'game-over',
    initialState: {
        value: false,
    },
    reducers: {

        gameOverOpen: (state) => {
            state.value = true;
        },
        gameOverClose: (state) => {
            state.value = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const {gameOverOpen,gameOverClose} = gameOver.actions

export default gameOver.reducer