import { createSlice } from '@reduxjs/toolkit'

export const selectMenu = createSlice({
    name: 'selectMenu',
    initialState: {
        value: "К бою",
    },
    reducers: {

        setMenu: (state, action) => {
            state.value = action.payload
        },
    },
})


export const {setMenu} = selectMenu.actions

export default selectMenu.reducer