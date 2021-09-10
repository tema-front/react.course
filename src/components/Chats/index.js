// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import '../../style/App.css';
// import { Message } from '../Message';
// import { ChatsList } from '../ChatsList'; // компонент чатов
// import { AUTHORS } from '../../utils/constants';
// import { FormMessage } from '../FormMessage';
// const chatsList = {
//   'chat-1': [{text: '123', author: 'User', id: 'mess-' + Date.now()}],
//   'chat-2': [{text: '', author: 'User', id: 'mess-' + Date.now()}]
// }
// export const Chats = () => {
//   const { chatId }  = useParams()
//   const [messageList, setMessageList] = useState({
//     'chat-1': [{text: '123', author: 'User', id: 'mess-' + Date.now()}],
//     'chat-2': [{text: '', author: 'User', id: 'mess-' + Date.now()}]
//   })
//   const [chatsNameList, setChatsList] = useState([
    // {name: 'Bot', id: 'chat-1'},
    // {name: 'John', id: 'chat-2'},
    // {name: 'Sveta', id: 'chat-3'},
    // {name: 'Richard', id: 'chat-4'}
//   ])
 

//   const [chatsMessages, setChatsMessages] = useState({
//     Bot: []

//     // 'Bot': {text: 'Hello, I am Bot', author: AUTHORS.BOT, id: 'Bot-' + Date.now()},
//     // 'John': {text: 'Hello, I am Jonh', author: AUTHORS.BOT, id: 'John-' + Date.now()},
//     // 'Sveta': {text: 'Hello, I am Sveta', author: AUTHORS.BOT, id: 'Sveta-' + Date.now()},
//     // 'Richard': {text: 'Hello, I am Richard', author: AUTHORS.BOT, id: 'Richard-' + Date.now()}
//   })

  // const timer = useRef()

//   // useEffect(() => {
//   //   debugger
//   //   if (chatsMessages[chatId - 1]?.author === AUTHORS.USER) {
//   //     timer.current = setTimeout(() => {
//   //       setChatsMessages(prevChatsMessages => [...prevChatsMessages, 
//   //         chatsMessages[chatId - 1].messages.push(AUTHORS.ANSWERBOT[Math.floor(Math.random() * (6 - 0)) + 0]),
//   //         // chatsMessages[chatId - 1].author = AUTHORS.BOT
//   //       ])
//   //       console.log(chatsMessages);
//   //     }, 1500)
//   //   }
//   // }, [chatsMessages])


// //   useEffect(() => {
// //     if (messageList[messageList.length - 1]?.author === AUTHORS.USER) {
// //       // Таймер для ответа бота с генерацией случайного ответа из массива ответов)
// //       timer.current = setTimeout(() => {
// //         setMessageList((prevMessages) => [...prevMessages, {
// //           text: AUTHORS.ANSWERBOT[Math.floor(Math.random() * (6 - 0)) + 0],
// //           author: AUTHORS.BOT,
// //           id: `mess-${Date.now()}`
// //         }])
// //       }, 1500);
// //       return () => clearTimeout(timer.current)
// //     } 

// //   }, [messageList])

//   const addMessage = useCallback((text) => {
//     // debugger
//     // console.log(chatsMessages);
//     // setChatsMessages(prevChatsMessages => {
//     //   prevChatsMessages, text
//     // })
//     // console.log(chatsMessages.Bot);

//   }, [chatsMessages, chatId] )

//   // const addMessage = useCallback((text) => {
//   //   setMessageList(prevMessageList => [...prevMessageList, {
//   //     text,
//   //     author: AUTHORS.USER,
//   //     id: `mess-${.now()}`
//   //   }])
//   // }, [])


//   return (
    // <div className="App container"> 
    //   <div className="wrapperForm">

    //     <FormMessage onSubmit={addMessage}/>

    //     <div className="conversationalBlock"> 

    //       {/* Блок чатов*/}
    //       <ChatsList chats={chatsNameList} />

    //       {/* Блок сообщений в чате */}
    //      <Message messageList={messageList['chat-1']} />

    //     </div>

    //   </div>
    // </div>
//   );
// }

  
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
      debugger
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
    setChats(prevChats => [
      ...prevChats, {name: 'New Chat', id: `chat-${chats.length + 1}`}
    ]);

    setMessagesList(prevMessagesList => ({
      ...prevMessagesList, [`chat-${(chats.length + 1)}`]: []
    }))
  })

  const removeChat = (chatRemove) => {
    debugger
    delete messagesList[chatRemove]
    setMessagesList(messagesList)
    console.log(messagesList);
  }


  return (
    <div className="App container"> 
      <div className="wrapperForm">

        <FormMessage onSubmit={handleAddMessage}/>
        <div className="conversationalBlock"> 

          {/* Блок чатов*/}
          <ChatsList chats={chats} onAddChat={makeNewChat} onRemoveChat={removeChat}/>

          {/* Блок сообщений в чате */}
          <Message messageList={messagesList[chatId]} />

        </div>
      </div>
    </div>
  );
}

