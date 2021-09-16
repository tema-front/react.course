import { createStore, combineReducers } from 'redux';
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { profileReducer } from './profile/reducer';

const rootReducer = combineReducers({
    storeProfile: profileReducer,
    storeChats: chatReducer,
    storeMessages: messagesReducer
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store