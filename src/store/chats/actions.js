import { onValue, ref, set } from "@firebase/database"
import { db } from "../../services/firebase"

export const ADD_CHAT = 'CHAT::ADD_CHAT'
export const REMOVE_CHAT = 'CHAT::REMOVE_CHAT'
export const SET_CHATS = 'CHAT::SET_CHATS'

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: name
})

export const deleteChat = (id) => ({
    type: REMOVE_CHAT,
    payload: id
}) 

export const setChat = (chats) => ({
    type: SET_CHATS,
    payload: chats
}) 

export const initChats = () => (dispatch) => {
    const chatDBref = ref(db, 'chats')
    onValue(chatDBref, (snapshot) => {
        const data = snapshot.val();
        dispatch(setChat(Object.values(data || {})))
        // setChats(Object.values(data || {}));
    })
}

export const addChatFb = (nameNewChat) => () => {
    const newId = `chat-${Date.now()}`;
    const chatDBref = ref(db, `chats/${newId}`)

    set(chatDBref, {
        id: newId,
        name: nameNewChat
    })
}