import {createSlice} from '@reduxjs/toolkit'

export const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState: {
        value: false
    },
    reducers: {
        updateIsLoggedIn: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {updateIsLoggedIn} = isLoggedInSlice.actions

export default isLoggedInSlice.reducer