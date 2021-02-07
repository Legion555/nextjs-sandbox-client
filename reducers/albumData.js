const albumDataReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_ALBUMDATA':
            return action.payload
        default:
            return state
    }
}

export default albumDataReducer