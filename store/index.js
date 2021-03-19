import {configureStore} from '@reduxjs/toolkit';
import isLoggedInReducer from '../slices/isLoggedInSlice';
import userDataReducer from '../slices/userDataSlice';
import albumListReducer from '../slices/albumListSlice';
import albumDataReducer from '../slices/albumDataSlice';
import darkModeReducer from '../slices/darkModeSlice';

export default configureStore({
    reducer: {
        isLoggedIn: isLoggedInReducer,
        userData: userDataReducer,
        albumList: albumListReducer,
        albumData: albumDataReducer,
        darkMode: darkModeReducer
    }
})