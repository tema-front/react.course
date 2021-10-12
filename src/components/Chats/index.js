import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";
import { useDispatch, useSelector } from "react-redux";
import { addMessageWithReply } from "../../store/messages/actions";
// import { getChatList } from "../../store/chats/selectors";
import { getMessageList } from "../../store/messages/selectors";
import { getProfileName } from "../../store/profile/selectors";
import { onValue, ref, set } from "@firebase/database";
import { db } from "../../services/firebase";
import { CONSTANTS } from "../../utils/constants";

export const Chats = () => {
  const [messagesList, setMessagesList] = useState([]);
  const subscribeMessages = useRef(null);
  // const messagesList = useSelector(getMessageList);
  const userName = useSelector(getProfileName);
  const [chats, setChats] = useState([]);
  const [, setCurrentChatName] = useState('');
  // const chats = useSelector(getChatList);
  const { chatId } = useParams();
  let timeoutBot;
  // const dispatch = useDispatch();

  useEffect(() => {
    if (subscribeMessages.current) subscribeMessages.current();
    
    const messagesDBRef = ref(db, `messages/${chatId}`);
    const subscribe = onValue(messagesDBRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data); 
      setMessagesList(Object.values(data || {}) )
      console.log(messagesList);
    });
    subscribeMessages.current = subscribe;
    return () => subscribe();
  }, [chatId])

  useEffect(() => {
    debugger
    const chatDBref = ref(db, 'chats')
    onValue(chatDBref, (snapshot) => {
        const data = snapshot.val();
        setChats(Object.values(data || {}));
    })
}, [])
  
  const addMessageToList = useCallback(
    (text, author) => {
      const newId = `mess-${Date.now()}`
      const messagesDBRef = ref(db, `messages/${chatId}/${newId}`);
      set(messagesDBRef, {
        author,
        text,
        id: newId
      })
      
      clearTimeout(timeoutBot)

      timeoutBot = setTimeout(() => {
        debugger
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
    },
    [chatId]
  );

  const handleAddMessage = useCallback(
    (text) => {
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
          <Message messagesList={messagesList} />
        </div>
    </div>
  );
}

