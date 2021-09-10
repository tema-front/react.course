import React from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { MyButton } from '../UI/button/MyButton';

export const ChatsList = ({chats, onAddChat, onRemoveChat}) => {

    const addNewChat = () => {
        // Вызываю функцию в родителе Chats на добавление чата
        onAddChat()
    }
    const { chatId } = useParams()

    const removeChat = (chatRemove) => {
        // Вызываю функцию в родителе Chats и передаю id удаляемого чата, чтобы удалить его
        onRemoveChat(chatRemove)

        // Идея такая: если мы удаляем чат, который у нас открыт, то он закрывается
        // Но реализация идеи не работает)
        // При истине редирект не отрабатывает
        // В чём проблема?
        if (chatRemove === chatId) {
            return (
                <Redirect to="/chats" />
            )
        }
    }

    return (
        <div className="chatsBlock"> 
            {/* Кнопка, чтобы добавить новый чат */}
            <MyButton style={{ width: '100%'}} onClick={addNewChat}>Add Chat</MyButton>

            <div className="chatsList">
                {chats?.map(chat => 
                    <div className='chatItem'>
                        {/* Кнопки  чата */}
                        <Link className='chatLink' to={`/chats/${chat.id}`}><MyButton key={chat.id}>{chat.name}</MyButton></Link>

                        {/* Кнопки удаления чата 

                            Кнопки работают, но ругается реакт, говоря, что каждый дочерний элемент должен иметь уникальный ключ,
                            Но кнопки у меня имеют уникальный ключ.
                            В чём здесь проблема?
                        */}
                        <MyButton key={'remove-' + chat.id} style={{ minWidth: '27px', minHeight: '27px', fontSize: '14px'}} 
                            onClick={() => removeChat(chat.id)} >X
                        </MyButton>

                    </div>
                )}
             </div> 
        </div> 
    )
}