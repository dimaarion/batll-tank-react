import { createSlice } from '@reduxjs/toolkit'
import levels from "../../json/level.json"

export const level = createSlice({
    name: 'level',
    initialState: {
        value: levels,
    },
    reducers: {
        setStar:(state, action)=>{
            state.value = state.value.map(el => {
                if (el.id === action.payload.id) {return {...el, star: action.payload.star}}
                return el;
            });

        },
        updateLevels:(state, action)=>{
            state.value = action.payload;
        }
    },
})

export const {setStar,updateLevels} = level.actions

export default level.reducer