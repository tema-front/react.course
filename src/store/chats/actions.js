export const ADD_CHAT = 'CHAT::ADD_CHAT'
export const REMOVE_CHAT = 'CHAT::REMOVE_CHAT'

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: name
})

export const deleteChat = (id) => ({
    type: REMOVE_CHAT,
    payload: id
}) 