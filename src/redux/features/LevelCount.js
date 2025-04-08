import { createSlice } from '@reduxjs/toolkit'


export const levelCount = createSlice({
    name: "levelCount",
    initialState: {
        value: {id:1,name:"map",tiles:"tiles"},
    },
    reducers: {
        getLevel:(state, action)=>{
            state.value = {... state.value, id:action.payload.id, name:action.payload.name,tiles:action.payload.tiles}

        }
    },
})

export const {getLevel} = levelCount.actions

export default levelCount.reducer