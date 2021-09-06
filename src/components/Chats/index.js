import React from 'react';

export const Chats = (props) => {
    // {props.chats.name}
    return (
        <button className='chatItem'>{props.chat}</button>
    )
}