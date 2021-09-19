import React from 'react';
import { AddChat } from '../AddChats';
import { RemoveChat } from '../RemoveChat';
import { Link } from 'react-router-dom';
import { MyButton } from '../UI/button/MyButton';

export const ChatsList = ({ chats }) => {

    return (
        <div className="chatsBlock"> 
            <AddChat />
            <div className="chatsList">
                {chats?.map(chat => 
                    <div className='chatItem' key={`owner-chat-item-${chat.id}`}>
                        <Link className='chatLink' to={`/chats/${chat.id}`}><MyButton key={chat.id}>{chat.name}</MyButton></Link>

                        <RemoveChat key={'remove-' + chat.id} chatIdRemove={chat.id}/>
                    </div>
                )}
             </div> 
        </div> 
    )
}