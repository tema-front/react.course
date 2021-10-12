import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database'
import { db } from '../../services/firebase'
import { AddChat } from '../AddChats';
import { RemoveChat } from '../RemoveChat';
import { Link } from 'react-router-dom';
import { MyButton } from '../UI/button/MyButton';

export const ChatsList = () => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const chatDBref = ref(db, 'chats')
        onValue(chatDBref, (snapshot) => {
            const data = snapshot.val();
            setChats(Object.values(data || {}));
        })
    }, [])


    return (
        <div className="chatsBlock"> 
            <AddChat />  {/* Логика добавления чата в этом компоненте */}
            <div className="chatsList">
                {chats?.map(chat => 
                    <div className='chatItem' key={`owner-chat-item-${chat.id}`}>
                        <Link className='chatLink' to={`/chats/${chat.id}`}><MyButton key={chat.id}>{chat.name}</MyButton></Link>

                        <RemoveChat key={'remove-' + chat.id} chatIdRemove={chat.id}/> {/* Логика удаления чата в этом компоненте */}
                    </div>
                )}
             </div> 
        </div> 
    )
}