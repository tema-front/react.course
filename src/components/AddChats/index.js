import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addChat } from "../../store/chats/actions";
import { MyButton } from "../UI/button/MyButton";

export const AddChat = () => {
    const [windowAddChat, setWindowAddChat] = useState(false)
    const [nameNewChat, setNameNewChat] = useState('')
    const dispatch = useDispatch()

    const addChatWindow = (event) => {
        if (event.target.innerText === 'Add Chat') event.target.innerText = 'Add'
        else {
            if (!nameNewChat) return
            dispatch(addChat(nameNewChat))
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