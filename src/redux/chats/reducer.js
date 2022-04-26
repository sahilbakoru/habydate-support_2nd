import actions from './actions';

const initState = {
    list: [],
    loading: false,
    messagesList: [],
    error: null,
};

export function chatsReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_ALL_CHATS:
            return { ...state, loading: false }
        case actions.GET_ALL_CHATS_SUCCESS:
            return { ...state, loading: false, list: action.payload };
        case actions.GET_ALL_CHATS_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching chats',
            };
        case actions.GET_ALL_MATCHED_MSG:
            return { ...state, loading: true }
        case actions.GET_ALL_MATCHED_MSG_SUCCESS:
            return { ...state, loading: false, messagesList: action.payload };
        case actions.GET_ALL_MATCHED_MSG_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching chats',
            };
        case actions.CLEAR_CHAT:
            return {
                list: [],
                loading: false,
                messagesList: [],
                error: null,
            }
        default:
            return state;
    }
}