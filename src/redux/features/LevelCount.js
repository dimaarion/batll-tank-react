import { createSlice } from '@reduxjs/toolkit'


export const levelCount = createSlice({
    name: "levelCount",
    initialState: {
        value: {id:1,name:"map"},
    },
    reducers: {
        getLevel:(state, action)=>{
            state.value = {... state.value, id:action.payload.id, name:action.payload.name}

        }
    },
})

export const {getLevel} = levelCount.actions

export default levelCount.reducer