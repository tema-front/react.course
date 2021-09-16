import { useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { AUTHORS } from "../../utils/constants";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/chats/actions";
import { addMessage } from "../../store/messages/actions";

export const Chats = () => {

  const { chatId } = useParams();
  const timer = useRef()

  const messagesList = useSelector((state) => state.storeMessages.messagesList)

  // const [chats, setChats] = useState([
  //   {name: 'Bot', id: 'chat-1'},
  //   {name: 'John', id: 'chat-2'},
  //   {name: 'Sveta', id: 'chat-3'},
  //   {name: 'Richard', id: 'chat-4'}
  // ]);

  const chats = useSelector((state) => state.storeChats.chats)
  const dispatch = useDispatch()

  const addMessageToList = useCallback(
    (text, author) => {
      debugger
      dispatch(addMessage(chatId, text, author))
    },
    [chatId]
  );

  useEffect(() => {
    debugger
    const currentMessage = messagesList[chatId];
    if (Boolean(chatId) && currentMessage?.[currentMessage.length - 1]?.author === AUTHORS.USER) {
      timer.current = setTimeout(() => {
        let currentChatName = (chats.filter(chat => chat.id === chatId))[0];
        addMessageToList(
          AUTHORS.ANSWERBOT[Math.floor(Math.random() * (11 - 0)) + 0],
          currentChatName.name
        );
      }, 1500);
    }
    return () => clearTimeout(timer.current);
  }, [messagesList]);

  const handleAddMessage = useCallback(
    (text) => {
      debugger
      if (messagesList[chatId] || []) {
        addMessageToList(text, AUTHORS.USER);
      } else alert('choose chat')
    },
    [chatId, addMessageToList, messagesList]
  )

  const makeNewChat = useCallback((nameChat) => {
    dispatch(addChat(nameChat))
  }, [dispatch])

  const removeChat = useCallback((chatRemove) => {
    dispatch(deleteChat(chatRemove))
  }, [chatId, dispatch])

  return (
    <div className="App container"> 
      <div className="wrapperForm">

        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 

          {/* Блок чатов с добавлением и удалением чатов */}
          <ChatsList chats={chats} onAddChat={makeNewChat} onRemoveChat={removeChat}/>

          {/* Блок сообщений */}
          <Message messagesList={messagesList[chatId]} />

        </div>
      </div>
    </div>
  );
}

