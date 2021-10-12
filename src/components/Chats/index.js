import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { addMessageFb, addMessageWithReply, initMessages } from "../../store/messages/actions";
import { getChatList } from "../../store/chats/selectors";
import { getMessageList } from "../../store/messages/selectors";
import { getProfileName } from "../../store/profile/selectors";
import { onValue, ref, set } from "@firebase/database";
import { db } from "../../services/firebase";
import { CONSTANTS } from "../../utils/constants";
import { initChats } from "../../store/chats/actions";

export const Chats = () => {
  // const [messagesList, setMessagesList] = useState([]);
  // const subscribeMessages = useRef(null);
  const dispatch = useDispatch()
  const messagesList = useSelector(getMessageList);
  const userName = useSelector(getProfileName);
  // const [chats, setChats] = useState([]);
  // const [, setCurrentChatName] = useState('');
  // const chats = useSelector(getChatList);
  const { chatId } = useParams();
  // let timeoutBot;
  // const dispatch = useDispatch();


  useEffect(() => {
    dispatch(initChats())
    dispatch(initMessages(chatId))
}, [chatId])
  
  const addMessageToList = useCallback(
    (text, author) => {
      dispatch(addMessageFb(text, author, chatId))

      // timeoutBot = setTimeout(() => {
      //   debugger
      //   const botId = `${newId}-BOT`
      //   const messagesBotDbRef =  ref(db, `messages/${chatId}/${botId}`);
      //   console.log(ref(db, `chats/${chatId}`));
      //     let currentChatName = (chats.filter(chat => chat.id === chatId)[0].name);
      //     set(messagesBotDbRef, {
      //       author: currentChatName,
      //       text: CONSTANTS.ANSWERBOT[Math.floor(Math.random() * (11 - 0)) + 0],
      //       id: botId
      //     });
      // }, 1500);
    },
    [chatId]
  );

  const handleAddMessage = useCallback(
    (text) => {
      debugger
      if (messagesList[chatId] || []) {
        addMessageToList(text, userName);
      }
    },
    [chatId, addMessageToList, messagesList, userName]
  )

  return (
    <div className="App container containerChats"> 
        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 
          {/* Блок чатов с добавлением и удалением чатов */}
          <ChatsList />
          {/* Блок сообщений */}
          {/* <Message messagesList={Object.values(messagesList?.[chatId] || {}) || []} /> */}
          <Message messagesList={Object.values(messagesList || {}) || []} />
        </div>
    </div>
  );
}

