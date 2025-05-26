import { createSlice } from '@reduxjs/toolkit'

export const ysdk = createSlice({
    name: 'ysdk',
    initialState: {
        value: {},
    },
    reducers: {
        getSdk: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {getSdk} = ysdk.actions

export default ysdk.reducer