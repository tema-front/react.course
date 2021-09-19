import { useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { AUTHORS } from "../../utils/constants";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messages/actions";
import { getChatList } from "../../store/chats/selectors";
import { getMessageList } from "../../store/messages/selectors";

export const Chats = () => {
  const messagesList = useSelector(getMessageList)
  const chats = useSelector(getChatList);
  const { chatId } = useParams();
  const timer = useRef();
  const dispatch = useDispatch();

  const addMessageToList = useCallback(
    (text, author) => {
      debugger
      dispatch(addMessage(chatId, text, author))
    },
    [chatId, dispatch]
  );

  useEffect(() => {
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
      if (messagesList[chatId] || []) {
        addMessageToList(text, AUTHORS.USER);
      }
    },
    [chatId, addMessageToList, messagesList]
  )

  return (
    <div className="App container"> 
      <div className="wrapperForm">
        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 
          {/* Блок чатов с добавлением и удалением чатов */}
          <ChatsList chats={chats} />

          {/* Блок сообщений */}
          <Message messagesList={messagesList[chatId]} />
        </div>
      </div>
    </div>
  );
}

