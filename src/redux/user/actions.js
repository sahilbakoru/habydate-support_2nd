const userActions = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
    USER_UPDATE: 'USER_UPDATE',
    USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
    USER_UPDATE_ERROR: 'USER_UPDATE_ERROR',
    USER_UPLOAD_IMAGE: 'USER_UPLOAD_IMAGE',
    USER_UPLOAD_IMAGE_SUCCESS: 'USER_UPLOAD_IMAGE_SUCCESS',
    USER_UPLOAD_IMAGE_ERROR: 'USER_UPLOAD_IMAGE_ERROR',
    USER_SIGN_OUT: 'USER_SIGN_OUT',
    USER_SIGN_IN: 'USER_SIGN_IN',
    USER_LOCATION: 'USER_LOCATION',
    USER_SET_BASIC: 'USER_SET_BASIC',
    USER_CREATE: 'USER_CREATE',
    USER_CREATE_SUCCESS: 'USER_CREATE_SUCCESS',
    USER_CREATE_ERROR: 'USER_CREATE_ERROR',
    UNSET_NEW_USER: 'UNSET_NEW_USER',
    ADD_BLOCKED_USER: "ADD_BLOCKED_USER",
    SET_USER_LOADING: "SET_USER_LOADING",
    UNBLOCKED_USER: "UNBLOCKED_USER",
    userLogin: payload => ({
        type: userActions.USER_LOGIN,
        payload
    }),
    userLoinSuccess: payload => ({
        type: userActions.USER_LOGIN_SUCCESS,
        payload
    }),
    userLoinError: payload => ({
        type: userActions.USER_LOGIN_ERROR,
        payload
    }),
    userUpdate: payload => ({
        type: userActions.USER_UPDATE,
        payload
    }),
    userUpdateSuccess: payload => ({
        type: userActions.USER_UPDATE_SUCCESS,
        payload
    }),
    userUpdateError: payload => ({
        type: userActions.USER_UPDATE_ERROR,
        payload
    }),
    userUploadImage: payload => ({
        type: userActions.USER_UPLOAD_IMAGE,
        payload
    }),
    userUploadImageSuccess: payload => ({
        type: userActions.USER_UPLOAD_IMAGE_SUCCESS,
        payload
    }),
    userUploadImageError: payload => ({
        type: userActions.USER_UPLOAD_IMAGE_ERROR,
        payload
    }),
    userSignOut: payload => ({
        type: userActions.USER_SIGN_OUT,
        payload
    }),
    userSignIN: payload => ({
        type: userActions.USER_SIGN_IN,
        payload
    }),
    userLocation: payload => ({
        type: userActions.USER_LOCATION,
        payload
    }),
    userSetBasic: payload => ({
        type: userActions.USER_SET_BASIC,
        payload
    }),
    userCreate: payload => ({
        type: userActions.USER_CREATE,
        payload
    }),
    userCreateSuccess: payload => ({
        type: userActions.USER_CREATE_SUCCESS,
        payload
    }),
    userCreateError: payload => ({
        type: userActions.USER_CREATE_ERROR,
        payload
    }),
    userUnsetNewUser: payload => ({
        type: userActions.UNSET_NEW_USER,
        payload
    }),
    setUserLoading: payload => ({
        type: userActions.SET_USER_LOADING,
        payload
    }),
    addBlockedUser: payload => ({
        type: userActions.ADD_BLOCKED_USER,
        payload
    }),
    unBlockedUser: payload => ({
        type: userActions.UNBLOCKED_USER,
        payload
    })
}

export default userActions