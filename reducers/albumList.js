const albumListReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_ALBUMLIST':
            return action.payload
        default:
            return state
    }
}

export default albumListReducer