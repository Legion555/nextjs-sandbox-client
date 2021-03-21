import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer } from 'redux-persist'
//reducers
import userDataReducer from '../slices/userDataSlice';
import albumListReducer from '../slices/albumListSlice';
import darkModeReducer from '../slices/darkModeSlice';

const reducers = combineReducers({
    userData: userDataReducer,
    albumList: albumListReducer,
    darkMode: darkModeReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;