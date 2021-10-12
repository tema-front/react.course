import { CONSTANTS } from "../../utils/constants"


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

// let timeoutBot;

export const addMessageWithReply = (chatId, text, author) => (dispatch, getState) => {
    dispatch(addMessage(chatId, text, author))
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
}