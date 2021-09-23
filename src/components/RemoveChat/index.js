import React from 'react';
import { useDispatch } from "react-redux";
import { MyButton } from "../UI/button/MyButton";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { deleteChat } from "../../store/chats/actions";

export const RemoveChat = ({ chatIdRemove }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { chatId } = useParams()

    const removeChat = () => {
        dispatch(deleteChat(chatIdRemove))
        
        if (chatIdRemove === chatId) {
            history.push('/chats')
        }
    }
    return (
        <MyButton style={{ marginTop: '12px', minWidth: '27px', minHeight: '27px', maxHeight: '27px',fontSize: '14px'}} 
            onClick={removeChat}>X
        </MyButton>
    )
}