import { createSlice } from '@reduxjs/toolkit'

export const gameOver = createSlice({
    name: 'game-over',
    initialState: {
        value: {active:false,hp:0,bot:0,title:""},
    },
    reducers: {

        gameOverOpen: (state,action) => {
            state.value = {... state.value, active:true,hp:action.payload.hp,bot:action.payload.bot,title:action.payload.title};
        },
        gameOverClose: (state) => {
            state.value = {... state.value, active:false,hp:state.value.hp,bot:state.value.bot,title:state.value.title};
        },
    },
})

// Action creators are generated for each case reducer function
export const {gameOverOpen,gameOverClose} = gameOver.actions

export default gameOver.reducer