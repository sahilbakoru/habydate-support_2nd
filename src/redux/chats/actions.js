const chatsActions = {
    GET_ALL_CHATS: 'GET_ALL_CHATS',
    GET_ALL_CHATS_SUCCESS: 'GET_ALL_CHATS_SUCCESS',
    GET_ALL_CHATS_ERROR: 'GET_ALL_CHATS_ERROR',
    GET_ALL_MATCHED_MSG: 'GET_ALL_MATCHED_MSG',
    GET_ALL_MATCHED_MSG_ERROR: 'GET_ALL_MATCHED_MSG_ERROR',
    GET_ALL_MATCHED_MSG_SUCCESS: 'GET_ALL_MATCHED_MSG_SUCCESS',
    CLEAR_CHAT: 'CLEAR_CHAT',
    getAllChats: (payload) => ({
        type: chatsActions.GET_ALL_CHATS,
        payload,
    }),
    getAllChatsSuccess: (payload) => ({
        type: chatsActions.GET_ALL_CHATS_SUCCESS,
        payload,
    }),
    getAllChatsError: (payload) => ({
        type: chatsActions.GET_ALL_CHATS_ERROR,
        payload,
    }),
    getAllMatchedMessages: (payload) => ({
        type: chatsActions.GET_ALL_MATCHED_MSG,
        payload,
    }),
    getAllMatchedMessagesSuccess: (payload) => ({
        type: chatsActions.GET_ALL_MATCHED_MSG_SUCCESS,
        payload,
    }),
    getAllMatchedMessagesError: (payload) => ({
        type: chatsActions.GET_ALL_MATCHED_MSG_SUCCESS,
        payload,
    }),
    clearChat: (payload) => ({
        type: chatsActions.CLEAR_CHAT,
        payload
    })
}

export default chatsActions;