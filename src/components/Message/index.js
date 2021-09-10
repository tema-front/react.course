import { useEffect } from 'react';
import '../../style/App.css'

export const Message = ({ messageList }) => {

    return (
        <div className="textSpace">
            {messageList?.map((message, i) => <p className="message" key={i}>{message.text}</p>)}
        </div>
    )
};  