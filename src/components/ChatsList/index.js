import React from 'react';
import { Link } from 'react-router-dom';
import { MyButton } from '../UI/button/MyButton';

export const ChatsList = ({chats, onAddChat, onRemoveChat}) => {

    const addNewChat = () => {
        onAddChat()
    }

    const removeChat = (event, chatRemove) => {
        // event.target.parentElement.parentElement.remove()
        // console.log(event.target.parentElement.parentElement);
        onRemoveChat(chatRemove)
    }

    return (

        <div className="chatsBlock"> 
            <MyButton style={{ width: '100%'}} onClick={addNewChat}>Add Chat</MyButton>


            <div className="chatsList">
                {chats?.map(chat => 
                    <div className='chatItem'>
                        <Link className='chatLink' to={`/chats/${chat.id}`}><MyButton key={chat.id}>{chat.name}</MyButton></Link>

                        {/* <MyButton key={chat.id}><Link className='chatLink' to={`/chats/${chat.id}`}>{chat.name}</Link></MyButton> */}
                        <Link to={'/chats/'} ><MyButton style={{ minWidth: '27px', minHeight: '27px', fontSize: '14px'}} onClick={(event) => removeChat(event, chat.id)} key={'remove-' + chat.id} >X</MyButton></Link>
                    </div>
                )}
             </div> 
        </div>



     



        // <div className="chatsBlock">
            
        //     {chats?.map(chat => <MyButton key={chat.id}><Link to={`/chats/${chat.id}`}>{chat.name}</Link></MyButton>)}
        //  </div> 
     
    )
}