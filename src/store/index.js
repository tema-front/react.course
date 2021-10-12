import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { chatReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { profileReducer } from './profile/reducer';
import { articlesReducer } from './articles/reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['storeMessages', 'storeChats', 'storeArticles', 'storeProfile']
}

const rootReducer = combineReducers({
    storeProfile: profileReducer,
    storeChats: chatReducer,
    storeMessages: messagesReducer,
    storeArticles: articlesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

export default store