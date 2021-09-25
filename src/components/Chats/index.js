import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { CONSTANTS } from "../../utils/constants";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { addMessageWithReply } from "../../store/messages/actions";
import { getChatList } from "../../store/chats/selectors";
import { getMessageList } from "../../store/messages/selectors";

export const Chats = () => {
  const messagesList = useSelector(getMessageList)
  const chats = useSelector(getChatList);
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const addMessageToList = useCallback(
    (text, author) => {
      dispatch(addMessageWithReply(chatId, text, author))
    },
    [chatId, dispatch]
  );

  const handleAddMessage = useCallback(
    (text) => {
      if (messagesList[chatId] || []) {
        addMessageToList(text, CONSTANTS.USER);
      }
    },
    [chatId, addMessageToList, messagesList]
  )

  return (
    <div className="App container wrapperForm"> 
        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 
          {/* Блок чатов с добавлением и удалением чатов */}
          <ChatsList chats={chats} />
          {/* Блок сообщений */}
          <Message messagesList={messagesList[chatId]} />
        </div>
    </div>
  );
}

