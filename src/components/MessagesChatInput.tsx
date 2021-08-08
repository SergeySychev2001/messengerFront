import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import '../styles/MessagesChatInput.scss';

const MessagesChatInput: React.FC = () => {

    const { selectedUserId } = useTypedSelector(state => state.messages);
    const { socket } = useTypedSelector(state => state.socket);
    const { notificationsListItemIsAdded, myMessageIsAdded } = useActions();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            body: {value: string}
        }
        fetch('http://localhost:4000/api/messages/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: target.body.value,
                firstUserId: sessionStorage.getItem('userId'),
                secondUserId: selectedUserId
            })
        })
        .then( async (res) => {
            const response = await res.json();
            if(res.status === 200){
                socket?.emit('sendMessageFromClient', {
                    ...response
                });
                myMessageIsAdded({
                    id: response.id,
                    date: response.date,
                    isMy: true,
                    value: response.value
                });
            }
            if(res.status === 500){
                notificationsListItemIsAdded('Сообщение не отправлено');
            }
        })
        .catch(err => {
            notificationsListItemIsAdded('Сообщение не отправлено');
        });
    }
    return(
        <div className="messages-chat-input">
            <form onSubmit={handleSubmit} className="input__form">
                <input name="body" className="form__text" type="text" placeholder="Введите сообщение"/>
                <input className="form__submit" type="submit" value="Отправить"/>
            </form>
        </div>
    )
}

export default MessagesChatInput;