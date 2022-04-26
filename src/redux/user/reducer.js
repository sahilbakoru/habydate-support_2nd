
import actions from "./actions"
const initState = {
    list: null,
    loading: false,
    error: null,
    isLogin: false,
    location: {
        latitude: 0.00,
        longitude: 0.00
    },
    basicUser: null,
    newUser: false,
    blockedUser: [],
    blockedByYou: []
}

const hydrateStore = () => {
    const list = JSON.parse(localStorage.getItem('user'));
    let isLogin = false;
    if (list) {
        isLogin = true;
    }
    return { ...initState, list, isLogin }
}

export function userReducer(state = hydrateStore(), action) {
    switch (action.type) {
        case actions.USER_LOGIN:
            return { ...state, loading: true };
        case actions.USER_LOGIN_SUCCESS:
            return { ...state, loading: false, list: action.payload[0], isLogin: true };
        case actions.USER_LOGIN_ERROR:
            return { ...state, loading: false, error: "Invalid user" };
        case actions.USER_UPDATE:
            return { ...state, loading: true };
        case actions.USER_UPDATE_SUCCESS: {
            localStorage.setItem('user', action.payload)
            return { ...state, loading: false, list: action.payload };
        }
        case actions.USER_UPDATE_ERROR:
            return { ...state, loading: false };
        case actions.USER_UPLOAD_IMAGE: {
            return { ...state, loading: true };
        }
        case actions.USER_UPLOAD_IMAGE_SUCCESS: {
            return { ...state, list: action.payload, loading: false };
        }
        case actions.USER_UPLOAD_IMAGE_ERROR: {
            return { ...state, loading: false };
        }
        case actions.USER_SIGN_OUT: {
            return {
                list: null,
                loading: false,
                error: null,
                isLogin: false,
                location: {
                    latitude: 0.00,
                    longitude: 0.00
                },
                basicUser: null,
                newUser: false,
                blockedUser: [],
                blockedByYou: []
            }
        }
        case actions.USER_SIGN_IN: {
            return { ...state, isLogin: true, loading: false }
        }
        case actions.USER_LOCATION: {
            return { ...state, location: action.payload }
        }
        case actions.USER_SET_BASIC: {
            return { ...state, basicUser: action.payload, loading: false, newUser: true }
        }
        case actions.USER_CREATE:
            return { ...state, loading: true, isLogin: false, newUser: false };
        case actions.USER_CREATE_SUCCESS:
            return { ...state, loading: false, list: action.payload, isLogin: true, newUser: false };
        case actions.USER_CREATE_ERROR:
            return { ...state, loading: false };
        case actions.UNSET_NEW_USER: {
            return { ...state, loading: false, newUser: false }
        }
        case actions.ADD_BLOCKED_USER: {
            let blockedUser = [];
            let blockedByYou = [];
            if (action.payload.init === true) {
                blockedUser = action.payload.blockedUser;
                blockedByYou = action.payload.blockedByYou;
            } else {
                blockedUser = [...state.blockedUser];
                blockedByYou = [...state.blockedByYou, { ...action.payload.blockedByYou }];
            }
            return { ...state, blockedUser, blockedByYou }
        }
        case actions.SET_USER_LOADING: {
            return { ...state, loading: action.payload }
        }
        case actions.UNBLOCKED_USER: {
            let blockedByYou = [...state.blockedByYou];
            let toId = action.payload.toId;
            let uid = action.payload.uid
            const foundedIndex = blockedByYou.map(item => item.to_user_id === toId && item.user_id === uid);
            if (foundedIndex != -1) {
                blockedByYou.splice(foundedIndex, 1);
            }
            return { ...state, blockedByYou, loading: false }
        }
        default:
            return state
    }

}