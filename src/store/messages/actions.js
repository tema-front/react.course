export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE'
export const REMOVE_MESSAGE = 'MESSAGES::REMOVE_MESSAGE'

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author
    }
})

export const removeMessage = (chatId, id) => ({
    type: REMOVE_MESSAGE,
    payload: {
        chatId,
        id
    }
})