import {createSlice} from '@reduxjs/toolkit'

export const albumDataSlice = createSlice({
    name: 'albumData',
    initialState: {
        value: null
    },
    reducers: {
        updateAlbumData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {updateAlbumData} = albumDataSlice.actions

export default albumDataSlice.reducer