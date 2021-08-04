import React, { useState } from "react";
import '../styles/MessagesChatInput.scss';

const MessagesChatInput: React.FC = () => {
    
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    }
    return(
        <div className="messages-chat-input">
            <form onSubmit={handleSubmit} className="input__form">
                <input className="form__text" type="text" placeholder="Введите сообщение"/>
                <input className="form__submit" type="submit" value="Отправить"/>
            </form>
        </div>
    )
}

export default MessagesChatInput;