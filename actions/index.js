//albumList
export const updateAlbumList = data => {
    return {
        type: 'UPDATE_ALBUMLIST',
        payload: data
    }
}

//isLoggedIn
export const updateIsLoggedIn = data => {
    return {
        type: 'UPDATE_ISLOGGEDIN',
        payload: data
    }
}

//userData
export const updateUserData = data => {
    return {
        type: 'UPDATE_USERDATA',
        payload: data
    }
}

//albumData
export const updateAlbumData = data => {
    return {
        type: 'UPDATE_ALBUMDATA',
        payload: data
    }
}