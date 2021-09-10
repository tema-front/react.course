import React, { useState, useRef} from 'react'
import { useParams } from "react-router-dom";

import Input from '@material-ui/core/Input'; // для стилизации

export const FormMessage = ({ onSubmit }) => {
    const inputRef = useRef()
    const [message, setMessage] = useState('');

    const handleText = (event) => { 
        setMessage(event.target.value) // Контролируемый input
    }
    const { chatId } = useParams()

    const submitMessage = (event) => {
        event.preventDefault()
        if (chatId) onSubmit(message);
        setMessage('');
        inputRef.current?.focus(); // Фокус на инпуте после клика
    }

    return (
        <form autoComplete="off" className="formBlock" onSubmit={submitMessage}>

          {!chatId && <Input 
            inputProps={{ 'aria-label': 'description', 'fontSize': '66px', 'padding': '7px', 'autoFocus': true, 'color': 'rgb(112, 91, 20)' }}  
            id="standard-basic" 
            inputRef={inputRef}
            className="inputMessage" 
            placeholder="Message"
            disabled
            value={'Выберите чат'}>   
          </Input>}

          {chatId && <Input 
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

