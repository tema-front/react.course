import { onValue, ref, set } from "@firebase/database"
import { db } from "../../services/firebase"
import { CONSTANTS } from "../../utils/constants"


export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE'
export const REMOVE_MESSAGE = 'MESSAGES::REMOVE_MESSAGE'
export const SET_MESSAGES = 'MESSAGES::SET_MESSAGES'


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

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

export const initMessages = (chatId) => (dispatch) => {
    debugger
    const messagesDBRef = ref(db, `messages/${chatId}`);
    onValue(messagesDBRef, (snapshot) => {
      const data = snapshot.val()
      dispatch(setMessages(data || {}))

    });
}


let timeoutBot;
export const addMessageFb = (text, author, chatId) => (dispatch, getState) => {
    debugger
    const newId = `mess-${Date.now()}`
    const messagesDBRef = ref(db, `messages/${chatId}/${newId}`);
    set(messagesDBRef, {
        author,
        text,
        id: newId
    })
    
    clearTimeout(timeoutBot)

    timeoutBot = setTimeout(() => {
        let { chats } = getState().storeChats
        const botId = `${newId}-BOT`
        const messagesBotDbRef =  ref(db, `messages/${chatId}/${botId}`);
        console.log(ref(db, `chats/${chatId}`));
        let currentChatName = (chats.filter(chat => chat.id === chatId)[0].name);
        set(messagesBotDbRef, {
            author: currentChatName,
            text: CONSTANTS.ANSWERBOT[Math.floor(Math.random() * (11 - 0)) + 0],
            id: botId
        });
    }, 1500);
}

// export const addMessageWithReply = (chatId, text, author) => (dispatch, getState) => {
//     dispatch(addMessage(chatId, text, author))
    // if (author === getState().storeProfile.profileName) {
    //     clearTimeout(timeoutBot)
    //     timeoutBot = setTimeout(() => {
    //         // Моя реализация бота чуть сложнее т.к автор у бота - это название чата
    //         let { chats } = getState().storeChats
    //         let currentChatName = (chats.filter(chat => chat.id === chatId))[0];
    //         dispatch(addMessage (
    //             chatId,
    //             CONSTANTS.ANSWERBOT[Math.floor(Math.random() * (11 - 0)) + 0],
    //             currentChatName.name
    //         ));
    //   }, 1500);
    // }
// }