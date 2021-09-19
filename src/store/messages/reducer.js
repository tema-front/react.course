import { REMOVE_CHAT } from "../chats/actions"
import { ADD_MESSAGE, REMOVE_MESSAGE } from "./actions"


const initialState = {
    messagesList: {},
}

export const messagesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messagesList: {
                    ...state.messagesList,
                    [payload.chatId]: [...(state.messagesList[payload.chatId] || []),
                        {
                            id: `message-${Date.now()}`,
                            text: payload.text,
                            author: payload.author
                        }
                    ]
                }
            }
        }
        
        case REMOVE_MESSAGE: { 
            const newChatMessages = state.messagesList[payload.chatId].filter(({id}) => id !== payload.id)
            return {
                ...state,
                messagesList: {
                    ...state.messagesList,
                    [payload.chatId]: newChatMessages
                }
            }
        }
        
        case REMOVE_CHAT : { 
            const newMessagesList = {...state.messagesList}
            delete state.messagesList[payload];

            return {
                ...state,
                messagesList: newMessagesList
            }
        }

        default: return state;   
    }
}