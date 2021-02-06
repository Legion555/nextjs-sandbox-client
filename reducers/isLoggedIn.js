const isLoggedInReducer = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_ALBUMLIST':
            return action.payload
        default:
            return state
    }
}

export default isLoggedInReducer