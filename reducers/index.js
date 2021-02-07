import {combineReducers} from 'redux'
import albumListReducer from './albumList'
import isLoggedInReducer from './isLoggedIn'
import userDataReducer from './userData'
import albumDataReducer from './albumData'

const rootReducer = combineReducers({
    albumList: albumListReducer,
    isLoggedIn: isLoggedInReducer,
    userData: userDataReducer,
    albumData: albumDataReducer
})

export default rootReducer