
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import { Message } from './components/Message';
import { Chats } from './components/Chats';
import Input from '@material-ui/core/Input';

function App() {

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const answerBot = [
    'Hello, i\'m a bot',
    'I\'m written on React', 
    'Leave me alone', 'Get away!', 
    'Finally, you have done this task',
    'Tema wrote this homework for two days >:|'
  ];

  const chatsList = [
    'Bot',
    'John',
    'Sveta',
    'Richard'
  ]


  const timer = useRef()
  const inputRef = useRef()


  useEffect(() => {
    inputRef.current?.focus(); // Фокус на инпуте при рендере
  }, [])

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === 'User') {
      // Таймер для ответа бота с генерацией случайного ответа из массива ответов)
      timer.current = setTimeout(() => {
        setMessageList((prevMessages) => [...prevMessages, {
          text: answerBot[Math.floor(Math.random() * (6 - 0)) + 0],
          author: 'Bot',
          id: `mess-${Date.now()}`
        }])
      }, 1500);
      return () => {
        clearTimeout(timer.current)
      }
    } 

  }, [messageList])

  const handleText = (event) => { 
    setMessage(event.target.value) // Контролируемый input
  }

  

  const submitMessage = useCallback((event) => {
    debugger
    inputRef.current?.children[0].focus(); // Фокус на инпуте после клика
    event.preventDefault()
    setMessage('') // Отчищаю поле инпута при отправке формы
    // Добавляю в массив новое сообщение
    setMessageList(prevMessageList => [...prevMessageList, {
      text: message, 
      author: 'User', 
      id: `mess-${Date.now()}`
    }])
  }, [message])



  return (
    <div className="App container"> 
      <div className="wrapperForm">

        <form autoComplete="off" className="formBlock" onSubmit={submitMessage}>
        <Input 
          inputProps={{ 'aria-label': 'description', 'fontSize': '66px', 'padding': '7px', 'autoFocus': true, 'color': 'rgb(112, 91, 20)' }}  
          id="standard-basic" 
          ref={inputRef}
          className="inputMessage" 
          placeholder="Message"
          onChange={handleText} 
          value={message}>  
             
        </Input>
        
           {/* <input autofocus ref={inputRef} className="inputMessage" label="message" onChange={handleText} value={message}></input> */}

          <button className="btnSendMessage">SEND</button>
        </form>
        <div className="conversationalBlock">
          <div className="chatsBlock">
            {chatsList.map((chat, i) => <Chats chat={chat} key={`${i}-${Date.now()}`}/>)}
          </div>
          <div className="textSpace">
            {messageList.map((message) => <Message message={message} key={message.id}/>)}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default App;
