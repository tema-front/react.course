import React, { useState, useRef, useEffect} from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Input from '@material-ui/core/Input'; 
import { getChatList } from '../../store/chats/selectors';


export const FormMessage = ({ onSubmit }) => {
    const inputRef = useRef()
    const [message, setMessage] = useState('');
    const [isChatIdToList, setIsChatIdToList] = useState(false)
    const { chatId } = useParams()
    const chats = useSelector(getChatList);

    useEffect(() => {
      if (chats.find(chat => chat.id === chatId)) setIsChatIdToList(true)
      else setIsChatIdToList(false)
    }, [chatId])

    const handleText = (event) => { 
        setMessage(event.target.value) 
    }

    const submitMessage = (event) => {
        event.preventDefault()
        if (chatId) onSubmit(message);
        setMessage('');
        inputRef.current?.focus(); 
    }

    return (
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
            onChange={handleText} 
            value={message}>   
          </Input>}

        <button className="btnSendMessage">SEND</button>
      </form>
    );
}

