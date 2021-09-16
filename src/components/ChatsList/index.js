import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { MyButton } from '../UI/button/MyButton';

export const ChatsList = ({chats, onAddChat, onRemoveChat}) => {

    const history = useHistory()
    const addNewChat = () => {
        onAddChat(nameNewChat)
    }

    const [windowAddChat, setWindowAddChat] = useState(false)
    const [nameNewChat, setNameNewChat] = useState('')

    const addNewChatWindow = (event) => {
        if (event.target.innerText === 'Add Chat') event.target.innerText = 'Add'
        else {
            if (!nameNewChat) return
            addNewChat()
            setNameNewChat('')
            event.target.innerText = 'Add Chat'
        } 
        setWindowAddChat(!windowAddChat)
    }

    const { chatId } = useParams()

    const removeChat = (chatRemove) => {
        onRemoveChat(chatRemove)
        if (chatRemove === chatId) {
            history.push('/chats')
        }
    }

    return (
        <div className="chatsBlock"> 

            {/* <MyButton style={{ width: '100%'}} onClick={addNewChat}>Add Chat</MyButton> */}
            <MyButton style={{ width: '100%'}} onClick={addNewChatWindow}>Add Chat</MyButton>
            {windowAddChat && 
                <div className="addNewChatBlock">
                    <input placeholder="Name chat" value={nameNewChat} onChange={(event) => setNameNewChat(event.target.value)} className='nameNewChat'></input>
                </div>
            }


            <div className="chatsList">
                {chats?.map(chat => 
                    <div className='chatItem' key={`owner-chat-item-${chat.id}`}>

                        <Link className='chatLink' to={`/chats/${chat.id}`}><MyButton key={chat.id}>{chat.name}</MyButton></Link>

                        <MyButton key={'remove-' + chat.id} style={{ marginTop: '12px', minWidth: '27px', minHeight: '27px', maxHeight: '27px',fontSize: '14px'}} 
                            onClick={() => removeChat(chat.id)} >X
                        </MyButton>

                    </div>
                )}
             </div> 
        </div> 
    )
}