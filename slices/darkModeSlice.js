import {createSlice} from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        value: false
    },
    reducers: {
        setDark: state => {
            state.value = true
        },
        setLight: state => {
            state.value = false
        }
    }
})

export const {setDark, setLight} = darkModeSlice.actions

export default darkModeSlice.reducer