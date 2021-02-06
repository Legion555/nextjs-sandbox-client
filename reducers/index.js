import {combineReducers} from 'redux'
import albumListReducer from './albumList'
import isLoggedInReducer from './isLoggedIn'
import userDataReducer from './userData'

const rootReducer = combineReducers({
    albumList: albumListReducer,
    isLoggedIn: isLoggedInReducer,
    userData: userDataReducer
})

export default rootReducer