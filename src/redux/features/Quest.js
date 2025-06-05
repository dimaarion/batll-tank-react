import { createSlice } from '@reduxjs/toolkit'

export const quest = createSlice({
    name: 'quest',
    initialState: {
        value: {count:0,completed:false,name:""},
    },
    reducers: {
        setQuest: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setQuest} = quest.actions

export default quest.reducer