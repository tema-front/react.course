import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../Message";
import { AUTHORS } from "../../utils/constants";
import { FormMessage } from "../FormMessage";
import { ChatsList } from "../ChatsList";

export const Chats = () => {

  const { chatId } = useParams();
  const timer = useRef()

  const [messagesList, setMessagesList] = useState({
    "chat-1": [],
    "chat-2": [],
    "chat-3": [],
    "chat-4": [],
  });

  const [chats, setChats] = useState([
    {name: 'Bot', id: 'chat-1'},
    {name: 'John', id: 'chat-2'},
    {name: 'Sveta', id: 'chat-3'},
    {name: 'Richard', id: 'chat-4'}
  ]);

  const addMessage = useCallback(
    (message) => {
      setMessagesList((prevMessagesList) => ({
        ...prevMessagesList,
        [chatId]: [...prevMessagesList[chatId], message],
      }));
    },
    [chatId]
  );

  useEffect(() => {

    const currentMessage = messagesList[chatId];

    if (Boolean(chatId) && currentMessage?.[currentMessage.length - 1]?.author === AUTHORS.USER) {
      timer.current = setTimeout(() => {
        addMessage({
          text: 'Bot: ' + AUTHORS.ANSWERBOT[Math.floor(Math.random() * (11 - 0)) + 0],
          author: AUTHORS.BOT,
          id: `mess-${Date.now()}`,
        });
      }, 1500);
    }
    return () => clearTimeout(timer.current);
  }, [messagesList]);

  const handleAddMessage = useCallback(
    (text) => {
      if (messagesList[chatId]) {
        addMessage({
          text: 'User: ' + text,
          author: AUTHORS.USER,
          id: `mess-${Date.now()}`,
        });
      } else alert('choose chat')
    },
    [chatId, addMessage]
  )

  const makeNewChat = useCallback(() => {
    // Добавляю новый чат (пока что с дефолтным названием) в массив чатов и в массив сообщений чатов
    setChats(prevChats => [
      ...prevChats, {name: 'New Chat', id: `chat-${chats.length + 1}`}
    ]);

    setMessagesList(prevMessagesList => ({
      ...prevMessagesList, [`chat-${(chats.length + 1)}`]: []
    }))
  })

  const removeChat = useCallback((chatRemove) => {
    // Удаляю свойство объекта по ключу chatRemove
    delete messagesList[chatRemove]
    setMessagesList(messagesList)
    // Отбрасываю удаляемый чат из списка чатов
    let newChat = chats.filter(chat => {if (chat.id !== chatRemove) return chat})
    setChats(newChat)
  })


  return (
    <div className="App container"> 
      <div className="wrapperForm">

        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 

          {/* Блок чатов с добавлением и удалением чатов */}
          <ChatsList chats={chats} onAddChat={makeNewChat} onRemoveChat={removeChat}/>

          {/* Блок сообщений */}
          <Message messageList={messagesList[chatId]} />

        </div>
      </div>
    </div>
  );
}

