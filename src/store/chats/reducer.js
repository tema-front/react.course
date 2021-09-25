import { ADD_CHAT, REMOVE_CHAT } from "./actions"

const initialState = {
    chats: [],
}

export const chatReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, { id: `chat-${Date.now()}`, name: payload }]
            }
        }
        
        case REMOVE_CHAT : { 
            const newChat = state.chats.filter(chat => chat.id !== payload)
            return {
                ...state,
                chats: newChat 
            }
        }

        default: return state;   
    }
}