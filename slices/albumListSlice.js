import {createSlice} from '@reduxjs/toolkit'

export const albumListSlice = createSlice({
    name: 'albumList',
    initialState: {
        value: null
    },
    reducers: {
        updateAlbumList: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {updateAlbumList} = albumListSlice.actions

export default albumListSlice.reducer