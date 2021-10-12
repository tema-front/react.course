import React, { useState, useRef, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Input from '@material-ui/core/Input'; 
import { Header } from '../Header';
import { ref, onValue } from 'firebase/database'
import { db } from '../../services/firebase'




export const FormMessage = ({ onSubmit }) => {
    const inputRef = useRef()
    const [message, setMessage] = useState('');
    const [isChatIdToList, setIsChatIdToList] = useState(false)
    const { chatId } = useParams()

    const [chats, setChats] = useState([])

    useEffect(() => {
        const chatDBref = ref(db, 'chats')
        onValue(chatDBref, (snapshot) => {
            const data = snapshot.val();
            setChats(Object.values(data || {}));
        })
    }, [])

    useEffect(() => {
      // Проверка, существует ли чат с ID из url, если нет, то инпут ввода сообещия делается disabled
      if (chats.find(chat => chat.id === chatId)) setIsChatIdToList(true)
      else setIsChatIdToList(false)
    }, [chatId])

    const submitMessage = (event) => {
        event.preventDefault()
        if (chatId) onSubmit(message);
        setMessage('');
        inputRef.current?.focus(); 
    }

    return (
      <>
      <Header headerName='Chats' />

      <form autoComplete="off" className="formBlock" onSubmit={submitMessage}>
          {!isChatIdToList && <Input 
          inputProps={{ 'aria-label': 'description', 'fontSize': '66px', 'padding': '7px', 'autoFocus': true, 'color': 'rgb(112, 91, 20)' }}  
          id="standard-basic" 
          inputRef={inputRef}
          className="inputMessage" 
          placeholder="Message"
          disabled
          value={'Выберите чат'}>   
        </Input>}

        {isChatIdToList && <Input 
          inputProps={{ 'aria-label': 'description', 'fontSize': '66px', 'padding': '7px', 'autoFocus': true, 'color': 'rgb(112, 91, 20)' }}  
          id="standard-basic" 
          inputRef={inputRef}
          className="inputMessage" 
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value) } 
          value={message}>   
        </Input>}

        <button className="btnSendMessage">SEND</button>
      </form>
      </>
    );
}

