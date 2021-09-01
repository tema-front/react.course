
import React, { useEffect, useState } from 'react';
import './App.css';
import { Message } from './components/Message';

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

  // Неожиданный для меня эффект получился благодаря этой записи
  // Если таймаута не записывать в эту переменную и нажать много раз кнопку отправки сообщения,
  // То в стеке вызовов будет много таймаутов
  // Но всё исправляет запись интервала в перменную
  // Правда, появился какой-то варн, но это издержки профессии)
  // В продакшен!
  let answerTimeout = undefined

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === 'User') {
      // Таймер для ответа бота с генерацией случайного ответа из массива ответов)
      answerTimeout = setTimeout(() => {
        setMessageList((prevMessages) => [...prevMessages, { text: answerBot[Math.floor(Math.random() * (6 - 0)) + 0], author: 'Bot'}])
      }, 1500);
    }
    return () => {
      clearTimeout(answerTimeout)
    }
  }, [messageList, answerBot])

  const handleText = (event) => { 
    setMessage(event.target.value)
  }

  const saveMessages = (event) => {
    event.preventDefault()
    // Отчищаю поле инпута при отправке формы
    setMessage('')
  }
  
  const handleClick = () => {
    // При клике добавляю в массив новый объект сообщения
    setMessageList(prevMessageList => [...prevMessageList, {text: message, author: 'User'}])
  }


  return (
    <div className="App warningBlock"> 
      <div className="wrapperForm">

        <form  className="formBlock" onSubmit={saveMessages}>
          <input className="inputMessage" onChange={handleText} value={message}></input>
          <button className="btnSendMessage" onClick={handleClick}>SEND</button>
        </form>

        <div className="textSpace">
          {messageList.map((message, i) => <Message message={message} key={i}/>)}
        </div>
        
      </div>
    </div>
  );
}

export default App;
