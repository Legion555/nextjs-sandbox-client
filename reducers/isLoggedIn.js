const isLoggedInReducer = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_ISLOGGEDIN':
            return action.payload
        default:
            return state
    }
}

export default isLoggedInReducer