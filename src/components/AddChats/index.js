import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import { ref, set } from 'firebase/database'
import { db } from '../../services/firebase'
// import { addChat } from "../../store/chats/actions";
import { MyButton } from "../UI/button/MyButton";
import { addChatFb } from '../../store/chats/actions';
import { useDispatch } from 'react-redux';

export const AddChat = () => {
    const [windowAddChat, setWindowAddChat] = useState(false)
    const [nameNewChat, setNameNewChat] = useState('')
    const dispatch = useDispatch()

    const addChatWindow = (event) => {
        if (event.target.innerText === 'Add Chat') event.target.innerText = 'Add'
        else {
            debugger
            if (!nameNewChat) return
            dispatch(addChatFb(nameNewChat))
            setNameNewChat('')
            event.target.innerText = 'Add Chat'
        } 
        setWindowAddChat(!windowAddChat)
    }

    return (
        <div>
            <MyButton style={{ width: '100%'}} onClick={addChatWindow}>Add Chat</MyButton>
            {windowAddChat && 
                <div className="addNewChatBlock">
                    <input 
                    placeholder="Name chat" 
                    value={nameNewChat}
                    onChange={(event) => setNameNewChat(event.target.value)}
                    className='nameNewChat'>        
                    </input>
                </div>
            }
        </div>
    );
}